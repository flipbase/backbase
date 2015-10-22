var fs = require('fs');

module.exports = function(config) {

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    if (!fs.existsSync('sauce.json')) {
      console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
      process.exit(1);
    } else {
      process.env.SAUCE_USERNAME = require('./sauce').username;
      process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = {
    // sl_ie_11: {
    //     base: 'SauceLabs',
    //     browserName: 'internet explorer',
    //     platform: 'Windows 8.1',
    //     version: '11'
    // }
    // sl_ie_10: {
    //     base: 'SauceLabs',
    //     browserName: 'internet explorer',
    //     platform: 'Windows 7',
    //     version: '10'
    // },
    // Chai does not support IE8 or lower; so
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    sl_ie_8: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '8'
    },
    sl_ie_7: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows XP',
      version: '7'
    }
  };

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      // HTML files only needs to be included for unit tests!
      'test/*.html',

      // Include test files
      'test/**/*.js',
      'test/*.js'
    ],

    preprocessors: {
      'test/**/*.js': ['webpack'],
      'test/*.js': ['webpack'],
      // 'public/recorder/scripts/**/*.js': ['coverage'],
      'test/*.html': ['html2js']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'saucelabs'],

    // web server port
    port: 9876,

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    sauceLabs: {
      testName: 'Karma/Webpack unit test player'
    },
    
    webpack: require('./webpack.config.js'),

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    captureTimeout: 120000,
    customLaunchers: customLaunchers,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: Object.keys(customLaunchers),
    singleRun: true,

    plugins: [
      require('karma-webpack'),
      require('karma-sauce-launcher'),
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