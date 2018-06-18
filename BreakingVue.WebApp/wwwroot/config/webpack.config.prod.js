require('babel-polyfill')

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.base')
const env = require('../environment/prod.env')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

webpackConfig.module.rules = [
    ...webpackConfig.module.rules,
    {
        test: /\.scss$/,
        loaders: [
            'css-loader',
            'sass-loader'
        ],
        exclude: /node_modules/
    },
    {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
            regExp: /(img\/.*)/,
            name: '[name].[ext]',
            publicPath: '/dist/',
            outputPath: 'assets/img/'
        }
    },
    {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
            regExp: /(fonts\/.*)/,
            name: '[name].[ext]',
            publicPath: '/dist/',
            outputPath: 'fonts/'
        }
    }
]

webpackConfig.optimization = {
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
                comments: false,
                compress: {
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true
                }
            }
        })
    ]
}

module.exports = webpackConfig