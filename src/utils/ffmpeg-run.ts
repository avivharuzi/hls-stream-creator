import { FfmpegCommand } from 'fluent-ffmpeg';

export default async (ffmpegCommand: FfmpegCommand, printLogs: boolean = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpegCommand.on('error', (err) => {
      reject(err);
    });

    if (printLogs) {
      ffmpegCommand.on('stderr', (stderrLine) => {
        console.log(stderrLine);
      });

      ffmpegCommand.on('progress', (progress) => {
        console.log(`Processing: ${progress.percent}% done`);
      });
    }

    ffmpegCommand.on('end', () => {
      resolve();
    });

    ffmpegCommand.run();
  });
};
