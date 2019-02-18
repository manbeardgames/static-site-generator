import * as fse from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import * as sass from 'sass';
import { promisify } from 'util';


//  Promisify all the things
const globP = promisify(glob);

const searchPattern = '**/!(_)*.scss';



export function Process(source: string, destination: string) {

  //  1 - Create a new Promise
  return new Promise(function (resolve, reject) {
    // 2 - Put your code inside this function

    globP('**/!(_)*.scss', { cwd: source })
      .then((files) => {

        console.log(`SASS Files Found: ${files.length}`);

        //  Render each scss file
        files.forEach((file) => {
          //  Get the file info
          const fileInfo = path.parse(file);

          console.log(`    Processing ${fileInfo.name}`);

          //  Create the destination directory
          fse.ensureDir(destination)
            .then(() => {
              //  Create full filepath to the scss file
              const fullyQualifiedFilePath = path.join(source, fileInfo.dir, `${fileInfo.name}${fileInfo.ext}`);

              //  Render the scss to css
              sass.render({ file: fullyQualifiedFilePath }, (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  //  Output the result as a .css file
                  fse.writeFile(path.join(destination, `${fileInfo.name}.css`), result.css)
                    .then(() => {
                      resolve();
                    })
                    .catch((err) => { reject(err) });
                }
              });

            })
            .catch((err) => { reject(err) });
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function ProcessAsync(source: string, destination: string) {
  //  Get a list of files scss files that do not begin wtih _
  let files = glob.sync(searchPattern, { cwd: source });

  console.log(`SASS Files Found: ${files.length}`);

  //  Render each scss file
  files.forEach((file) => {
    //  Get the file info
    const fileInfo = path.parse(file);

    console.log(`    Processing ${fileInfo.name}`);

    //  Create the destination directory
    fse.ensureDirSync(destination);

    //  Create the full filepath to the scss file
    const fullyQualifiedFilePath = path.join(source, fileInfo.dir, `${fileInfo.name}${fileInfo.ext}`);

    //  Render the scss to css
    const result = sass.renderSync({ file: fullyQualifiedFilePath });

    //  Output the result as a .css file
    fse.writeFileSync(path.join(destination, `${fileInfo.name}.css`), result.css);
  })
}

//   //  Get any .scss files that do not have a _ in the beginning
//   const fileList = glob.sync('**/!(_)*.scss', { cwd: source });

//   console.log(`SASS Files Found: ${fileList.length}`);

//   //  Render each scss file
//   fileList.forEach((file, i) => {
//     //  Get the file info
//     const fileInfo = path.parse(file);

//     console.log(`    Processing ${fileInfo.name}`);

//     //  Create the destination directory
//     fse.ensureDirSync(destination);

//     //  Create full filepath to the scss file
//     const fullyQualifiedFilePath = path.join(source, fileInfo.dir, `${fileInfo.name}${fileInfo.ext}`);

//     //  Render the scss to css
//     const result = sass.renderSync({ file: fullyQualifiedFilePath });

//     //  Output the result as a .css file
//     fse.writeFileSync(path.join(destination, `${fileInfo.name}.css`), result.css);
//   });
// }
