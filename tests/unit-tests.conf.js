// Karma configuration
// Generated on Mon Feb 01 2016 18:05:40 GMT-0500 (EST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../www/lib/ionic/js/angular/angular.js',
			'../www/lib/ionic/js/ionic.js',
            '../www/js/pluginsRsc/ng-cordova-beacon.js',
            '../www/js/*.js',
            '../tests/lib/angular-mocks/angular-mocks.js',
            '../tests/ionic/**/*.js',
            '../www/templates/*.html',
            '../tests/lib/jquery.min.js',
			'../www/js/pluginsRsc/angular-translate.js',
			'../www/js/pluginsRsc/angular-translate-loader-partial.js',
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../www/js/controllers/*.js': ['coverage'],
            '../www/js/services/*.js': ['coverage'],
            '../www/js/*.js': ['coverage'],
            "../www/templates/*.html": ["ng-html2js"]
        },

        ngHtml2JsPreprocessor: {
            // If your build process changes the path to your templates,
            // use stripPrefix and prependPrefix to adjust it.
            cacheIdFromPath: function(filepath) {
                // example strips 'public/' from anywhere in the path
                // module(app/templates/template.html) => app/public/templates/template.html

                var cacheId = filepath.substring(filepath.lastIndexOf("/") + 1, filepath.length);
                console.log(cacheId);

                return "templates/" + cacheId;
            },

            // the name of the Angular module to create
            moduleName: 'my.templates'
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
