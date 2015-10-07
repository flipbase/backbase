// Karma configuration
// Generated on Tue Apr 01 2014 09:35:23 GMT+0200 (CEST)

module.exports = function(config) {

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      // include recorder dependencies
      'dist/utils/*.js',
      'dist/Component.js',

      // HTML files only needs to be included for unit tests!
      'test/*.html',

      // Include test files
      'test/*.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

    // HTML only needs to be integrated for integration tests
    preprocessors: {
        'test/*.js': ['webpack'],
        // 'public/recorder/scripts/**/*.js': ['coverage'],
        'test/*.html': ['html2js']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'], //'coverage'

    webpack: require('./webpack.config.js'),

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    coverageReporter: {
        // specify a common output directory
        // dir: 'test/coverage'
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    plugins: [
      require('karma-webpack'), 
      require('karma-chai'), 
      require('karma-spec-reporter'),
      require('karma-sinon'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter'),
      require('karma-html2js-preprocessor'),
      require('karma-mocha')
    ]
  });
};
