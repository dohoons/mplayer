'use strict';

import classList from 'classlist';
import { ELEMENT_EVENT_LIST } from '../config';
import { sec2str, getMatchAttr } from '../util/util';

/**
 * 플레이어 공통 이벤트
 * 
 * @export
 * @class CommonEvent
 */
export default class CommonEvent {
	/**
	 * Creates an instance of CommonEvent.
	 * @param {Player} Player
	 */
	constructor(Player) {
		/** @type {Player} */
		this.player = Player;
	}

	/**
	 * 플레이어 이벤트 등록
	 */
	on() {
		let container = this.player.ui.container;

		ELEMENT_EVENT_LIST.forEach(
			eventName => this.player.el.addEventListener(eventName, this[eventName].bind(this), false)
		);

		// 내부에 포커스되면 플레이어 활성화. 일정시간 이후 해제
		[].forEach.call(container.querySelectorAll('a, button, input, [tabindex]'), el => {
			el.addEventListener('focus', () => classList(this.player.ui.container).add('mp-is-focus'));
			el.addEventListener('focus', this.activeFocus.bind(this));
 			el.addEventListener('blur', () => classList(this.player.ui.container).remove('mp-is-focus'));
		});

		// 플레이어 활성화. 일정시간 이후 해제
		// 마우스아웃해도 해제
		container.addEventListener('mousemove', this.active.bind(this), false);
		container.addEventListener('touchmove', this.active.bind(this), false);
		container.addEventListener('touchstart', this.active.bind(this), false);
		container.addEventListener('mouseout', () => classList(container).remove('mp-is-active'), false);

		container.addEventListener('contextmenu', this.contextmenu.bind(this), false);

		clearInterval(container.sizeTimer);
		container.sizeTimer = setInterval(this.updateSizeOption.bind(this), 50);

		window.addEventListener('keydown', this.keydown.bind(this), false);
	}

	/**
	 * 플레이어 이벤트 제거
	 */
	off() {
		ELEMENT_EVENT_LIST.forEach(
			eventName => this.player.el.removeEventListener(eventName, this[eventName].bind(this), false)
		);

		clearInterval(this.player.ui.container.sizeTimer);
		
		window.removeEventListener('keydown', this.keydown.bind(this), false);
	}

	/**
	 * 콜백함수 호출
	 * @param {Object|String} e - 이벤트 객체 or 이벤트 이름
	 * @param {any} val
	 */
	callback(e, val) {
		let eventName, 
			param;
		
		if(typeof e === 'string') {
			eventName = e;
			param = val;
		} else {
			eventName = e.type;
			param = e;
		}

		this.player.userEvents.forEach(obj => {
			if(obj.eventName === eventName) {
				obj.handler.call(this.player, param);
			}
		});
	}

	/**
	 * Buffered 게이지 적용
	 */
	updateBuffered() {
		let el = this.player.el,
			bar = this.player.ui.buffered,
			range = 0,
			bf = el.buffered,
			time = el.currentTime,
			duration = el.duration,
			loadStartPercentage = 0,
			loadEndPercentage = 0,
			loadPercentage = 0;

		try {
			while(!(bf.start(range) <= time && time <= bf.end(range))) {
				range += 1;
			}
			loadStartPercentage = bf.start(range) / el.duration * 100;
			loadEndPercentage = bf.end(range) / el.duration * 100;
			loadPercentage = loadEndPercentage - loadStartPercentage;
			
			bar.style.width = loadPercentage + "%";
			bar.style.left = loadStartPercentage + "%";
		} catch(e) {
			// console.log(e);
		}
	}

	/**
	 * 플레이 상태 반영
	 */
	updatePlayState() {
		let player = this.player,
			el = player.el,
			btnPlayPause = player.ui.btnPlayPause,
			currentTime = player.ui.currentTime,
			totalTime = player.ui.totalTime,
			btnMute = player.ui.btnMute;
		
		if(btnPlayPause) {
			if(el.paused) {
				classList(btnPlayPause).remove('mp-is-paused');
				btnPlayPause.innerHTML = btnPlayPause.getAttribute('data-first-text');
			} else {
				classList(btnPlayPause).add('mp-is-paused');
				btnPlayPause.innerHTML = btnPlayPause.getAttribute('data-second-text');
			}
		}
		
		if(el.paused) {
			classList(player.ui.container).remove('mp-is-playing');
		} else {
			classList(player.ui.container).add('mp-is-playing');
		}

		if(currentTime) {
			player.ui.currentTime.innerHTML = sec2str(el.currentTime);
		}

		if(totalTime) {
			player.ui.totalTime.innerHTML = sec2str(el.duration);
		}

		if(btnMute) {
			if(el.muted) {
				classList(btnMute).add('mp-is-muted');
				btnMute.innerHTML = btnMute.getAttribute('data-second-text');
			} else {
				classList(btnMute).remove('mp-is-muted');
				btnMute.innerHTML = btnMute.getAttribute('data-first-text');
			}
		}
	}

	/**
	 * 사이즈 클래스 옵션 반영
	 */
	updateSizeOption() {
		let container = this.player.ui.container,
			maxwidth = getMatchAttr(container, 'data-maxwidth-'),
			minwidth = getMatchAttr(container, 'data-minwidth-'),
			size = 0;
		
		if(maxwidth !== null) {
			size = parseInt(maxwidth.name);

			if(container.offsetWidth <= size) {
				classList(container).add(maxwidth.value);
			} else {
				classList(container).remove(maxwidth.value);
			}
		}
		
		if(minwidth !== null) {
			size = parseInt(minwidth.name);

			if(container.offsetWidth >= size) {
				classList(container).add(minwidth.value);
			} else {
				classList(container).remove(minwidth.value);
			}
		}
	}

	/**
	 * 활성화 될때
	 */
	active() {
		let container = this.player.ui.container;

		classList(container).remove('mp-is-active-focus');
		classList(container).add('mp-is-active');

		clearTimeout(container.activeTimer);
		container.activeTimer = setTimeout(() => classList(container).remove('mp-is-active'), 2000);
	}

	/**
	 * 포커스되어 활성화될 때
	 */
	activeFocus() {
		let container = this.player.ui.container;

		classList(container).remove('mp-is-active');
		classList(container).add('mp-is-active-focus');

		clearTimeout(container.activeTimer);
		container.activeTimer = setTimeout(() => classList(container).remove('mp-is-active-focus'), 2000);
	}

	/**
	 * contextmenu
	 */
	contextmenu(e) {
		e.preventDefault();
		
		if(this.player.opt.contextmenu) {
			this.player.ui.contextmenu.show(e);
		}
		
		this.callback(e);
	}

	/**
	 * keydown - 단축키처리
	 */
	keydown(e) {
		let player = this.player;

		if(classList(player.ui.container).contains('mp-is-focus')) {
			switch(e.keyCode) {
				case 32: // 스페이스바
					e.preventDefault();
					player.togglePlay();
					break;
				case 70: // F키
					if(player.ui.btnFullscreen) {
						this.FSButtonHandler.call(this);
					}
					break; 
				case 37: // 왼쪽 화살표
					e.preventDefault();
					player.currentTime -= 5;
					break;
				case 39: // 오른쪽 화살표
					e.preventDefault();
					player.currentTime += 5;
					break;
				case 38: // 위쪽 화살표
					e.preventDefault();
					player.volume += 0.05;
					break;
				case 40: // 아래쪽 화살표
					e.preventDefault();
					player.volume -= 0.05;
					break;
			}
		}
	}

	/**
	 * Fires when the loading of an audio/video is aborted
	 * @param {Event} e
	 */
	abort(e) {
		this.callback(e);
	}

	/**
	 * Fires when the browser can start playing the audio/video
	 * @param {Event} e
	 */
	canplay(e) {
		this.callback(e);
	}

	/**
	 * Fires when the browser can play through the audio/video without stopping for buffering
	 * @param {Event} e
	 */
	canplaythrough(e) {
		this.updateBuffered();
		this.callback(e);
	}

	/**
	 * Fires when the duration of the audio/video is changed
	 * @param {Event} e
	 */
	durationchange(e) {
		this.callback(e);
	}

	/**
	 * Fires when the current playlist is empty
	 * @param {Event} e
	 */
	emptied(e) {
		this.callback(e);
	}

	/**
	 * Fires when the current playlist is ended
	 * @param {Event} e
	 */
	ended(e) {
		this.callback(e);
	}

	/**
	 * Fires when an error occurred during the loading of an audio/video
	 * @param {Event} e
	 */
	error(e) {
		this.callback(e);
	}

	/**
	 * Fires when the browser has loaded the current frame of the audio/video
	 * @param {Event} e
	 */
	loadeddata(e) {
		this.updateBuffered();
		this.callback(e);
	}

	/**
	 * Fires when the browser has loaded meta data for the audio/video
	 * @param {Event} e
	 */
	loadedmetadata(e) {
		this.player.wrapper.applyPlayerOption();
		this.updatePlayState();
		this.updateSizeOption();
		this.callback(e);
	}

	/**
	 * Fires when the browser starts looking for the audio/video
	 * @param {Event} e
	 */
	loadstart(e) {
		this.callback(e);
	}

	/**
	 * Fires when the audio/video has been paused
	 * @param {Event} e
	 */
	pause(e) {
		this.updatePlayState();
		this.callback(e);
	}

	/**
	 * Fires when the audio/video has been started or is no longer paused
	 */
	play() {
		this.updatePlayState();
		this.callback('play');
	}

	/**
	 * Fires when the audio/video is playing after having been paused or stopped for buffering
	 * @param {Event} e
	 */
	playing(e) {
		this.updateBuffered();
		this.callback(e);
	}
	
	/**
	 * Fires when the browser is downloading the audio/video
	 * @param {Event} e
	 */
	progress(e) {
		this.updateBuffered();
		this.callback(e);
	}

	/**
	 * Fires when the playing speed of the audio/video is changed
	 * @param {Event} e
	 */
	ratechange(e) {
		this.callback(e);
	}

	/**
	 * Fires when the user is finished moving/skipping to a new position in the audio/video
	 * @param {Event} e
	 */
	seeked(e) {
		clearTimeout(this.player.ui.container.seekTimer);
		this.player.ui.container.seekTimer = setTimeout(() => classList(this.player.ui.container).remove('mp-is-seeking'), 800);
		this.callback(e);
	}

	/**
	 * Fires when the user starts moving/skipping to a new position in the audio/video
	 * @param {Event} e
	 */
	seeking(e) {
		classList(this.player.ui.container).add('mp-is-seeking');
		this.callback(e);
	}

	/**
	 * Fires when the browser is trying to get media data, but data is not available
	 * @param {Event} e
	 */
	stalled(e) {
		this.callback(e);
	}

	/**
	 * Fires when the browser is intentionally not getting media data
	 * @param {Event} e
	 */
	suspend(e) {
		this.callback(e);
	}

	/**
	 * Fires when the current playback position has changed
	 * @param {Event} e
	 */
	timeupdate(e) {
		if(this.player.ui.progress.isDown === false) {
			this.player.ui.progress.position = this.player.el.currentTime / this.player.el.duration * 100;
		}
		this.updatePlayState();
		this.callback(e);
	}

	/**
	 * Fires when the volume has been changed
	 * @param {Event} e
	 */
	volumechange(e) {
		this.player.ui.volume.position = (this.player.el.muted) ? 0 : this.player.el.volume / 1 * 100;
		this.updatePlayState();
		this.callback(e);
	}

	/**
	 * Fires when the video stops because it needs to buffer the next frame
	 * @param {Event} e
	 */
	waiting(e) {
		this.callback(e);
	}
}