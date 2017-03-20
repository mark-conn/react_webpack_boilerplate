const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = function (env) {
    return {
        entry: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './index.js'
        ],
        output: {
            filename: 'bundle.js',
            path: resolve(__dirname, 'dev'),
            publicPath: '/'
        },
        context: resolve(__dirname, 'src'),
        devtool: 'inline-source-map',
        devServer: {
            hot: true,
            contentBase: resolve(__dirname, 'dev'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader'],
                    exclude: /node_modules/
                }, {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader?modules',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        ]
    };
};
