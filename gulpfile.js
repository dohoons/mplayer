'use strict';

var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	watch = require('gulp-watch'),
	webserver = require('gulp-webserver'),
	sass = require('gulp-sass'),
	dgbl = require('del-gulpsass-blank-lines'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	clean = require('gulp-clean'),
	rename = require('gulp-rename'),
	webpack = require('webpack-stream'),
	esdoc = require("gulp-esdoc"),
	header = require('gulp-header'),
	config = require('./config.js');

/* ---------------------------------------------------------------------------------- */

// 웹서버
gulp.task('server', function() {
	// 웹서버 옵션 객체 배열 루프
	config.webServerOptions.forEach(function(opt) {
		gulp.src(opt.dir).pipe(webserver(opt));
	});
});

// Clean
gulp.task('clean', function() {
	return gulp.src(config.dist).pipe(clean());
});

// ETC
gulp.task('etc', function() {
	return gulp.src(`${config.src}/etc/*`)
		.pipe(gulp.dest(config.dist));
});

// SKIN JS
gulp.task('skinJS', function() {
	return gulp.src(config.skinSrc.js)
		.pipe(gulp.dest(`${config.dist}/skin`));
});

// SKIN CSS
gulp.task('skinCSS', function() {
	return gulp.src(config.skinSrc.css)
		// SASS
		.pipe(sass(config.sassOptions).on('error', sass.logError))
		// 빈라인 제거
		.pipe(dgbl())
		// 오토 프리픽스
		.pipe(autoprefixer(config.autoprefixerOptions))
		// css 배포
		.pipe(gulp.dest(`${config.dist}/skin`))

		// css minify
		.pipe(minifyCSS())
		// 파일명 변경
		.pipe(rename({ suffix: '.min' }))
		// minify css 배포
		.pipe(gulp.dest(`${config.dist}/skin`));
});

// SKIN IMG Clean
gulp.task('skinIMGClean', function() {
	return gulp.src(`${config.dist}/skin/**/img`).pipe(clean());
});

// SKIN IMG
gulp.task('skinIMG', function() {
	return gulp.src(config.skinSrc.img)
		.pipe(gulp.dest(`${config.dist}/skin`));
});

// 문서화
gulp.task('doc', function() {
	return gulp.src(config.src).pipe(esdoc({
		"source": "./src/js",
		"destination": "./docs",
		"index": "./README.md"
	}));
});

// 스크립트
gulp.task('script', function() {
	var from = `${config.src}/js/player.js`;
	var to = `${config.pkg.name}.js`;

	var webpackConfig = {
		// devtool: 'source-map',
		output: {
			filename: to
		},
		module: {
			loaders: [
				{
					exclude: /(node_modules|bower_components)/,
					loader: 'babel',
					query: {
						"presets": ["latest"],
						"plugins": ["transform-object-assign"]
					}
				}
			]
		}
	};

	// webpack
	return gulp.src(from)
		.pipe(webpack(webpackConfig))
		.on('error', function (err) {
			console.log(err);
			this.emit('end');
		})
  		.pipe(header(config.banner, { pkg : config.pkg }))
		.pipe(gulp.dest(config.dist))

		// min 버전 배포
		.pipe(uglify())
  		.pipe(header(config.banner, { pkg : config.pkg }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(config.dist));
});

// 파일 변경 감지
gulp.task('watch', function() {
	// APP
    gulp.watch(`${config.src}/js/**/*.js`, ['script']);
    gulp.watch(`${config.src}/etc/*`, ['etc']);

	// 스킨
	gulp.watch(config.skinSrc.css, ['skinCSS']);
	gulp.watch(config.skinSrc.js, ['skinJS']);
	watch(config.skinSrc.img, function() {
		runSequence('skinIMGClean', ['skinIMG']);
	});
});

// build task
gulp.task('build', function() {
	runSequence('clean', [
		'script',
		'etc',
		'skinCSS',
		'skinJS',
		'skinIMG'
	]);
});

// default task
gulp.task('default', function() {
	runSequence('clean', [
		'server',
		'script',
		'etc',
		'skinCSS',
		'skinJS',
		'skinIMG',
		'watch'
	]);
});