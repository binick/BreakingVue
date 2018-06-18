const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.base')
const env = require('../environment/dev.env')

webpackConfig.entry = [
    'babel-polyfill',
    './wwwroot/specs/spec.ts'
];

webpackConfig.output = {
    path: path.resolve(__dirname, '../specs'),
    filename: 'spec.bundle.js'
};

webpackConfig.module.rules = [
    ...webpackConfig.module.rules,
    {
        test: /\.html/,
        exclude: /node_modules/,
        loader: 'html-loader'
    }
]
// webpackConfig.plugins = [
//     new webpack.SourceMapDevToolPlugin({
//         filename: null, // if no value is provided the sourcemap is inlined
//         test: /\.(ts|js)($|\?)/i
//     })
// ]

webpackConfig.mode = 'development'

webpackConfig.devtool = '#inline-source-map'

module.exports = webpackConfig