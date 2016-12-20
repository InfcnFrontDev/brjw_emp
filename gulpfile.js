// 二哲 - 2016年08月15日
const path = require('path');
const gulp = require('gulp');
const watch = require('gulp-watch');
const watchPath = require('gulp-watch-path');
const gulpWebpack = require('gulp-webpack');
const del = require('del');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');

const webpackDevConfig = require('./webpack.dev.config');
const webpackProdConfig = require('./webpack.prod.config');

const colors = require('colors');
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'red',
	info: 'green',
	data: 'blue',
	help: 'cyan',
	warn: 'yellow',
	debug: 'magenta',
	error: 'red'
});


gulp.task('clean', function () {
	del([
		'./public/js/main*.js',
		'./public/pages/main.html'
	]);
});

gulp.task('dev', function () {
	runSequence('clean', function () {
		webpack(webpackDevConfig);
		server();
	})
});

gulp.task('build', function () {
	runSequence('clean', function () {
		webpack(webpackProdConfig);
	})
});

function server() {
	browserSync.init({
		startPath: "/",
		files: ["public/**/*.*", "!public/**/*.*__"],
		server: {
			baseDir: 'public'
		},
		open: false,
		notify: false
	});

	watch(['src/**/*.*', '!src/**/*.*__'], function (event) {
		var paths = watchPath(event, 'src/', 'public/');
		console.log('[' + 'WATCH'.info + '] ' + paths.srcPath);
		webpack(webpackDevConfig);
	});
}

function webpack(webpackConfig) {
	return gulp.src('')
		.pipe(gulpWebpack(webpackConfig))
		.on('error', function (err) {
			this.end()
		})
		.pipe(gulp.dest('public/'));
}

