# MPlayer : HTML5 Media Player
- HTML5 video/audio Player
- ES6 + babel + webpack
- 디자인 스킨 옵션
- 알파버전 : 기능 개발 및 테스트 중..

## 기본 사용법
``` html
<video id="my-video">
	<source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4">
</video>

<link rel="stylesheet" href="./mplayer/skin/mplayer-basic/skin.min.css">
<script src="./mplayer/mplayer.min.js"></script>

<script>
var player = new MPlayer('#my-video'); // default
</script>
```

## 개발환경
``` sh
$ npm install -global gulp
$ git clone https://github.com/dohoons/mplayer.git
```
- 기본 태스크
``` sh
$ npm start
```
- API 문서 생성
``` sh
$ npm doc
```