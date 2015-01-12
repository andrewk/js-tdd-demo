// Karma configuration
module.exports = function (config) {
  'use strict';

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    preprocessors: {
      'test/**/*.js': ['webpack'],
      'components/**/*.js': ['webpack'],
    },

    frameworks: ['jasmine'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/es5-shim/es5-shim.js',
      'node_modules/es5-shim/es5-sham.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/jasmine-ajax/lib/mock-ajax.js',
      'test/specs/**/*-spec.js',
      'test/fixtures/**/*.html',
      'test/jasmine-setup.js'
    ],

    // list of files to exclude
    exclude: [
      'components/**/specs/**/*',
      'components/**/tests/**/*'
    ],

    // test results reporter to use
    reporters: ['dots'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: [
      'Chrome'
    ],

    webpack: {
      devtool: "#inline-source-map",
      resolve: {
        root: __dirname,
        alias: {
          'jquery': 'jquery/dist/jquery.js',
        },
        modulesDirectories: ['js', 'components', '../node_modules'],
      },

      module: {
        loaders: [
          { test: /\.html$/, loader: 'raw-loader' },
        ],
      },

      externals: {
        'jquery' : '$'
      },
    },

    webpackServer: {
      progress: false,
      stats: false,
      debug: false,
      quiet: true
    },

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 5000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    // Karma will report all the tests that are slower than given time limit (in
    // ms).
    reportSlowerThan: 500,

    color: true
  });
};
