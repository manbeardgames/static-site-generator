import * as glob from 'glob';
import * as fse from 'fs-extra';

export function loadConfig(): any {
    let localDir = `${process.cwd()}`;

    let defaultConfig = {
        "paths": {
            "source": {
                "dir": "./site",
                "assets": {
                    "dir": "./site/assets",
                    "images": "./site/assets/images",
                    "javascript": "./site/assets/javascript",
                    "stylesheets": "./site/assets/stylesheets",
                    "vendor": {
                        "bootstrap-css": './node_modules/bootstrap/dist/css/bootstrap.css',
                        "bootstrap-js": './node_modules/bootstrap/dist/js/bootstrap.js',
                        "popperjs-js": './node_modules/popper.js/dist/popper.js',
                        "jquery-js": './node_modules/jquery/dist/jquery.js',
                        "mdi-css": './node_modules/@mdi/font/css/materialdesignicons.css',
                        "mdi-fonts": './node_modules/@mdi/font/fonts/',
                        "prismjs-css": './node_modules/prismjs/themes/prism-tomorrow.css'
                    }
                },
                "controllers": {
                    "dir": "./site/controllers"
                },
                "views": {
                    "dir": "./site/views",
                    "layouts": "./site/views/layouts",
                    "partials": "./site/views/partials"
                },
                "models": {
                    "dir": "./site/models"
                },
                "config": {
                    "dir": "./site/config"
                },
                "log": {
                    "dir": "./site/log"
                }
            },
            "build": {
                "dir": "./site/public",
                "assets": {
                    "dir": "./site/public/assets",
                    "images": "./site/public/assets/images",
                    "javascript": "./site/public/assets/javascript",
                    "stylesheets": "./site/public/assets/stylesheets",
                    "vendor": {
                        "bootstrap-css": "./site/public/assets/vendor/bootstrap/css/bootstrap.css",
                        "bootstrap-js": "./site/public/assets/vendor/bootstrap/js/bootstrap.js",
                        "popperjs-js": "./site/public/assets/vendor/popper.js/js/popper.js",
                        "jquery-js": "./site/public/assets/vendor/jquery/js/jquery.js",
                        "mdi-css": "./site/public/assets/vendor/mdi/css/materialdesignicons.css",
                        "mdi-fonts": "./site/public/assets/vendor/mdi/fonts",
                        "prismjs-css": "./site/public/assets/vendor/prismjs/css/prism-tomorrow.css"
                    }
                },
            },
            "vendor": {
                "bootstrap": {
                    "source": [],
                    "build": []
                },
                "popperjs": {
                    "source": [],
                    "build": []
                },
                "jquery": {
                    "source": [],
                    "build": []
                },
                "mdi": {
                    "source": [],
                    "build": [],
                },
                "prismjs": {
                    "source": [],
                    "build": []
                }
            }
        }
    }

    let potentialFiles = glob.sync('static-site-generator*[(js)(json)]', { cwd: localDir });

    if (potentialFiles && potentialFiles.length > 0) {
        let readFile = fse.readFileSync(potentialFiles[0], 'utf-8');
        let potentialConfig = JSON.parse(readFile);
        return Object.assign({}, defaultConfig, potentialConfig);
    } else {
        return defaultConfig;
    }

}