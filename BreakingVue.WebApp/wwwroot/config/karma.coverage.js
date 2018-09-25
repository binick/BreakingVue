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
            //{ pattern: 'src/**/*.ts', watch: true },
            { pattern: 'specs/coverage.ts', watch: true }
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
        webpack: {
            module: {
                rules: [
                    {
                        test: /\.(tsx?)|(js)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.vue$/,
                        loader: 'vue-loader',
                        exclude: /node_modules/,
                        options: {
                            loaders: {
                                'scss': 'vue-style-loader!css-loader!sass-loader',
                                'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                                'ts': 'babel-loader'
                            }
                        }
                    },
                    {
                        test: /\.ts$/,
                        enforce: 'post',
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: { esModules: true }
                        },
                        exclude: [
                            'node_modules',
                            /\.spec\.ts$/
                        ]
                    }
                ]
            }
        },
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
