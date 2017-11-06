'use strict';

import CommonEvent from './common-event';

/**
 * 오디오 UI 이벤트 클래스
 * 
 * @class VideoUIEvent
 */
class AudioUIEvent {
	/**
	 * Creates an instance of AudioUIEvent.
	 * @param {Player} Player
	 */
	constructor(Player) {
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
 * 오디오 플레이어 이벤트
 * 
 * @class AudioEvent
 * @extends {CommonEvent}
 */
class AudioEvent extends CommonEvent {
	/**
	 * Creates an instance of AudioEvent.
	 * @param {Player} Player
	 */
	constructor(Player) {
		super(Player);

		/** @type {Object} */
		this.uiEvents = new AudioUIEvent(Player);
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
		if(ui.btnMute) {
			ui.btnMute.addEventListener('click', this.uiEvents.btnToggleMute.bind(this), false);
		}
		if(ui.volumeBar) {
			ui.volumeBar.addEventListener('mousedown', this.uiEvents.volumeBar.bind(this), false);
		}
	}
}

export default AudioEvent;