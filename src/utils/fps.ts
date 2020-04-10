import { FfprobeStream } from 'fluent-ffmpeg';

export default (ffprobeStream: FfprobeStream): number => {
  if (!ffprobeStream.r_frame_rate) {
    throw new Error('r_frame_rate does not exist from ffprobeStream');
  }

  // @ts-ignore
  return Math.floor(parseInt(ffprobeStream.r_frame_rate, 10) / 1000);
};
