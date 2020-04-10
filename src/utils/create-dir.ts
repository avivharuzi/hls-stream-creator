import * as fs from 'fs';

export default async (target: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.stat(target, function (err, stats) {
      if (err) {
        // Directory doesn't exist or something.
        fs.mkdir(target, (err) => {
          if (err) {
            reject(`Could not create directory: ${target}, err: ${err}`);
          }
        });
      } else if (!stats.isDirectory()) {
        // This isn't a directory!
        reject(`${target} is not a directory!`);
      } else {
        resolve();
      }
    });
  });
}
