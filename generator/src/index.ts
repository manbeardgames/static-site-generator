import * as resolveConfig from './resolveconfig';
import * as sass from './processors/sass';
import * as images from './processors/images';
import * as javascript from './processors/javascript';
import * as vendor from './processors/vendor';

let processors = {
    sass: sass.Process,
    images: images.Process,
    javascript: javascript.Process,
    vendor: vendor.Process
};


const config = resolveConfig.loadConfig();

processors.sass(config.paths.source.assets.stylesheets, config.paths.build.assets.stylesheets);
processors.images(config.paths.source.assets.images, config.paths.build.assets.images);
processors.javascript(config.paths.source.assets.javascript, config.paths.build.assets.javascript);
processors.vendor(config.paths.source.assets.vendor, config.paths.build.assets.vendor);

