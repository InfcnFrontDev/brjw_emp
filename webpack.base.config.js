var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob')

var entry = {};
var plugins = [];

function getEntry(globPath) {
	var files = glob.sync(globPath);
	var entries = {}, file, dirname, basename, pathname, extname;
	for (var i = 0; i < files.length; i++) {
		file = files[i];

		dirname = path.dirname(file);
		extname = path.extname(file);
		basename = path.basename(file, extname);
		pathname = path.join(dirname, basename);

		entries[basename] = file + '/index.jsx';
	}
	return entries;
}

function getHtmlPlugins(entries) {
	var htmlPlugins = [];
	for (var key in entries) {
		htmlPlugins.push(new HtmlWebpackPlugin({
			filename: 'pages/' + key + '.html',
			template: './src/pages/' + key + '/template.html',
			inject: true,
			title: key,
			chunks: [key]
		}));
	}
	return htmlPlugins;
}

entry = getEntry('./src/pages/*');
plugins = getHtmlPlugins(entry);

module.exports = {
	entry,
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: 'dist/js/[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
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
	plugins
};
