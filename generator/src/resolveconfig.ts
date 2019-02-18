import * as fse from 'fs-extra';
import * as glob from 'glob';

export function loadConfig(): any {
  const localDir = `${process.cwd()}`;

  const defaultConfig = {
    paths: {
      build: {
        assets: {
          dir: './site/public/assets',
          images: './site/public/assets/images',
          javascript: './site/public/assets/javascript',
          stylesheets: './site/public/assets/stylesheets',
          vendor: {
            'bootstrap-css': './site/public/assets/vendor/bootstrap/css/bootstrap.css',
            'bootstrap-js': './site/public/assets/vendor/bootstrap/js/bootstrap.js',
            'jquery-js': './site/public/assets/vendor/jquery/js/jquery.js',
            'mdi-css': './site/public/assets/vendor/mdi/css/materialdesignicons.css',
            'mdi-fonts': './site/public/assets/vendor/mdi/fonts',
            'popperjs-js': './site/public/assets/vendor/popper.js/js/popper.js',
            'prismjs-css': './site/public/assets/vendor/prismjs/css/prism-tomorrow.css',
          },
        },
        dir: './site/public',
      },
      source: {
        assets: {
          dir: './site/assets',
          images: './site/assets/images',
          javascript: './site/assets/javascript',
          stylesheets: './site/assets/stylesheets',
          vendor: {
            'bootstrap-css': './node_modules/bootstrap/dist/css/bootstrap.css',
            'bootstrap-js': './node_modules/bootstrap/dist/js/bootstrap.js',
            'jquery-js': './node_modules/jquery/dist/jquery.js',
            'mdi-css': './node_modules/@mdi/font/css/materialdesignicons.css',
            'mdi-fonts': './node_modules/@mdi/font/fonts/',
            'popperjs-js': './node_modules/popper.js/dist/popper.js',
            'prismjs-css': './node_modules/prismjs/themes/prism-tomorrow.css',
          },
        },
        config: {
          dir: './site/config',
        },
        controllers: {
          dir: './site/controllers',
        },
        db: {
          dir: './site/db',
        },
        dir: './site',
        log: {
          dir: './site/log',
        },
        models: {
          dir: './site/models',
        },
        views: {
          dir: './site/views',
          layouts: './site/views/layouts',
          partials: './site/views/partials',
        },
      },
      vendor: {
        bootstrap: {
          build: [],
          source: [],
        },
        jquery: {
          build: [],
          source: [],
        },
        mdi: {
          build: [],
          source: [],
        },
        popperjs: {
          build: [],
          source: [],
        },
        prismjs: {
          build: [],
          source: [],
        },
      },
    },
  };

  const potentialFiles = glob.sync('static-site-generator*[(js)(json)]', { cwd: localDir });

  if (potentialFiles && potentialFiles.length > 0) {
    const readFile = fse.readFileSync(potentialFiles[0], 'utf-8');
    const potentialConfig = JSON.parse(readFile);
    return Object.assign({}, defaultConfig, potentialConfig);
  } else {
    return defaultConfig;
  }
}
