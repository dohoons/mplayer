'use strict';

import classList from 'classlist';
import { IOS, IPAD, SUPPORT_FS, FSCHANGE_EVENT_LIST } from '../config';
import CommonEvent from './common-event';

/**
 * 비디오 UI 이벤트 클래스
 * 
 * @class VideoUIEvent
 */
class VideoUIEvent {
	/**
	 * Creates an instance of VideoUIEvent.
	 * @param {Player} Player
	 */
	constructor(Player) {
		/** @type {Player} */
		this.player = Player;
	}

	/** 탐색 드래그 핸들러 */
	progressOnDrag(value) {
		if(this.player.el.duration) {
			this.player.el.currentTime = this.player.el.duration / 100 * value;
		}
	}

	/** 음량 드래그 핸들러 */
	volumeOnDrag(value) {
		this.player.el.volume = value / 100;
	}

	/** 재생 버튼 클릭 */
	btnPlay() {
		this.player.play();
	}

	/** 일시정지 버튼 클릭 */
	btnPause() {
		this.player.pause();
	}

	/** 재생/일시정지 토글 클릭 */
	btnPlayPause() {
		this.player.togglePlay();
	}

	/** 정지 버튼 클릭 */
	btnStop() {
		this.player.stop();
	}

	/** 영상영역 클릭 */
	videoClick() {
		this.player.togglePlay();
		this.player.el.focus();
	}

	/** 포스터 클릭 */
	posterClick() {
		this.player.play();
		this.player.el.focus();
	}

	/** 음소거 토글 클릭 */
	btnToggleMute() {
		this.player.toggleMute();
	}

	/** 음량 mousedown */
	volumeBar() {
		this.player.el.muted = false;
	}
}

/**
 * 비디오 플레이어 이벤트
 * 
 * @class VideoEvent
 * @extends {CommonEvent}
 */
class VideoEvent extends CommonEvent {
	/**
	 * Creates an instance of VideoEvent.
	 * @param {Player} Player
	 */
	constructor(Player) {
		super(Player);

		/** @type {Object} */
		this.uiEvents = new VideoUIEvent(Player);
	}

	/**
	 * Fires when the audio/video has been started or is no longer paused
	 */
	play() {
		super.play();
		classList(this.player.ui.poster).add('mp-hide');
	}

	/**
	 * Fires when the current playback position has changed
	 * @param {Event} e
	 */
	timeupdate(e) {
		super.timeupdate(e);
		classList(this.player.ui.poster).add('mp-hide');
	}

	/**
	 * 전체화면 버튼 핸들러
	 */
	FSButtonHandler() {
		let container = this.player.ui.container;
		let btn = this.player.ui.btnFullscreen;
		
		if(SUPPORT_FS) {
			let fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
			
			if (Boolean(fullscreenElement) === false) {
				let fs = container.requestFullscreen || container.mozRequestFullScreen || container.webkitRequestFullScreen || container.msRequestFullscreen;
				if(fs) {
					fs.call(container);
				}
			} else {
				let fs = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen;
				if(fs) {
					fs.call(document);
				}
			}
		} else if(IOS && !IPAD) {
			this.player.el.pause();
			this.player.el.removeAttribute('playsinline');
			this.player.el.play();
		} else {
			if(classList(container).contains('mp-is-fullscreen')) {
				classList(container).remove('mp-is-fullscreen');
				classList(btn).remove('mp-is-fullscreen');
				btn.innerHTML = btn.getAttribute('data-first-text');
			} else {
				classList(container).add('mp-is-fullscreen');
				classList(btn).add('mp-is-fullscreen');
				btn.innerHTML = btn.getAttribute('data-second-text');
			}
		}
	}

	/**
	 * 전체화면 변경 핸들러
	 */
	FSChangeHandler() {
		let container = this.player.ui.container;
		let btn = this.player.ui.btnFullscreen;
		let fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

		if (Boolean(fullscreenElement) === false) {
			classList(container).remove('mp-is-fullscreen');
			classList(btn).remove('mp-is-fullscreen');
			btn.innerHTML = btn.getAttribute('data-first-text');
		}
		if(Boolean(fullscreenElement) === true && fullscreenElement == container) {
			classList(container).add('mp-is-fullscreen');
			classList(btn).add('mp-is-fullscreen');
			btn.innerHTML = btn.getAttribute('data-second-text');
		}
	}

	/**
	 * 플레이어 이벤트 등록
	 */
	on() {
		let player = this.player,
			el = player.el,
			ui = player.ui;

		super.on();

		/* ui event */
		if(ui.progress) {
			ui.progress.onDrag = this.uiEvents.progressOnDrag.bind(this);
		}
		if(ui.volume) {
			ui.volume.onDrag = this.uiEvents.volumeOnDrag.bind(this);
		}
		if(ui.btnPlay) {
			ui.btnPlay.addEventListener('click', this.uiEvents.btnPlay.bind(this), false);
		}
		if(ui.btnPause) {
			ui.btnPause.addEventListener('click', this.uiEvents.btnPause.bind(this), false);
		}
		if(ui.btnPlayPause) {
			ui.btnPlayPause.addEventListener('click', this.uiEvents.btnPlayPause.bind(this), false);
		}
		if(ui.btnStop) {
			ui.btnStop.addEventListener('click', this.uiEvents.btnStop.bind(this), false);
		}
		if(ui.poster) {
			ui.poster.addEventListener('click', this.uiEvents.posterClick.bind(this), false);
		}
		if(ui.videoWrap) {
			ui.videoWrap.addEventListener('click', this.uiEvents.videoClick.bind(this), false);
		}
		if(ui.btnMute) {
			ui.btnMute.addEventListener('click', this.uiEvents.btnToggleMute.bind(this), false);
		}
		if(ui.volumeBar) {
			ui.volumeBar.addEventListener('mousedown', this.uiEvents.volumeBar.bind(this), false);
		}
		if(ui.btnFullscreen) {
			ui.btnFullscreen.addEventListener('click', this.FSButtonHandler.bind(this), false);
		}
		
		if(SUPPORT_FS) {
			FSCHANGE_EVENT_LIST.forEach(
				eventName => document.addEventListener(eventName, this.FSChangeHandler.bind(this), false)
			);
		} else if(IOS) {
			el.addEventListener('webkitbeginfullscreen', () => {
				el.setAttribute('playsinline', '');
			}, false);
		}
	}

	/**
	 * 플레이어 이벤트 제거
	 */
	off() {
		super.off();

		/* ui event */
		if(SUPPORT_FS) {
			FSCHANGE_EVENT_LIST.forEach(
				eventName => document.removeEventListener(eventName, this.FSChangeHandler.bind(this), false)
			);
		}
	}
}

export default VideoEvent;