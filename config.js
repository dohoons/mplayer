'use strict';

var pkg = require('./package.json'),
	ip = require("ip").address();

/* ---------------------------------------------------------------------------------- */

// 변수
var src = './src'; // 소스경로
var test = './test'; // 테스트
var dist = './dist'; // 배포
var skinSrc = {
	css: `${src}/skin/**/*.scss`,
	js: `${src}/skin/**/*.js`,
	img: `${src}/skin/**/img/*`
};

// 배너
var banner = `/**
 * ${pkg.description}
 * @author ${pkg.author.name}(${pkg.author.email})
 * @version v${pkg.version}
 * @license ${pkg.license}
 */
`;

// SASS 옵션
var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'compact' // nested, expanded, compact, or compressed.
};

// 오토프리픽스 설정
var autoprefixerOptions = {
	browsers: [
		'ie >= 9',
		'last 10 Chrome versions',
		'last 10 Firefox versions',
		'last 2 Opera versions',
		'iOS >= 7',
		'Android >= 4.1'
	],
	cascade: true,
	remove: false
};

// 웹서버 설정
var webServerOptions = [
	// 테스트 서버
	// 배포버전 프록시 매핑
	// http://localhost:8000
	{
		dir: test,
		host: 'localhost',
		port: 8000,
		livereload: false,
		directoryListing: false,
		open: false,
		proxies: [
			{
				source: '/mplayer',
				target: `http://${ip}:8100/dist`
			}
		]
	},
	// 네트워크에서 접속하는 경우
	{
		dir: test,
		host: ip,
		port: 8000,
		livereload: false,
		directoryListing: false,
		open: false,
		proxies: [
			{
				source: '/mplayer',
				target: `http://${ip}:8100/dist`
			}
		]
	},
	// 배포버전 매핑용
	{
   		baseDir: 'dist',
		dir: './',
		host: ip,
		port: 8100,
		livereload: false,
		directoryListing: false,
		open: false,
	}
];

/* ---------------------------------------------------------------------------------- */

module.exports = {
	pkg,
	src,
	test,
	dist,
	skinSrc,
	banner,
	sassOptions,
	autoprefixerOptions,
	webServerOptions
};