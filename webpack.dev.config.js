"use strict";
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";

// add hot-reload related code to entry chunks
Object.keys(webpackBaseConfig.entry).forEach(function (name) {
	webpackBaseConfig.entry[name] = ['react-hot-loader/patch'].concat(webpackBaseConfig.entry[name])
});

module.exports = merge(webpackBaseConfig, {
	watch: true,
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
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,

		progress: true,


		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new BrowserSyncWebpackPlugin({
			port: 3001,
			files: ["public/**/*.*", "!public/**/*.*__"],
			server: {baseDir: ['public/']},
			open: false,
			notify: false
		})
	]
});
