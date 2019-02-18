import * as fse from 'fs-extra';

export function Process(source: string, destination: string) {
  //  1 - Create a new Promise
  return new Promise(function (resolve, reject) {
    //  2 - Put your code in this function
    console.log(`Copying javascript files from ${source} to ${destination}`);
    fse.copy(source, destination)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function ProcessSync(src: string, dest: string) {
  console.log(`Copying javascript files from "${src} to ${dest}`);
  fse.copySync(src, dest);
}