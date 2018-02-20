'use strict';

import classList from 'classlist';
import { DEFAULT_OPTIONS, DEFAULT_CONTEXT_MENU, UA, IOS, SCRIPT_PATH } from '../config';
import VideoEvent from '../event/video-event';
import AudioEvent from '../event/audio-event';
import ContextMenu from '../ui/contextmenu';

// 전역 스킨 리스트 변수 초기화
// 스킨 load 완료되면 '스킨명-타입':'레이아웃HTML' 조합으로 추가됨
// 기본스킨의 경우 : window.MPlayerSkinList['mplayer-basic-video'], window.MPlayerSkinList['mplayer-basic-audio']
let MPlayerSkinList = window.MPlayerSkinList = {};

/**
 * 플레이어 랩핑
 * 
 * @export
 * @class PlayerWrapper
 */
export default class PlayerWrapper {
	/**
	 * Creates an instance of PlayerWrapper.
	 * @param {Player} Player
	 */
	constructor(Player) {
		/** @type {Player} */
		this.player = Player;

		/** @type {Object} */
		this.player.ui = {};

		return this;
	}

	/**
	 * UI 스킨 레이아웃 동적으로 가져오기
	 * @param {Function} callback - 로드 완료 콜백 함수
	 */
	loadInterface(callback) {
		let player = this.player,
			type = (player.isVideo) ? 'video' : 'audio',
			loader = document.createElement('script'),
			skinPath = `${SCRIPT_PATH}/skin/${player.opt.skin}`;

		// 스킨 로드
		loader.src = `${skinPath}/tpl.${type}.js`;
		player.el.parentNode.insertBefore(loader, player.el);

		// 문서에 해당 스킨 css가 존재하지 않으면 append
		if(document.querySelectorAll(`link[href*="${skinPath}"]`).length === 0) {
			let cssLink = document.createElement('link');
			cssLink.setAttribute('rel', 'stylesheet');
			cssLink.setAttribute('href', `${skinPath}/skin.min.css`);

			document.body.appendChild(cssLink);
		}

		// Promise polyfill 너무 무거워서 콜백 함수로 처리
		if(typeof callback === 'function') {
			loader.addEventListener('load', () => {
				callback.call(this, MPlayerSkinList[`${player.opt.skin}-${type}`]);
			});
		}
	}

	/**
	 * UI 생성 후 랩핑
	 */
	createInterface(htmlString) {
		let player = this.player,
			el = player.el,
			ui = player.ui,
			wrapper = document.createElement('div');
		
		// remove script tag
		el.parentNode.removeChild(el.previousElementSibling);

		// wrapping
		el.parentNode.insertBefore(wrapper, el);
		wrapper.outerHTML = htmlString;
		ui.container = el.previousElementSibling;
		ui.container.querySelector('.mp-media-el').appendChild(el);

		// element manipulation
		classList(el).add('el');
		el.controls = false;
		el.setAttribute('playsinline', '');
		el.setAttribute('tabindex', '0');

		if(UA.indexOf('MSIE 9') > -1) {
			classList(ui.container).add('mp-is-ie9');
		}

		if(IOS) {
			classList(ui.container).add('mp-is-ios');
		}

		if(player.opt.contextmenu) {
			ui.contextmenu = new ContextMenu(DEFAULT_CONTEXT_MENU, player);
		}
	}

	/**
	 * UI 제거
	 */
	removeInterface() {
		let player = this.player,
			ui = player.ui;

		player.el = player.prevEl;
		ui.container.parentNode.replaceChild(player.el, ui.container);
		ui = null;
	}

	/**
	 * 플레이어 옵션 적용
	 */
	applyPlayerOption() {
		let player = this.player,
			el = player.el,
			opt = player.opt;

		// 이벤트 옵션 반영
		for(let eventName in opt.event) {
			player.on(eventName, opt.event[eventName]);
		}
		
		el.muted = opt.muted;
		player.ui.volume.position = (el.muted) ? 0 : opt.volume / 1 * 100;

		el.playbackRate = opt.playbackRate;
		el.loop = opt.loop;
		el.preload = opt.preload;

		if(opt.currentTime !== 0 && !isNaN(el.duration)) {
			player.currentTime = opt.currentTime;
		}

		if(opt.autoplay) {
			player.play();
		}
	}

	/**
	 * 플레이어 이벤트 적용
	 */
	eventInit() {
		this.player.events.on();
	}
}