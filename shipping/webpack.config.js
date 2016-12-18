'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    target: 'node',
    entry: {
        tests: './tests/index',
        main: './src/main'
    },
    externals: nodeModules,
    context: __dirname,
    devtool: 'sourcemap',
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        path: './target',
        filename: 'bundle.[name].js'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
        alias: {
            api: path.join(__dirname, 'src')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            PROJECT_ROOT: '"' + __dirname + '"'
        }),

        // TODO dev only
        new webpack.BannerPlugin('require("source-map-support").install();', {
            raw: true,
            entryOnly: false
        })
    ]
};
