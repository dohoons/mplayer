'use strict';

import { getCurrentScriptPath } from './util/util';

/**
 * 플레이어 옵션
 * @typedef	 {Object} 	playerOptions
 * 
 * @property {String} 	[options.skin='basic']			- 스킨 선택
 * @property {Boolean} 	[options.flexible=false]		- 유동 크기 사용
 * @property {String} 	[options.width='']				- 가로 크기 지정 (css width value)
 * @property {String} 	[options.height='']				- 세로 크기 (css height value)
 * @property {Number} 	[options.currentTime=0]			- 시작 시간 (sec)
 * @property {Boolean} 	[options.autoplay=false]		- 자동 재생
 * @property {Boolean} 	[options.loop=false]			- 반복 재생
 * @property {Boolean} 	[options.muted=false]			- 음소거
 * @property {Number} 	[options.volume=1.0]			- 음량(0 ~ 1)
 * @property {Number} 	[options.playbackRate=1.0]		- 재생 속도
 * @property {String} 	[options.preload='metadata']	- preload 옵션 (metadata | auto | none)
 * @property {Boolean} 	[options.contextmenu=true]		- contextmenu 사용
 * @property {Object} 	[options.event={}]				- 이벤트 객체
 */
const DEFAULT_OPTIONS = {
	skin: 'basic',
	flexible: false,
	width: '',
	height: '',
	currentTime: 0,
	autoplay: false,
	loop: false,
	muted: false,
	volume: 1.0,
	playbackRate: 1.0,
	preload: 'metadata',
	contextmenu: true,
	event: {}
};

const DEFAULT_CONTEXT_MENU = [
	{title: 'MPlayer 정보', action: function() {
		window.open('https://github.com/dohoons/mplayer');
	}},
	{title: '단축키 안내', action: function() {
		alert(`재생/일시정지 : space
전체화면 보기/해제 : F
앞으로/뒤로 : 왼쪽/오른쪽 방향키
볼륨조정 : 위/아래 방향키`);
	}},
	{title: '재생속도', action: function() {}, group: [
		{title: '0.5x', action: function() { this.playbackRate = 0.5; }},
		{title: '1.0x', action: function() { this.playbackRate = 1.0; }},
		{title: '1.5x', action: function() { this.playbackRate = 1.5; }},
		{title: '2.0x', action: function() { this.playbackRate = 2.0; }}
	]}
];

const UA = navigator.userAgent;
const IOS = /iPad|iPhone|iPod/.test(UA);
const IPAD = /iPad/.test(UA);
const SUPPORT_FS = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || document.mozFullScreenEnabled;
const FSCHANGE_EVENT_LIST = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
const ELEMENT_EVENT_LIST = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'error', 'ended', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause',
	'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
const SCRIPT_PATH = getCurrentScriptPath();

module.exports = {
	DEFAULT_OPTIONS,
	DEFAULT_CONTEXT_MENU,
	UA,
	IOS,
	IPAD,
	SUPPORT_FS,
	FSCHANGE_EVENT_LIST,
	ELEMENT_EVENT_LIST,
	SCRIPT_PATH
};