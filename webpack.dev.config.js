"use strict";
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
	module: {
		loaders: [
			{
				test: /\.css$/,
				exclude: /[\/\\]src[\/\\]/,
				loaders: [
					'style?sourceMap',
					'css'
				]
			},
			{
				test: /\.scss$/,
				exclude: /[\/\\](node_modules|bower_components|public\/)[\/\\]/,
				loaders: [
					'style?sourceMap',
					'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
					'postcss',
					'sass'
				]
			},
			{
				test: /\.css$/,
				exclude: /[\/\\](node_modules|bower_components|public\/)[\/\\]/,
				loaders: [
					'style?sourceMap',
					'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin()
	]
});
