var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var PATH = require('path');

module.exports = {

    target : 'web',

    devtool: false,

    context : PATH.resolve(__dirname, 'src'),

    entry : {
        'polyfills': './polyfills.ts',
        'vendor': './vendor.ts',
        'app': './main.ts'
    },

    output: {
        path : PATH.resolve(__dirname, 'dist'),
        publicPath:'/ng/',
        filename: '[name].js'
    },

    devServer : {
        stats: 'minimal',
        port: 8080,
        host: "localhost",
        inline: true,
        noInfo: false,
        publicPath: '/',
        historyApiFallback: {
            rewrites: [
                { from: /\/favicon.ico/, to: './assets/images/icons/favicon.ico' }
            ]
           // disableDotRule: false
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    resolve: {
        extensions: ['.ts', '.js', '.jpg', '.jpeg', '.gif', '.png', '.html', '.css'],
        modules: [PATH.resolve(__dirname), 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: 'raw-loader',
                include : PATH.resolve(__dirname,'src', 'app')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
               // exclude: PATH.resolve(__dirname, 'src', 'app') ???
            },
            {
                test: /\.png$/,
                loader:[
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            PATH.resolve(__dirname, 'src'),
            {}
        ),

        new webpack.DefinePlugin({
            'process.env': {
                'ENVIRONMENT': JSON.stringify('development')
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new CleanWebpackPlugin("dist", {
            root: __dirname
        }),

        new ExtractTextPlugin("[name].css"),

        new HtmlWebpackPlugin({
            title : 'index',
            filename : 'index.html',
            template: './modules/index.php',
            chunks: ['polyfills', 'vendor', 'app']
        }),

        new CopyWebpackPlugin([
              {
                  from: './assets',
                  to: 'assets'
              }
        ],{
            copyUnmodified: true
        })
    ]
};
