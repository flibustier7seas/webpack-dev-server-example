/* eslint-env node */
var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: {
        "bundle": [
            // activate HMR for React
            "react-hot-loader/patch",
            "./src/index"
        ]
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader',],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?modules',],
            },
        ],
    },

    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};