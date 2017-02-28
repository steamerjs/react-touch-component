'use strict';

const path = require('path'),
      webpack = require('webpack');

var config = require('./config'),
    configWebpack = config.webpack;

var Clean = require('clean-webpack-plugin'),
    PostcssImport = require('postcss-import'),
    Autoprefixer = require('autoprefixer'),
    PostcssImport = require('postcss-import'),
    Autoprefixer = require('autoprefixer');

var devConfig = {
    entry: {
        'index': path.join(configWebpack.path.example, "index.js"),
        'pindex': path.join(configWebpack.path.example, "pindex.js"),
    },
    output: {
        path: path.join(configWebpack.path.dev),
        filename: "[name].js"
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                loader: 'babel',
                query: {
                    cacheDirectory: './.webpack_cache/',
                    presets: [
                        ["es2015", {"loose": true}],
                        'react',
                        'stage-0'
                    ]
                },
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css?localIdentName=[name]-[local]-[hash:base64:5]', 'postcss', 'less?root=' + path.resolve('src')],
                include: [path.resolve(configWebpack.path.src)],
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "url-loader?limit=1000&name=img/[path]/[name].[ext]",
                ],
                include: path.resolve(configWebpack.path.src)
            },
        ],
        noParse: [
            
        ]
    },
    postcss: function(webpack) { 
        return [
            PostcssImport(),
            Autoprefixer() 
        ]
    },
    resolve: {
        root: [
            path.resolve(configWebpack.path.src)
        ],
        moduledirectories:['node_modules', configWebpack.path.src],
        extensions: ["", ".js", ".jsx", ".es6", "css", "scss", "less", "png", "jpg", "jpeg", "ico"],
        alias: {
        }
    },
    plugins: [
        // remove previous build folder
        new Clean(['dev'], {root: path.resolve()}),
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    watch: true, //  watch mode
    // 是否添加source-map，可去掉注释开启
    // devtool: "#inline-source-map",
};


module.exports = devConfig;