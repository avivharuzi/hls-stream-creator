import * as fs from 'fs';

export default async (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.lstat(src, (err, stats) => {
      if (err) {
        reject(err);
      } else if (!stats || stats.isDirectory() || !stats.isFile()) {
        reject(`you must provide a file and not a directory, provided: ${src}`);
      } else {
        resolve();
      }
    });
  });
}
