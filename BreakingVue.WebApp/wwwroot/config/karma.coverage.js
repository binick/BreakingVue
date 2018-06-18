var path = require('path')
var webpackConfig = require('./webpack.config.coverage')

module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: [
            'source-map-support',
            'mocha',
            'chai',
            'sinon'
        ],
        files: [
            { pattern: 'specs/coverage.bundle.js', watch: true }
        ],
        reporters: ['coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly', 'text-summary'],
            dir: path.join(__dirname, '../specs/coverage'),
            combineBrowserReports: true,
            fixWebpackSourcePaths: true
        },
        preprocessors: {
            'specs/coverage.ts': ['webpack']
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
        logLevel: config.LOG_ERROR,
        browsers: ['PhantomJS'],
        proxies: {
            '/v1/': 'http://localhost:59353/v1/'
        },
        singleRun: true
    })
}
