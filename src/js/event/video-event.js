'use strict';

import { IOS, SUPPORT_FS, FSCHANGE_EVENT_LIST } from '../config';
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

	/** 탐색 드래그 핸들러 */
	progressOnDrag(value) {
		this.player.el.currentTime = this.player.el.duration / 100 * value;
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
		if(this.player.el.paused) {
			this.player.play();
		} else {
			this.player.pause();
		}
	}

	/** 정지 버튼 클릭 */
	btnStop() {
		this.player.stop();
	}

	/** 포스터 클릭 */
	poster() {
		this.player.play();
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
		this.player.ui.poster.classList.add('hide');
	}

	/**
	 * Fires when the current playback position has changed
	 * @param {Event} e
	 */
	timeupdate(e) {
		super.timeupdate(e);
		this.player.ui.poster.classList.add('hide');
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
		} else if(IOS) {
			this.player.el.pause();
			this.player.el.removeAttribute('playsinline');
			this.player.el.play();
		} else {
			if(container.classList.contains('is-fullscreen')) {
				container.classList.remove('is-fullscreen');
				btn.classList.remove('is-fullscreen');
				btn.innerHTML = btn.getAttribute('data-first-text');
			} else {
				container.classList.add('is-fullscreen');
				btn.classList.add('is-fullscreen');
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
			container.classList.remove('is-fullscreen');
			btn.classList.remove('is-fullscreen');
			btn.innerHTML = btn.getAttribute('data-first-text');
		}
		if(Boolean(fullscreenElement) === true && fullscreenElement == container) {
			container.classList.add('is-fullscreen');
			btn.classList.add('is-fullscreen');
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
			ui.poster.addEventListener('click', this.uiEvents.poster.bind(this), false);
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

		// 내부에 포커스되면 is-focus 추가
		[].forEach.call(document.querySelectorAll('a, button, input, [tabindex]'), el => {
			el.addEventListener('focus', () => ui.container.classList.add('is-focus'));
			el.addEventListener('blur', () => ui.container.classList.remove('is-focus'));
		});

		ui.container.addEventListener('contextmenu', this.uiEvents.contextmenu.bind(this), false);
		
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