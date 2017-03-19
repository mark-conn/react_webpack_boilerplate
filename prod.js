const resolve = require('path').resolve;
const webpack = require('webpack');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = ['react-dom', 'react'];


module.exports = function(env) {
    return {
        entry: {
            main: './src/index.js',
            vendor: VENDOR_LIBS
        },
        output: {
            path: resolve(__dirname, 'dist'),
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunckhash].js'
        },
        devtool: 'eval',
        module: {
          rules: [
            {
              test: /\.js$/,
              use: [
                'babel-loader',
              ],
              exclude: /node_modules/
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader?modules',
                'postcss-loader',
              ],
            },
          ],
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor', 'manifest'],
                miniChunks: Infinity,
            }),
            new webpack.HashedModuleIdsPlugin(),
            new WebpackChunkHash(),
            new ChunkManifestPlugin({
              filename: "chunk-manifest.json",
              manifestVariable: "webpackManifest"
            }),
            new HtmlWebpackPlugin({
                template: './index.html'
            })
        ]
    }
};
