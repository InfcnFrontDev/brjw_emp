var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'main': ['./src/index.jsx']
	},
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: 'js/[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				exclude: /(node_modules|bower_components|public\/)/,
				loader: "babel"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "file"
			},
			{
				test: /\.(woff|woff2)$/,
				exclude: /(node_modules|bower_components)/,
				loader: "url?prefix=font/&limit=5000"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "url?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "url?limit=10000&mimetype=image/svg+xml"
			},
			{
				test: /\.gif/,
				exclude: /(node_modules|bower_components)/,
				loader: "url-loader?limit=10000&mimetype=image/gif"
			},
			{
				test: /\.jpg/,
				exclude: /(node_modules|bower_components)/,
				loader: "url-loader?limit=10000&mimetype=image/jpg"
			},
			{
				test: /\.png/,
				exclude: /(node_modules|bower_components)/,
				loader: "url-loader?limit=10000&mimetype=image/png"
			}
		]
	},
	plugins: [
		// new webpack.ProvidePlugin({
		// 	$: "jquery"
		// }),
		new HtmlWebpackPlugin({
			filename: 'main.html',
			template: './src/template.html',
			inject: true,
			title: 'main',
			chunks: ['main']
		})
	],
	babel: { //配置babel
		"presets": ["react", "es2015", 'stage-2'],
		"plugins": ["transform-runtime"]
	}
};
