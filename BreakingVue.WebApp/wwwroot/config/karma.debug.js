var webpackConfig = require('./webpack.config.test')

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
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['ChromeWithDebugging'],
        customLaunchers: {
            ChromeWithDebugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9222'],
                debug: true
            }
        },
        proxies: {
            '/v1/': 'http://localhost:59353/v1/'
        },
        singleRun: false
    })
}
