import * as fse from 'fs-extra';

export function Process(source: any, destination: any) {
  console.log(`Copying vendor files from source to destination`);

  for (const vendor in source) {
    if (source.hasOwnProperty(vendor)) {
      console.log(`    Copying files for ${vendor}`);
      fse.copySync(source[vendor], destination[vendor]);
    }
  }
}
