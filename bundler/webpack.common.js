const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: {
                index: './src/js/script.js',
                about: './src/js/about.js',
                skills: './src/js/skills.js',
                projects: './src/js/projects.js',
                education: './src/js/education.js',
                contact: './src/js/contact.js',
            },
    output:
    {
        hashFunction: 'xxhash64',
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: true,
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            filename: 'about.html',
            chunks: ['about'],
        }),
        new HtmlWebpackPlugin({
            template: './src/skills.html',
            filename: 'skills.html',
            chunks: ['skills'],
        }),
        new HtmlWebpackPlugin({
            template: './src/projects.html',
            filename: 'projects.html',
            chunks: ['projects'],
        }),
        new HtmlWebpackPlugin({
            template: './src/education.html',
            filename: 'education.html',
            chunks: ['education'],
        }),
        new HtmlWebpackPlugin({
            template: './src/contact.html',
            filename: 'contact.html',
            chunks: ['contact'],
        }),
        new MiniCSSExtractPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use:
                [
                    'html-loader'
                ]
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:{
                    loader: 'file-loader',
                    options:{
                        name: '[name].[hash].[ext]',
                        outputPath:'imgs'
                    }
                },
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/images/[hash][ext]'
                }
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/fonts/[hash][ext]'
                }
            },

            // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                type: 'asset/source',
                generator:
                {
                    filename: 'assets/images/[hash][ext]'
                }
            }
        ]
    }
}