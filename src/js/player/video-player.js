'use strict';

import PlayerWrapper from './wrapper';
import Slider from '../ui/slider';
import VideoEvent from '../event/video-event';

/**
 * 비디오 플레이어
 * 
 * @export
 * @class VideoPlayer
 * @extends {PlayerWrapper}
 */
export default class VideoPlayer extends PlayerWrapper {

	/**
	 * Creates an instance of VideoPlayer.
	 * 
	 * @param {Player} Player
	 */
	constructor(Player) {
		super(Player);

		this.player.events = new VideoEvent(this.player);

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
			poster = container.querySelector('.poster'),
			posterSrc = el.getAttribute('poster'),
			progressBar = container.querySelector('.progress'),
			volumeBar = container.querySelector('.volume'),
			progress = new Slider({el: progressBar}),
			volume = new Slider({el: volumeBar});

		// 포스터 속성 처리. 없으면 제거
		if(posterSrc && posterSrc !== "") {
			poster.setAttribute('style', `background-image: url(${posterSrc});`);
		} else {
			container.removeChild(poster);
		}
		
		// flexible 옵션을 사용하거나 width 또는 height 값이 존재하면 유동사이즈 적용
		if(opt.flexible || opt.width || opt.height) {
			container.classList.add('flexible');

			if(opt.width) {
				container.style.width = opt.width;
			}

			if(opt.height) {
				container.style.height = opt.height;
			}
		}
		
		player.ui = Object.assign(player.ui, {
			poster: poster,
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