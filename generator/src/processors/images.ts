import * as fse from 'fs-extra';

export function Process(src: string, dest: string) {
  // 1 - Create a new Promise
  return new Promise(function (resolve, reject) {
    //  2 - Put your code inside this function

    console.log(`Copying images from "${src} to ${dest}`);
    fse.copy(src, dest)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function ProcessSync(src:string, dest:string) {
  console.log(`Copying images from "${src} to ${dest}`);
  fse.copySync(src, dest);
}
