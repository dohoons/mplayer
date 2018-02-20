'use strict';

import classList from 'classlist';
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
			poster = container.querySelector('.mp-poster'),
			posterSrc = el.getAttribute('poster'),
			progressBar = container.querySelector('.mp-progress'),
			volumeBar = container.querySelector('.mp-volume'),
			progress = new Slider({el: progressBar}),
			volume = new Slider({el: volumeBar});

		// 포스터 속성 처리. 없으면 제거
		if(posterSrc && posterSrc !== "") {
			poster.setAttribute('style', `background-image: url(${posterSrc});`);
		} else {
			container.removeChild(poster);
		}

		// element attr width
		if(!opt.width && el.hasAttribute('width')) {
			let w = el.getAttribute('width');
			opt.width = (w.indexOf('%') > -1) ? w : w + 'px';
		}

		// element attr height
		if(!opt.height && el.hasAttribute('height')) {
			let h = el.getAttribute('height');
			opt.height = (h.indexOf('%') > -1) ? h : h + 'px';
		}

		if(opt.width) {
			container.style.width = opt.width;
		}

		if(opt.height) {
			container.style.height = opt.height;
		}
		
		if(opt.flexible) {
			classList(container).add('mp-is-flexible');
		}
		
		player.ui = Object.assign(player.ui, {
			poster: poster,
			videoWrap: container.querySelector('.mp-media-el'),
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