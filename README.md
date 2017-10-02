# MPlayer : HTML5 Media Player
- HTML5 video/audio Player
- ES6 + babel + webpack
- 디자인 스킨 옵션 (스킨스타일 자동 로드)
- 알파버전 : 기능 개발 및 테스트 중.. (로컬환경에서 실행가능)
  
## Demo
> https://dohoons.github.io/mplayer/demo/

## Usage
``` html
<video id="my-video">
	<source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4">
</video>

<script src="./mplayer/mplayer.min.js"></script>

<script>
var player = new MPlayer('#my-video'); // default
</script>
```

## Options
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| skin | String | 'basic' | 스킨 선택 |
| flexible | Boolean | false | 유동 크기 사용 (absolute 100%/100% size) |
| width | String | '' | 가로 크기 지정 (css width value) |
| height | String | '' | 세로 크기 (css height value) |
| currentTime | Number | 0 | 시작 시간 (sec) |
| autoplay | Boolean | false | 자동 재생 |
| loop | Boolean | false | 반복 재생 |
| muted | Boolean | false | 음소거 |
| volume | Number | 1.0 | 음량(0 ~ 1) |
| playbackRate | Number | 1.0 | 재생 속도 |
| preload | String | 'metadata' | preload 옵션 (metadata \| auto \| none) |
| contextmenu | Boolean | true | contextmenu 사용 |
