//  Import all the things
import * as ejs from 'ejs';
import * as fse from 'fs-extra';
import * as glob from 'glob';
import * as images from './processors/images';
import * as javascript from './processors/javascript';
import * as path from 'path';
import { promisify } from 'util';
import * as sass from './processors/sass';
import * as vendor from './processors/vendor';
import * as views from './processors/views';


//  Promisfy all the things
const ejsRenderFile = promisify(ejs.renderFile);
const globP = promisify(glob);


interface IPaths {
  srcPath: string,
  pubPath?: string
}


//  Change the following values to whatever you need

//  The root source path of your site
const src = './site/src';

//  The root public path of your site
const pub = './site/public';

//  This is the paths to the root directory that contains all of the .css
//  files for your site
const scssPaths: IPaths = {
  srcPath: path.join(src, '/assets/stylesheets'),
  pubPath: path.join(pub, '/assets/stylesheets')
}

//  This is the paths to the root directory that contains all the images
//  for your site
const imagePaths: IPaths = {
  srcPath: path.join(src, '/assets/images'),
  pubPath: path.join(pub, '/assets/images'),
}

//  This is the paths to the root directory that contains all the javascript
//  files for your site
const javascriptPaths: IPaths = {
  srcPath: path.join(src, '/assets/javascript'),
  pubPath: path.join(pub, '/assets/javascript')
}

//  This is the paths to the directories that contain all of the vendor/third-party
//  files for your site
const vendorPaths: IPaths = {
  srcPath: path.join(src, '/assets/vendor'),
  pubPath: path.join(pub, '/assets/vendor')
}

//  This is the paths to the directories that contain all of your site's pages
const pagePaths: IPaths = {
  srcPath: path.join(src, '/pages'),
  pubPath: pub
}

//  This is the paths to the directories that contain all of your site's layouts
const layoutPaths: IPaths = {
  srcPath: './site/src/layouts'
}

//  This is the paths to the directories that contain all of your site's partials
const partialPaths: IPaths = {
  srcPath: './site/src/partials'
}



// ------------------------------------------------------------------------------
//  Below here is the code, do not edit it unless you are certain you know what
//  you are doing.
// ------------------------------------------------------------------------------

fse.emptyDir(pub)
  .then(() => {
    //  Process sass first
    sass.Process(scssPaths.srcPath, scssPaths.pubPath);
    images.Process(imagePaths.srcPath, imagePaths.pubPath);
    javascript.Process(javascriptPaths.srcPath, javascriptPaths.pubPath);
  })
  .catch((err) => console.error(err));

// //  Process the scss files
// sass.Process(scssPaths.srcPath, scssPaths.pubPath)
//   .then(() => {
//     console.log("All SASS processed");
//   })
//   .catch((err) => {
//     console.error(err);
//   })

// //  Process the image files
// images.Process(imagePaths.srcPath, imagePaths.pubPath)
//   .then(() => {
//     console.log("All Images processed");
//   })
//   .catch((err) => {
//     console.error(err);
//   })













// // // // // // const processors = {
// // // // // //   images: images.Process,
// // // // // //   javascript: javascript.Process,
// // // // // //   sass: sass.Process,
// // // // // //   vendor: vendor.Process,
// // // // // //   views: views.Process,
// // // // // // };



// // // // // processors.sass(config.paths.source.assets.stylesheets, config.paths.build.assets.stylesheets);
// // // // // processors.images(config.paths.source.assets.images, config.paths.build.assets.images);
// // // // // processors.javascript(config.paths.source.assets.javascript, config.paths.build.assets.javascript);
// // // // // processors.vendor(config.paths.source.assets.vendor, config.paths.build.assets.vendor);

// // // // // processors.views(
// // // // //   config.paths.source.views.dir,
// // // // //   config.paths.build.dir,
// // // // //   config.paths.source.views.layouts,
// // // // //   config.paths.source.db.dir,
// // // // // );
