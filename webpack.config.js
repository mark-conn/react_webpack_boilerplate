const resolve = require('path').resolve;
const webpack = require('webpack');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';

const VENDOR_LIBS = ['react-dom', 'react'];

module.exports = {
  entry: {
      client: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    vendor: VENDOR_LIBS
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].[chunckhash].js',
    chunkFilename: '[name].[chunckhash].js',
    publicPath: ASSET_PATH
  },

  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH
  },

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
    new webpack.DefinePlugin({
        'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
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
        template: './index.ejs'
    }),
    new InlineManifestWebpackPlugin({
       name: 'webpackManifest'
   })
  ]
};
