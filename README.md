# MPlayer : HTML5 Media Player
- HTML5 video/audio Player
- ES6 + babel + webpack
- 디자인 스킨 옵션 (스킨스타일 자동 로드)
- 알파버전 : 기능 개발 및 테스트 중.. (로컬환경에서 실행가능)

## 기본 사용법
``` html
<video id="my-video">
	<source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4">
</video>

<script src="./mplayer/mplayer.min.js"></script>

<script>
var player = new MPlayer('#my-video'); // default
</script>
```
  
## 데모
> https://dohoons.github.io/mplayer/demo/
  
  
## 개발환경
### 의존성
``` sh
$ npm install -global gulp
```
### 설치
``` sh
$ git clone https://github.com/dohoons/mplayer.git
$ npm install
```
### Task
| 명령어 | 설명 |
| ------ | ----------- |
| gulp   | 빌드 및 웹서버 시작하고 watch |
| gulp build | 빌드 |
| gulp doc    | API 문서 생성 |