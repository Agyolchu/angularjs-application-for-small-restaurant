// Karma Configuration
module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'public/bower_components/angular/angular.js',
            'public/bower_components/angular-resource/angular-resource.js',
            'public/bower_components/angular-ui-router/release/angular-ui-router.js',
            'public/bower_components/angular-mocks/angular-mocks.js',
            'public/scripts/*.js',
            'test/unit/**/*.js'
        ],
        //list of file to be excluded
        exclude: [
            'test/protractor.conf.js', 'test/e2e/*.js'
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browser: ['Chrome','PhantomJS', 'PhantomJS_custom'],
        //you can define custom flag
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    }
                },
                flags: ['--load-images=true'],
                debug: true
            },
            phantomjsLauncher: {
                // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
                exitOnResourceError: true
            },

            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: false,

            // Concurrency level
            // how many browser should be started simultaneous
            concurrency: Infinity
        }
    })
};