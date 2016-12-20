(function() {
	'use strict';
	
	var skinName = 'minimal';
	var type = 'video';

	if(window.MPlayerSkinList[skinName + '-' + type] === undefined) {
		window.MPlayerSkinList[skinName + '-' + type] = 
			'<div class="mplayer mplayer-minimal mp-is-video" data-maxwidth-320="mp-is-small" data-minwidth-800="mp-is-big">' + 
			'	<div class="mp-media-el"></div>' + 
			'	<div class="mp-poster"></div>' + 
			'	<div class="mp-controls">' + 
			'		<button type="button" class="mp-btn-play-puase" data-first-text="재생" data-second-text="일시정지">재생</button>' + 
			'		<div class="mp-progress-wrap">' + 
			'			<div class="mp-slider mp-progress">' + 
			'				<span class="mp-btn"></span>' + 
			'				<span class="mp-buffered"></span>' + 
			'			</div>' + 
			'			<div class="mp-time-wrap">' + 
			'				<span class="mp-current-time">00:00</span>' +
			'				 / ' + 
			'				<span class="mp-total-time">00:00</span>' + 
			'			</div>' + 
			'		</div>' + 
			'		<div class="mp-volume-wrap">' + 
			'			<button type="button" class="mp-btn-mute" data-first-text="음소거" data-second-text="음소거 해제">음소거</button>' + 
			'			<div class="mp-slider mp-volume">' + 
			'				<span class="mp-btn"></span>' + 
			'			</div>' + 
			'		</div>' + 
			'		<button type="button" class="mp-btn-fullscreen" data-first-text="전체화면 보기" data-second-text="전체화면 해제">전체화면 보기</button>' + 
			'	</div>' + 
			'</div>'
		;
	}
	
})();