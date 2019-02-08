// Path library
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',

    // The App entry file
    entry: './src/index.js',

    watch: true,

    // Output a single transpiled js file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    // Define the required loaders for different file types
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            data: `
                                @import "./node_modules/bootstrap/scss/_functions.scss";
                                @import "./node_modules/bootstrap/scss/_variables.scss";
                                @import "./node_modules/bootstrap/scss/_mixins.scss";
                              `
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.vue'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },

    plugins: [new VueLoaderPlugin(), new CopyWebpackPlugin([{ from: './src/index.html', to: './' }])]
};
