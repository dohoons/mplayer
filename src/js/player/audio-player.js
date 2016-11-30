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
			progressBar = container.querySelector('.progress'),
			volumeBar = container.querySelector('.volume'),
			progress = new Slider({el: progressBar}),
			volume = new Slider({el: volumeBar});
		
		player.ui = Object.assign(player.ui, {
			progressBar: progressBar,
			buffered: progressBar.querySelector('.buffered'),
			volumeBar: volumeBar,
			progress: progress,
			volume: volume,
			currentTime: container.querySelector('.current-time'),
			totalTime: container.querySelector('.total-time'),
			btnPlay: container.querySelector('.btn-play'),
			btnPause: container.querySelector('.btn-pause'),
			btnPlayPause: container.querySelector('.btn-play-puase'),
			btnStop: container.querySelector('.btn-stop'),
			btnFullscreen: container.querySelector('.btn-fullscreen'),
			btnMute: container.querySelector('.btn-mute')
		});
	}
}