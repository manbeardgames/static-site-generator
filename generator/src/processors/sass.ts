import * as glob from 'glob';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as sass from 'sass';

export function Process(source: string, destination: string) {
    //  Get any .scss files that do not have a _ in the beginning
    let fileList = glob.sync('**/!(_)*.scss', { cwd: source });

    console.log(`SASS Files Found: ${fileList.length}`);

    //  Render each scss file
    fileList.forEach((file, i) => {


        //  Get the file info
        let fileInfo = path.parse(file);

        console.log(`    Processing ${fileInfo.name}`);

        //  Create the destination directory
        fse.ensureDirSync(destination);

        //  Create full filepath to the scss file
        let fullyQualifiedFilePath = path.join(source, fileInfo.dir, `${fileInfo.name}${fileInfo.ext}`);

        //  Render the scss to css
        let result = sass.renderSync({ file: fullyQualifiedFilePath });

        //  Output the result as a .css file
        fse.writeFileSync(path.join(destination, `${fileInfo.name}.css`), result.css);

    });

}