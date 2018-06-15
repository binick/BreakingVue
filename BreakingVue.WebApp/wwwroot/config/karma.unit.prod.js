var webpackConfig = require('./webpack.config.test');

module.exports = function (config) {
    config.set({
        basePath: '..',
        frameworks: [
            'mocha',
            'chai',
            'sinon'
        ],
        files: [
            { pattern: 'specs/index.html', watch: true },
            { pattern: 'dist/build.js', watch: true },
            { pattern: 'specs/spec.bundle.js', watch: true }         
        ],
        reporters: ['mocha'],
        preprocessors: {
            'specs/spec.ts': ['webpack']
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        },
        mime: {
            'text/x-typescript': ['ts']
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,      
        logLevel: config.LOG_INFO,
        color: true,
        browsers: ['PhantomJS'],
        singleRun: true
    });
}