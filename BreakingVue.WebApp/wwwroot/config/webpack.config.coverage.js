const path = require('path')
const webpackConfig = require('./webpack.config.test')

webpackConfig.entry = [
    'babel-polyfill',
    './wwwroot/specs/spec.ts',
    './wwwroot/specs/coverage.ts'
];

webpackConfig.output = {
    path: path.resolve(__dirname, '../specs'),
    filename: 'coverage.bundle.js'
};

webpackConfig.module.rules = [
    ...webpackConfig.module.rules,
    {
        test: /\.ts$/,
        enforce: 'post',
        loader: 'istanbul-instrumenter-loader',
        exclude: [
            'node_modules',
            /\.spec\.ts$/
        ],
        query: {
            esModules: true
        }
    }
]

webpackConfig.devtool = '#inline-source-map'

module.exports = webpackConfig