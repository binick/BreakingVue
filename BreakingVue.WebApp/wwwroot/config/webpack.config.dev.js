const webpack = require('webpack')
const webpackConfig = require('./webpack.config.base')
const env = require('../environment/dev.env')

webpackConfig.module.rules = [...webpackConfig.module.rules,
{
    test: /\.(jpg|png|gif|svg|eot|ttf|woff|woff2)$/,
    loader: 'file-loader',
    exclude: /node_modules/,
    options: {
        name: '[name].[ext]?[hash]'
    }
},
{
    test: /\.scss$/,
    loaders: [
        'css-loader',
        'sass-loader'
    ],
    exclude: /node_modules/
}
]

webpackConfig.devtool = '#eval-source-map'

module.exports = webpackConfig