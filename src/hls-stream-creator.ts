import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg';

import * as utils from './utils';
import config from './config';
import { defaultSettings } from './default-settings';
import { Settings } from './shared';

export default async (src: string, targetDir: string, settings: Settings = {}): Promise<void> => {
  // Merge settings with default settings.
  settings = {
    ...defaultSettings,
    ...settings,
  };

  if (!settings.renditions || settings.renditions.length === 0) {
    throw new Error('You must provide at least one rendition!');
  }

  // Check src is exists and is a file.
  await utils.checkFile(src);

  // Create our target directory.
  await utils.createDir(targetDir);

  // @ts-ignore
  settings.renditions = settings.renditions.sort((
    a,
    b,
  ) => a.resolution.height - b.resolution.height); // Sort by height...

  const srcMetadata = await utils.metadata(src);
  const videoStreamMetadata = srcMetadata.streams.find(s => s.codec_type === 'video');

  if (!videoStreamMetadata) {
    throw new Error('There was a problem to extract video stream metadata');
  }

  // @ts-ignore
  const keyFramesInterval = utils.fps(videoStreamMetadata) * 2;

  let ffmpegCommand: FfmpegCommand = ffmpeg(src)
    .addInputOption('-hide_banner -y');

  let masterPlaylistData = '#EXTM3U\n#EXT-X-VERSION:3\n';

  settings.renditions.forEach(rendition => {
    const maxrate = rendition.bitrate * config.MAX_BITRATE_RATIO;
    const bufsize = rendition.bitrate * config.RATE_MONITOR_BUFFER_RATIO;
    const bandwidth = `${rendition.bitrate}000`;
    const name = `${rendition.resolution.height}p`;

    ffmpegCommand = ffmpegCommand
      .addOutput(`${targetDir}/${name}.m3u8`)
      // @ts-ignore
      .videoCodec(settings.videoCodec)
      .videoBitrate(rendition.bitrate)
      // @ts-ignore
      .audioCodec(settings.audioCodec)
      .audioBitrate(rendition.audioRate)
      .addOutputOptions([
        `-maxrate ${maxrate}k`, // Video output option.
        `-bufsize ${bufsize}k`, // Video output option.
        `-vf scale=w=${rendition.resolution.width}:h=${rendition.resolution.height}:force_original_aspect_ratio=decrease`, // Video output option.
        `-preset ${settings.speed}`,
        '-sc_threshold 0',
        `-g ${keyFramesInterval}`,
        `-keyint_min ${keyFramesInterval}`,
        `-hls_time ${config.SEGMENT_TARGET_DURATION}`, // HLS output option.
        '-hls_playlist_type vod', // HLS output option.
        `-hls_segment_filename ${targetDir}/${name}_%03d.ts`, // HLS output option.
      ]);

    // Add rendition entry in the master playlist.
    masterPlaylistData += `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${rendition.resolution.width}x${rendition.resolution.height}\n${name}.m3u8\n`;
  });

  await utils.ffmpegRun(ffmpegCommand, settings.printLogs);

  // Finally create playlist file.
  await utils.createFile(`${targetDir}/playlist.m3u8`, masterPlaylistData);
};
