"use strict";
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = merge(webpackBaseConfig, {
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: 'js/[name]-[chunkhash].js'
	},
	module: {
		loaders: [
			{
				test: /[\/\\]src[\/\\].*\.css/,
				exclude: /(node_modules|bower_components|public\/)/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
			}, {
				test: /[\/\\]src[\/\\].*\.scss/,
				exclude: /(node_modules|bower_components|public\/)/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
			}, {
				test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css')
			}
		]
	},
	plugins: [
		// new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			}
		}),
		new ExtractTextPlugin('css/[name]-[chunkhash].css', {
			allChunks: true
		}),
		new webpack.optimize.DedupePlugin()
	]
});
