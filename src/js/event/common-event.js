'use strict';

import { DEFAULT_EVENT_LIST } from '../config';
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
		DEFAULT_EVENT_LIST.forEach(
			eventName => this.player.el.addEventListener(eventName, this[eventName].bind(this), false)
		);

		window.addEventListener('resize', this.updateSizeOption.bind(this), false);
		window.addEventListener('scroll', this.updateSizeOption.bind(this), false);
	}

	/**
	 * 플레이어 이벤트 제거
	 */
	off() {
		DEFAULT_EVENT_LIST.forEach(
			eventName => this.player.el.removeEventListener(eventName, this[eventName].bind(this), false)
		);

		window.removeEventListener('resize', this.updateSizeOption.bind(this), false);
		window.removeEventListener('scroll', this.updateSizeOption.bind(this), false);
	}

	/**
	 * 콜백함수 호출
	 * @param {Object|String} e - 이벤트 객체 or 이벤트 이름
	 * @param {any} val
	 */
	callback(e, val) {
		let eventName, 
			param;

		if(e.constructor.name.indexOf('Event') > -1) {
			eventName = e.type;
			param = e;
		} else {
			eventName = e;
			param = val;
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
				btnPlayPause.classList.remove('is-paused');
				btnPlayPause.innerHTML = btnPlayPause.getAttribute('data-first-text');
			} else {
				btnPlayPause.classList.add('is-paused');
				btnPlayPause.innerHTML = btnPlayPause.getAttribute('data-second-text');
			}
		}
		
		if(el.paused) {
			player.ui.container.classList.remove('is-playing');
		} else {
			player.ui.container.classList.add('is-playing');
		}

		if(currentTime) {
			player.ui.currentTime.innerHTML = sec2str(el.currentTime);
		}

		if(totalTime) {
			player.ui.totalTime.innerHTML = sec2str(el.duration);
		}

		if(btnMute) {
			if(el.muted) {
				btnMute.classList.add('is-muted');
				btnMute.innerHTML = btnMute.getAttribute('data-second-text');
			} else {
				btnMute.classList.remove('is-muted');
				btnMute.innerHTML = btnMute.getAttribute('data-first-text');
			}
		}
	}

	/**
	 * 사이즈 클래스 옵션 반영
	 */
	updateSizeOption() {
		let container = this.player.ui.container,
			maxwidth = getMatchAttr.call(container, 'data-maxwidth-'),
			minwidth = getMatchAttr.call(container, 'data-minwidth-'),
			size = 0;
		
		if(maxwidth !== null) {
			size = parseInt(maxwidth.name);

			if(container.offsetWidth <= size) {
				container.classList.add(maxwidth.value);
			} else {
				container.classList.remove(maxwidth.value);
			}
		}
		
		if(minwidth !== null) {
			size = parseInt(minwidth.name);

			if(container.offsetWidth >= size) {
				container.classList.add(minwidth.value);
			} else {
				container.classList.remove(minwidth.value);
			}
		}
	}

	/**
	 * element click
	 */
	click() {
		if(this.player.el.paused) {
			this.player.play();
		} else {
			this.player.pause();
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
		this.player.ui.container.classList.remove('is-seeking');
		this.callback(e);
	}

	/**
	 * Fires when the user starts moving/skipping to a new position in the audio/video
	 * @param {Event} e
	 */
	seeking(e) {
		this.player.ui.container.classList.add('is-seeking');
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