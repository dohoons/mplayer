'use strict';

// DOMParser text/html MIME type polyfill
// import './vendors/domparser';

import { PUBLIC_NAMESPACE, DEFAULT_OPTIONS } from './config';
import PlayerAction from './player/action';
import VideoPlayer from './player/video-player';
import AudioPlayer from './player/audio-player';

/**
 * MPlayer : HTML5 Media Player
 * @class Player
 * @extends {PlayerAction}
 */
class Player extends PlayerAction {
	
	/**
	 * Creates an instance of Player.
	 * 
	 * @param {String|Element} target - video/audio HTML element 또는 css selector string
	 * @param {playerOptions} [options] - 플레이어 옵션 객체
	 * @returns {Player} Player Object
	 */
	constructor(target, options) {
		super();

		let defaultOptions = Object.assign({}, DEFAULT_OPTIONS);
		
		/**
		 * 플레이어 옵션
		 * @type {playerOptions}
		 */
		this.opt = Object.assign(defaultOptions, options);

		/**
		 * 타겟 video/audio element
		 * @type {Element}
		 */
		this.el = (typeof target === 'string') ? document.querySelector(target) : target;

		/** 
		 * 초기 element 복제본
		 * @type {Element}
		 */
		this.prevEl = this.el.cloneNode(true);

		/**
		 * 타겟이 video이면 true
		 * @type {Boolean}
		 */
		this.isVideo = (this.el.tagName === 'VIDEO') ? true : false;

		/**
		 * 플레이어 랩핑 객체
		 * @type {Object}
		 */
		this.wrapper = (this.isVideo) ? new VideoPlayer(this) : new AudioPlayer(this);

		/** 초기화 flag */
		this.initFlag = false;

		/**
		 * 사용자 이벤트 목록
		 * @type {Array}
		 */
		this.userEvents = [];

		// 초기화 실행
		this.init();

		return this;
	}

	/**
	 * 플레이어 초기화
	 * @param {playerOptions} [options] - 플레이어 옵션 객체
	 * @returns {Player} Player Object
	 */
	init(options) {
		this.destroy();

		this.opt = Object.assign(this.opt, options);
		
		this.wrapper.loadInterface(data => {
			this.wrapper.createInterface(data);
			this.wrapper.eventInit();
			this.el.load();
		});

		this.initFlag = true;

		return this;
	}

	/**
	 * 플레이어 제거하고 원래 상태로 돌림
	 * @returns {Player} Player Object
	 */
	destroy() {
		if(this.initFlag) {
			this.wrapper.removeInterface();
			this.events.off();

			this.initFlag = false;
		}

		return this;
	}

	/**
	 * 사용자 이벤트 등록.
	 * 중복 등록 가능
	 * @param {String} eventName - 이벤트이름
	 * @param {Function} handler - 이벤트핸들러 함수
	 * @returns {Player} Player Object
	 */
	on(eventName, handler) {
		this.userEvents.push({ eventName, handler });
		
		return this;
	}

	/**
	 * 사용자 이벤트 제거.
	 * 중복 이벤트는 모두 제거됨.
	 * @param {String} eventName - 이벤트이름
	 * @returns {Player} Player Object
	 */
	off(eventName) {
		let arr = [];
		this.userEvents.forEach(obj => {
			if(obj.eventName !== eventName) arr.push(obj);
		});
		this.userEvents = arr;
		
		return this;
	}
}

global[PUBLIC_NAMESPACE] = Player;
export default Player;