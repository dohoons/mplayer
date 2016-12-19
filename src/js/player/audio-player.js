'use strict';

import PlayerWrapper from './wrapper';
import Slider from '../ui/slider';
import AudioEvent from '../event/audio-event';

/**
 * 오디오 플레이어
 * 
 * @export
 * @class AudioPlayer
 * @extends {PlayerWrapper}
 */
export default class AudioPlayer extends PlayerWrapper {
	
	/**
	 * Creates an instance of VideoPlayer.
	 * 
	 * @param {Player} Player
	 */
	constructor(Player) {
		super(Player);

		this.player.events = new AudioEvent(this.player);

		return this;
	}

	/**
	 * UI 생성
	 */
	createInterface(htmlString) {
		super.createInterface(htmlString);

		let player = this.player,
			el = player.el,
			opt = player.opt,
			container = player.ui.container,
			progressBar = container.querySelector('.mp-progress'),
			volumeBar = container.querySelector('.mp-volume'),
			progress = new Slider({el: progressBar}),
			volume = new Slider({el: volumeBar});
		
		player.ui = Object.assign(player.ui, {
			progressBar: progressBar,
			buffered: progressBar.querySelector('.mp-buffered'),
			volumeBar: volumeBar,
			progress: progress,
			volume: volume,
			currentTime: container.querySelector('.mp-current-time'),
			totalTime: container.querySelector('.mp-total-time'),
			btnPlay: container.querySelector('.mp-btn-play'),
			btnPause: container.querySelector('.mp-btn-pause'),
			btnPlayPause: container.querySelector('.mp-btn-play-puase'),
			btnStop: container.querySelector('.mp-btn-stop'),
			btnFullscreen: container.querySelector('.mp-btn-fullscreen'),
			btnMute: container.querySelector('.mp-btn-mute')
		});
	}
}