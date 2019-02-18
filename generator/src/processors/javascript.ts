import * as fse from 'fs-extra';

export function Process(source:string, destination:string) {
    console.log(`Copying javascript files from "${source} to ${destination}`);
    fse.copySync(source, destination);
}