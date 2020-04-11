import { ffprobe, FfprobeData } from 'fluent-ffmpeg';

export default async (src: string): Promise<FfprobeData> => {
  return new Promise((resolve, reject) => {
    ffprobe(src, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata);
      }
    });
  });
}
