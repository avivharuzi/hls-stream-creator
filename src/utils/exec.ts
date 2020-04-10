import { exec } from 'child_process';

export default async (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};
