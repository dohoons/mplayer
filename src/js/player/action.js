'use strict';

/**
 * 플레이어 공통 기능
 * 
 * @export
 * @class PlayerAction
 */
export default class PlayerAction {
	
	/**
	 * 플레이어 재생
	 * @returns {Player} Player Object
	 */
	play() {
		this.el.play();
		return this;
	}

	/**
	 * 재생 일시정지
	 * @returns {Player} Player Object
	 */
	pause() {
		this.el.pause();
		return this;
	}
	
	/**
	 * 재생 토글
	 * @returns {Player} Player Object
	 */
	togglePlay() {
		if(this.el.paused) {
			this.el.play();
		} else {
			this.el.pause();
		}
		return this;
	}

	/**
	 * 재생 정지(처음으로 이동됨)
	 * @returns {Player} Player Object
	 */
	stop() {
		this.pause();
		this.el.currentTime = 0;
		return this;
	}

	/**
	 * 음소거 토글
	 * @returns {Player} Player Object
	 */
	toggleMute() {
		this.el.muted = !this.el.muted;
		this.ui.volume.position = (this.el.muted) ? 0 : this.el.volume / 1 * 100;
		return this;
	}

	/**
	 * 현재 재생 소스 url을 가져온다.
	 * @type {String}
	 */
	get src() {
		return this.el.currentSrc;
	}

	/**
	 * 재생 소스 url을 변경한다.
	 * @type {String}
	 */
	set src(url) {
		this.el.src = url;
	}

	/**
	 * 음량을 가져온다.
	 * @type {Number}
	 */
	get volume() {
		return this.el.volume;
	}

	/**
	 * 음량을 변경한다.
	 * @type {Number}
	 */
	set volume(num) {
		if(num > 1) num = 1;
		if(num < 0) num = 0;
		this.el.volume = num;
	}

	/**
	 * 현재시간을 가져온다.
	 * @type {Number}
	 */
	get currentTime() {
		return this.el.currentTime;
	}

	/**
	 * 현재시간을 변경한다.
	 * @type {Number}
	 */
	set currentTime(num) {
		this.el.currentTime = num;
	}

	/**
	 * 재생 속도를 가져온다.
	 * @type {Number}
	 */
	get playbackRate() {
		return this.el.playbackRate;
	}

	/**
	 * 재생 속도를 변경한다.
	 * @type {Number}
	 */
	set playbackRate(num) {
		this.el.playbackRate = num;
	}
}