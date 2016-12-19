/**
 * MPlayer : HTML5 Media Player
 * @author dohoons(dohoons@gmail.com)
 * @version v0.2.2-alpha.0
 * @license MIT
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// classList polyfill

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(1);

	var _config = __webpack_require__(2);

	var _action = __webpack_require__(4);

	var _action2 = _interopRequireDefault(_action);

	var _videoPlayer = __webpack_require__(5);

	var _videoPlayer2 = _interopRequireDefault(_videoPlayer);

	var _audioPlayer = __webpack_require__(12);

	var _audioPlayer2 = _interopRequireDefault(_audioPlayer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// ES6 Promise polyfill
	// import Promise from 'es6-promise';
	// Promise.polyfill(); 

	// DOMParser text/html MIME type polyfill
	// import './vendors/domparser';

	/**
	 * MPlayer : HTML5 Media Player
	 * @class Player
	 * @extends {PlayerAction}
	 */
	var Player = function (_PlayerAction) {
		_inherits(Player, _PlayerAction);

		/**
	  * Creates an instance of Player.
	  * 
	  * @param {String|Element} target - video/audio HTML element 또는 css selector string
	  * @param {playerOptions} [options] - 플레이어 옵션 객체
	  * @returns {Player} Player Object
	  */
		function Player(target, options) {
			var _ret;

			_classCallCheck(this, Player);

			var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this));

			var defaultOptions = _extends({}, _config.DEFAULT_OPTIONS);

			/**
	   * 플레이어 옵션
	   * @type {playerOptions}
	   */
			_this.opt = _extends(defaultOptions, options);

			/**
	   * 타겟 video/audio element
	   * @type {Element}
	   */
			_this.el = typeof target === 'string' ? document.querySelector(target) : target;

			/** 
	   * 초기 element 복제본
	   * @type {Element}
	   */
			_this.prevEl = _this.el.cloneNode(true);

			/**
	   * 타겟이 video이면 true
	   * @type {Boolean}
	   */
			_this.isVideo = _this.el.tagName === 'VIDEO' ? true : false;

			/**
	   * 플레이어 랩핑 객체
	   * @type {Object}
	   */
			_this.wrapper = _this.isVideo ? new _videoPlayer2.default(_this) : new _audioPlayer2.default(_this);

			/** 초기화 flag */
			_this.initFlag = false;

			/**
	   * 사용자 이벤트 목록
	   * @type {Array}
	   */
			_this.userEvents = [];

			// 초기화 실행
			_this.init();

			return _ret = _this, _possibleConstructorReturn(_this, _ret);
		}

		/**
	  * 플레이어 초기화
	  * @param {playerOptions} [options] - 플레이어 옵션 객체
	  * @returns {Player} Player Object
	  */


		_createClass(Player, [{
			key: 'init',
			value: function init(options) {
				var _this2 = this;

				this.destroy();

				this.opt = _extends(this.opt, options);

				this.wrapper.loadInterface(function (data) {
					_this2.wrapper.createInterface(data);
					_this2.wrapper.eventInit();
					_this2.el.load();
				});

				this.initFlag = true;

				return this;
			}

			/**
	   * 플레이어 제거하고 원래 상태로 돌림
	   * @returns {Player} Player Object
	   */

		}, {
			key: 'destroy',
			value: function destroy() {
				if (this.initFlag) {
					this.wrapper.removeInterface();
					this.events.off();

					this.initFlag = false;
				}

				return this;
			}

			/**
	   * 사용자 이벤트 등록.
	   * 중복 등록 가능
	   * @param {String} eventName - 이벤트이름
	   * @param {Function} handler - 이벤트핸들러 함수
	   * @returns {Player} Player Object
	   */

		}, {
			key: 'on',
			value: function on(eventName, handler) {
				this.userEvents.push({ eventName: eventName, handler: handler });

				return this;
			}

			/**
	   * 사용자 이벤트 제거.
	   * 중복 이벤트는 모두 제거됨.
	   * @param {String} eventName - 이벤트이름
	   * @returns {Player} Player Object
	   */

		}, {
			key: 'off',
			value: function off(eventName) {
				var arr = [];
				this.userEvents.forEach(function (obj) {
					if (obj.eventName !== eventName) arr.push(obj);
				});
				this.userEvents = arr;

				return this;
			}
		}]);

		return Player;
	}(_action2.default);

	global[_config.PUBLIC_NAMESPACE] = Player;
	exports.default = Player;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 1.1.20150312
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: Dedicated to the public domain.
	 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
	 */

	/*global self, document, DOMException */

	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

	if ("document" in self) {

		// Full polyfill for browsers with no classList support
		// Including IE < Edge missing SVGElement.classList
		if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

			(function (view) {

				"use strict";

				if (!('Element' in view)) return;

				var classListProp = "classList",
				    protoProp = "prototype",
				    elemCtrProto = view.Element[protoProp],
				    objCtr = Object,
				    strTrim = String[protoProp].trim || function () {
					return this.replace(/^\s+|\s+$/g, "");
				},
				    arrIndexOf = Array[protoProp].indexOf || function (item) {
					var i = 0,
					    len = this.length;
					for (; i < len; i++) {
						if (i in this && this[i] === item) {
							return i;
						}
					}
					return -1;
				}
				// Vendors: please allow content code to instantiate DOMExceptions
				,
				    DOMEx = function DOMEx(type, message) {
					this.name = type;
					this.code = DOMException[type];
					this.message = message;
				},
				    checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
					if (token === "") {
						throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
					}
					if (/\s/.test(token)) {
						throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
					}
					return arrIndexOf.call(classList, token);
				},
				    ClassList = function ClassList(elem) {
					var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
					    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
					    i = 0,
					    len = classes.length;
					for (; i < len; i++) {
						this.push(classes[i]);
					}
					this._updateClassName = function () {
						elem.setAttribute("class", this.toString());
					};
				},
				    classListProto = ClassList[protoProp] = [],
				    classListGetter = function classListGetter() {
					return new ClassList(this);
				};
				// Most DOMException implementations don't allow calling DOMException's toString()
				// on non-DOMExceptions. Error's toString() is sufficient here.
				DOMEx[protoProp] = Error[protoProp];
				classListProto.item = function (i) {
					return this[i] || null;
				};
				classListProto.contains = function (token) {
					token += "";
					return checkTokenAndGetIndex(this, token) !== -1;
				};
				classListProto.add = function () {
					var tokens = arguments,
					    i = 0,
					    l = tokens.length,
					    token,
					    updated = false;
					do {
						token = tokens[i] + "";
						if (checkTokenAndGetIndex(this, token) === -1) {
							this.push(token);
							updated = true;
						}
					} while (++i < l);

					if (updated) {
						this._updateClassName();
					}
				};
				classListProto.remove = function () {
					var tokens = arguments,
					    i = 0,
					    l = tokens.length,
					    token,
					    updated = false,
					    index;
					do {
						token = tokens[i] + "";
						index = checkTokenAndGetIndex(this, token);
						while (index !== -1) {
							this.splice(index, 1);
							updated = true;
							index = checkTokenAndGetIndex(this, token);
						}
					} while (++i < l);

					if (updated) {
						this._updateClassName();
					}
				};
				classListProto.toggle = function (token, force) {
					token += "";

					var result = this.contains(token),
					    method = result ? force !== true && "remove" : force !== false && "add";

					if (method) {
						this[method](token);
					}

					if (force === true || force === false) {
						return force;
					} else {
						return !result;
					}
				};
				classListProto.toString = function () {
					return this.join(" ");
				};

				if (objCtr.defineProperty) {
					var classListPropDesc = {
						get: classListGetter,
						enumerable: true,
						configurable: true
					};
					try {
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					} catch (ex) {
						// IE 8 doesn't support enumerable:true
						if (ex.number === -0x7FF5EC54) {
							classListPropDesc.enumerable = false;
							objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
						}
					}
				} else if (objCtr[protoProp].__defineGetter__) {
					elemCtrProto.__defineGetter__(classListProp, classListGetter);
				}
			})(self);
		} else {
			// There is full or partial native classList support, so just check if we need
			// to normalize the add/remove and toggle APIs.

			(function () {
				"use strict";

				var testElement = document.createElement("_");

				testElement.classList.add("c1", "c2");

				// Polyfill for IE 10/11 and Firefox <26, where classList.add and
				// classList.remove exist but support only one argument at a time.
				if (!testElement.classList.contains("c2")) {
					var createMethod = function createMethod(method) {
						var original = DOMTokenList.prototype[method];

						DOMTokenList.prototype[method] = function (token) {
							var i,
							    len = arguments.length;

							for (i = 0; i < len; i++) {
								token = arguments[i];
								original.call(this, token);
							}
						};
					};
					createMethod('add');
					createMethod('remove');
				}

				testElement.classList.toggle("c3", false);

				// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
				// support the second argument.
				if (testElement.classList.contains("c3")) {
					var _toggle = DOMTokenList.prototype.toggle;

					DOMTokenList.prototype.toggle = function (token, force) {
						if (1 in arguments && !this.contains(token) === !force) {
							return force;
						} else {
							return _toggle.call(this, token);
						}
					};
				}

				testElement = null;
			})();
		}
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _util = __webpack_require__(3);

	/**
	 * 플레이어 옵션
	 * @typedef	 {Object} 	playerOptions
	 * 
	 * @property {String} 	[options.skin='player-basic']	- 스킨 선택
	 * @property {Boolean} 	[options.flexible=false]		- 유동 크기 사용
	 * @property {String} 	[options.width='']				- 가로 크기 지정 (css width value)
	 * @property {String} 	[options.height='']				- 세로 크기 (css height value)
	 * @property {Number} 	[options.currentTime=0]			- 시작 시간 (sec)
	 * @property {Boolean} 	[options.autoplay=false]		- 자동 재생
	 * @property {Boolean} 	[options.loop=false]			- 반복 재생
	 * @property {Boolean} 	[options.muted=false]			- 음소거
	 * @property {Number} 	[options.volume=1.0]			- 음량(0 ~ 1)
	 * @property {Number} 	[options.playbackRate=1.0]		- 재생 속도
	 * @property {String} 	[options.preload='metadata']	- preload 옵션 (metadata | auto | none)
	 * @property {Boolean} 	[options.contextmenu=true]		- contextmenu 사용
	 * @property {Object} 	[options.event={}]				- 이벤트 객체
	 */
	var DEFAULT_OPTIONS = {
		skin: 'basic',
		flexible: false,
		width: '',
		height: '',
		currentTime: 0,
		autoplay: false,
		loop: false,
		muted: false,
		volume: 1.0,
		playbackRate: 1.0,
		preload: 'metadata',
		contextmenu: true,
		event: {}
	};

	var DEFAULT_CONTEXT_MENU = [{ title: 'MPlayer 정보', action: function action() {
			window.open('https://github.com/dohoons/mplayer');
		} }, { title: '단축키 안내', action: function action() {
			alert('\uC7AC\uC0DD/\uC77C\uC2DC\uC815\uC9C0 : space\n\uC804\uCCB4\uD654\uBA74 \uBCF4\uAE30/\uD574\uC81C : F\n\uC55E\uC73C\uB85C/\uB4A4\uB85C : \uC67C\uCABD/\uC624\uB978\uCABD \uBC29\uD5A5\uD0A4\n\uBCFC\uB968\uC870\uC815 : \uC704/\uC544\uB798 \uBC29\uD5A5\uD0A4');
		} }, { title: '재생속도', action: function action() {}, group: [{ title: '0.5x', action: function action() {
				this.playbackRate = 0.5;
			} }, { title: '1.0x', action: function action() {
				this.playbackRate = 1.0;
			} }, { title: '1.5x', action: function action() {
				this.playbackRate = 1.5;
			} }, { title: '2.0x', action: function action() {
				this.playbackRate = 2.0;
			} }] }];

	var PUBLIC_NAMESPACE = 'MPlayer';

	var UA = navigator.userAgent;
	var IOS = /iPad|iPhone|iPod/.test(UA);
	var SUPPORT_FS = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || document.mozFullScreenEnabled;
	var FSCHANGE_EVENT_LIST = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
	var ELEMENT_EVENT_LIST = ['click', 'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'error', 'ended', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
	var SCRIPT_PATH = (0, _util.getCurrentScriptPath)();

	module.exports = {
		DEFAULT_OPTIONS: DEFAULT_OPTIONS,
		DEFAULT_CONTEXT_MENU: DEFAULT_CONTEXT_MENU,
		PUBLIC_NAMESPACE: PUBLIC_NAMESPACE,
		UA: UA,
		IOS: IOS,
		SUPPORT_FS: SUPPORT_FS,
		FSCHANGE_EVENT_LIST: FSCHANGE_EVENT_LIST,
		ELEMENT_EVENT_LIST: ELEMENT_EVENT_LIST,
		SCRIPT_PATH: SCRIPT_PATH
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 초단위 숫자를 시간형식의 스트링으로 리턴
	 * 
	 * @param {String} str
	 * @returns {String}
	 */

	module.exports.sec2str = function (str) {
		var t = parseInt(str),
		    d = Math.floor(t / 86400),
		    h = ('0' + Math.floor(t / 3600) % 24).slice(-2),
		    m = ('0' + Math.floor(t / 60) % 60).slice(-2),
		    s = ('0' + t % 60).slice(-2);
		return (d > 0 ? d + 'd ' : '') + (h > 0 ? h + ':' : '') + (m + ':') + (t > 60 ? s : s + '');
	};

	/**
	 * 엘리먼트 속성에 대해 검색어로 시작하는 속성일 경우 오브젝트 리턴
	 * 
	 * @param {String} str 검색할 스트링
	 * @returns {Object}
	 */
	module.exports.getMatchAttr = function (str) {
		var attrs = this.attributes;
		for (var i = attrs.length; i--;) {
			if (attrs[i].nodeName.indexOf(str) === 0) {
				return {
					nodeName: attrs[i].nodeName,
					name: attrs[i].nodeName.split(str)[1],
					value: attrs[i].value
				};
			}
		}
		return null;
	};

	/**
	 * 상위 엘리먼트 탐색
	 * 
	 * @param {Element} el 기준 엘리먼트
	 * @param {String} selector CSS 셀렉터
	 * @returns {Element}
	 */
	module.exports.closest = function (el, selector) {
		var matches = el.webkitMatchesSelector ? 'webkitMatchesSelector' : el.msMatchesSelector ? 'msMatchesSelector' : 'matches';
		while (el.parentElement) {
			if (el[matches](selector)) return el;
			el = el.parentElement;
		}
		return null;
	};

	/**
	 * 현재 스크립트 FILE PATH 리턴
	 * 
	 * @returns {String}
	 */
	module.exports.getCurrentScriptPath = function () {
		var script = void 0,
		    path = void 0;

		if (document.currentScript) {
			script = document.currentScript.src;
		} else {
			var scripts = document.getElementsByTagName('script');
			script = scripts[scripts.length - 1].src;
		}

		return script.substring(0, script.lastIndexOf('/'));
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 플레이어 공통 기능
	 * 
	 * @export
	 * @class PlayerAction
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlayerAction = function () {
		function PlayerAction() {
			_classCallCheck(this, PlayerAction);
		}

		_createClass(PlayerAction, [{
			key: 'play',


			/**
	   * 플레이어 재생
	   * @returns {Player} Player Object
	   */
			value: function play() {
				this.el.play();
				return this;
			}

			/**
	   * 재생 일시정지
	   * @returns {Player} Player Object
	   */

		}, {
			key: 'pause',
			value: function pause() {
				this.el.pause();
				return this;
			}

			/**
	   * 재생 토글
	   * @returns {Player} Player Object
	   */

		}, {
			key: 'togglePlay',
			value: function togglePlay() {
				if (this.el.paused) {
					this.el.play();
				} else {
					this.el.pause();
				}
				return this;
			}

			/**
	   * 재생 정지(처음으로 이동됨)
	   * @returns {Player} Player Object
	   */

		}, {
			key: 'stop',
			value: function stop() {
				this.pause();
				this.el.currentTime = 0;
				return this;
			}

			/**
	   * 음소거 토글
	   * @returns {Player} Player Object
	   */

		}, {
			key: 'toggleMute',
			value: function toggleMute() {
				this.el.muted = !this.el.muted;
				this.ui.volume.position = this.el.muted ? 0 : this.el.volume / 1 * 100;
				return this;
			}

			/**
	   * 현재 재생 소스 url을 가져온다.
	   * @type {String}
	   */

		}, {
			key: 'src',
			get: function get() {
				return this.el.currentSrc;
			}

			/**
	   * 재생 소스 url을 변경한다.
	   * @type {String}
	   */
			,
			set: function set(url) {
				this.el.src = url;
			}

			/**
	   * 음량을 가져온다.
	   * @type {Number}
	   */

		}, {
			key: 'volume',
			get: function get() {
				return this.el.volume;
			}

			/**
	   * 음량을 변경한다.
	   * @type {Number}
	   */
			,
			set: function set(num) {
				if (num > 1) num = 1;
				if (num < 0) num = 0;
				this.el.volume = num;
			}

			/**
	   * 현재시간을 가져온다.
	   * @type {Number}
	   */

		}, {
			key: 'currentTime',
			get: function get() {
				return this.el.currentTime;
			}

			/**
	   * 현재시간을 변경한다.
	   * @type {Number}
	   */
			,
			set: function set(num) {
				this.el.currentTime = num;
			}

			/**
	   * 재생 속도를 가져온다.
	   * @type {Number}
	   */

		}, {
			key: 'playbackRate',
			get: function get() {
				return this.el.playbackRate;
			}

			/**
	   * 재생 속도를 변경한다.
	   * @type {Number}
	   */
			,
			set: function set(num) {
				this.el.playbackRate = num;
			}
		}]);

		return PlayerAction;
	}();

	exports.default = PlayerAction;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _wrapper = __webpack_require__(6);

	var _wrapper2 = _interopRequireDefault(_wrapper);

	var _slider = __webpack_require__(11);

	var _slider2 = _interopRequireDefault(_slider);

	var _videoEvent = __webpack_require__(7);

	var _videoEvent2 = _interopRequireDefault(_videoEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 비디오 플레이어
	 * 
	 * @export
	 * @class VideoPlayer
	 * @extends {PlayerWrapper}
	 */
	var VideoPlayer = function (_PlayerWrapper) {
		_inherits(VideoPlayer, _PlayerWrapper);

		/**
	  * Creates an instance of VideoPlayer.
	  * 
	  * @param {Player} Player
	  */
		function VideoPlayer(Player) {
			var _ret;

			_classCallCheck(this, VideoPlayer);

			var _this = _possibleConstructorReturn(this, (VideoPlayer.__proto__ || Object.getPrototypeOf(VideoPlayer)).call(this, Player));

			_this.player.events = new _videoEvent2.default(_this.player);

			return _ret = _this, _possibleConstructorReturn(_this, _ret);
		}

		/**
	  * UI 생성
	  */


		_createClass(VideoPlayer, [{
			key: 'createInterface',
			value: function createInterface(htmlString) {
				_get(VideoPlayer.prototype.__proto__ || Object.getPrototypeOf(VideoPlayer.prototype), 'createInterface', this).call(this, htmlString);

				var player = this.player,
				    el = player.el,
				    opt = player.opt,
				    container = player.ui.container,
				    poster = container.querySelector('.mp-poster'),
				    posterSrc = el.getAttribute('poster'),
				    progressBar = container.querySelector('.mp-progress'),
				    volumeBar = container.querySelector('.mp-volume'),
				    progress = new _slider2.default({ el: progressBar }),
				    volume = new _slider2.default({ el: volumeBar });

				// 포스터 속성 처리. 없으면 제거
				if (posterSrc && posterSrc !== "") {
					poster.setAttribute('style', 'background-image: url(' + posterSrc + ');');
				} else {
					container.removeChild(poster);
				}

				// flexible 옵션을 사용하거나 width 또는 height 값이 존재하면 유동사이즈 적용
				if (opt.flexible || opt.width || opt.height) {
					container.classList.add('mp-is-flexible');

					if (opt.width) {
						container.style.width = opt.width;
					}

					if (opt.height) {
						container.style.height = opt.height;
					}
				}

				player.ui = _extends(player.ui, {
					poster: poster,
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
		}]);

		return VideoPlayer;
	}(_wrapper2.default);

	exports.default = VideoPlayer;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _videoEvent = __webpack_require__(7);

	var _videoEvent2 = _interopRequireDefault(_videoEvent);

	var _audioEvent = __webpack_require__(9);

	var _audioEvent2 = _interopRequireDefault(_audioEvent);

	var _contextmenu = __webpack_require__(10);

	var _contextmenu2 = _interopRequireDefault(_contextmenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// 전역 스킨 리스트 변수 초기화
	// 스킨 load 완료되면 '스킨명-타입':'레이아웃HTML' 조합으로 추가됨
	// 기본스킨의 경우 : window.MPlayerSkinList['mplayer-basic-video'], window.MPlayerSkinList['mplayer-basic-audio']
	var MPlayerSkinList = window.MPlayerSkinList = {};

	/**
	 * 플레이어 랩핑
	 * 
	 * @export
	 * @class PlayerWrapper
	 */

	var PlayerWrapper = function () {
		/**
	  * Creates an instance of PlayerWrapper.
	  * @param {Player} Player
	  */
		function PlayerWrapper(Player) {
			_classCallCheck(this, PlayerWrapper);

			/** @type {Player} */
			this.player = Player;

			/** @type {Object} */
			this.player.ui = {};

			return this;
		}

		/**
	  * UI 스킨 레이아웃 동적으로 가져오기
	  * @param {Function} callback - 로드 완료 콜백 함수
	  */


		_createClass(PlayerWrapper, [{
			key: 'loadInterface',
			value: function loadInterface(callback) {
				var _this = this;

				var player = this.player,
				    type = player.isVideo ? 'video' : 'audio',
				    loader = document.createElement('script');

				// 스킨 로드
				loader.src = _config.SCRIPT_PATH + '/skin/' + player.opt.skin + '/tpl.' + type + '.js';
				player.el.parentNode.insertBefore(loader, player.el);

				// Promise polyfill 너무 무거워서 콜백 함수로 처리
				if (typeof callback === 'function') {
					loader.addEventListener('load', function () {
						callback.call(_this, MPlayerSkinList[player.opt.skin + '-' + type]);
					});
				}
			}

			/**
	   * UI 생성 후 랩핑
	   */

		}, {
			key: 'createInterface',
			value: function createInterface(htmlString) {
				var player = this.player,
				    el = player.el,
				    ui = player.ui,
				    wrapper = document.createElement('div');

				// remove script tag
				el.parentNode.removeChild(el.previousElementSibling);

				// wrapping
				el.parentNode.insertBefore(wrapper, el);
				wrapper.outerHTML = htmlString;
				ui.container = el.previousElementSibling;
				ui.container.querySelector('.mp-media-el').appendChild(el);

				// element manipulation
				el.classList.add('el');
				el.controls = false;
				el.setAttribute('playsinline', '');
				el.setAttribute('tabindex', '0');

				if (_config.UA.indexOf('MSIE 9') > -1) {
					ui.container.classList.add('mp-is-ie9');
				}

				if (player.opt.contextmenu) {
					ui.contextmenu = new _contextmenu2.default(_config.DEFAULT_CONTEXT_MENU, player);
				}
			}

			/**
	   * UI 제거
	   */

		}, {
			key: 'removeInterface',
			value: function removeInterface() {
				var player = this.player,
				    ui = player.ui;

				player.el = player.prevEl;
				ui.container.parentNode.replaceChild(player.el, ui.container);
				ui = null;
			}

			/**
	   * 플레이어 옵션 적용
	   */

		}, {
			key: 'applyPlayerOption',
			value: function applyPlayerOption() {
				var player = this.player,
				    el = player.el,
				    opt = player.opt;

				// 이벤트 옵션 반영
				for (var eventName in opt.event) {
					player.on(eventName, opt.event[eventName]);
				}

				el.muted = opt.muted;
				player.ui.volume.position = el.muted ? 0 : opt.volume / 1 * 100;

				el.playbackRate = opt.playbackRate;
				el.loop = opt.loop;
				el.preload = opt.preload;

				if (opt.currentTime !== 0 && !isNaN(el.duration)) {
					player.currentTime = opt.currentTime;
				}

				if (opt.autoplay) {
					player.play();
				}
			}

			/**
	   * 플레이어 이벤트 적용
	   */

		}, {
			key: 'eventInit',
			value: function eventInit() {
				this.player.events.on();
			}
		}]);

		return PlayerWrapper;
	}();

	exports.default = PlayerWrapper;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _commonEvent = __webpack_require__(8);

	var _commonEvent2 = _interopRequireDefault(_commonEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 비디오 UI 이벤트 클래스
	 * 
	 * @class VideoUIEvent
	 */
	var VideoUIEvent = function () {
		/**
	  * Creates an instance of VideoUIEvent.
	  * @param {Player} Player
	  */
		function VideoUIEvent(Player) {
			_classCallCheck(this, VideoUIEvent);

			/** @type {Player} */
			this.player = Player;
		}

		/** 탐색 드래그 핸들러 */


		_createClass(VideoUIEvent, [{
			key: 'progressOnDrag',
			value: function progressOnDrag(value) {
				this.player.el.currentTime = this.player.el.duration / 100 * value;
			}

			/** 음량 드래그 핸들러 */

		}, {
			key: 'volumeOnDrag',
			value: function volumeOnDrag(value) {
				this.player.el.volume = value / 100;
			}

			/** 재생 버튼 클릭 */

		}, {
			key: 'btnPlay',
			value: function btnPlay() {
				this.player.play();
			}

			/** 일시정지 버튼 클릭 */

		}, {
			key: 'btnPause',
			value: function btnPause() {
				this.player.pause();
			}

			/** 재생/일시정지 토글 클릭 */

		}, {
			key: 'btnPlayPause',
			value: function btnPlayPause() {
				if (this.player.el.paused) {
					this.player.play();
				} else {
					this.player.pause();
				}
			}

			/** 정지 버튼 클릭 */

		}, {
			key: 'btnStop',
			value: function btnStop() {
				this.player.stop();
			}

			/** 포스터 클릭 */

		}, {
			key: 'poster',
			value: function poster() {
				this.player.play();
				this.player.el.focus();
			}

			/** 음소거 토글 클릭 */

		}, {
			key: 'btnToggleMute',
			value: function btnToggleMute() {
				this.player.toggleMute();
			}

			/** 음량 mousedown */

		}, {
			key: 'volumeBar',
			value: function volumeBar() {
				this.player.el.muted = false;
			}
		}]);

		return VideoUIEvent;
	}();

	/**
	 * 비디오 플레이어 이벤트
	 * 
	 * @class VideoEvent
	 * @extends {CommonEvent}
	 */


	var VideoEvent = function (_CommonEvent) {
		_inherits(VideoEvent, _CommonEvent);

		/**
	  * Creates an instance of VideoEvent.
	  * @param {Player} Player
	  */
		function VideoEvent(Player) {
			_classCallCheck(this, VideoEvent);

			/** @type {Object} */
			var _this = _possibleConstructorReturn(this, (VideoEvent.__proto__ || Object.getPrototypeOf(VideoEvent)).call(this, Player));

			_this.uiEvents = new VideoUIEvent(Player);
			return _this;
		}

		/**
	  * Fires when the audio/video has been started or is no longer paused
	  */


		_createClass(VideoEvent, [{
			key: 'play',
			value: function play() {
				_get(VideoEvent.prototype.__proto__ || Object.getPrototypeOf(VideoEvent.prototype), 'play', this).call(this);
				this.player.ui.poster.classList.add('hide');
			}

			/**
	   * Fires when the current playback position has changed
	   * @param {Event} e
	   */

		}, {
			key: 'timeupdate',
			value: function timeupdate(e) {
				_get(VideoEvent.prototype.__proto__ || Object.getPrototypeOf(VideoEvent.prototype), 'timeupdate', this).call(this, e);
				this.player.ui.poster.classList.add('hide');
			}

			/**
	   * 전체화면 버튼 핸들러
	   */

		}, {
			key: 'FSButtonHandler',
			value: function FSButtonHandler() {
				var container = this.player.ui.container;
				var btn = this.player.ui.btnFullscreen;

				if (_config.SUPPORT_FS) {
					var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

					if (Boolean(fullscreenElement) === false) {
						var fs = container.requestFullscreen || container.mozRequestFullScreen || container.webkitRequestFullScreen || container.msRequestFullscreen;
						if (fs) {
							fs.call(container);
						}
					} else {
						var _fs = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen;
						if (_fs) {
							_fs.call(document);
						}
					}
				} else if (_config.IOS) {
					this.player.el.pause();
					this.player.el.removeAttribute('playsinline');
					this.player.el.play();
				} else {
					if (container.classList.contains('mp-is-fullscreen')) {
						container.classList.remove('mp-is-fullscreen');
						btn.classList.remove('mp-is-fullscreen');
						btn.innerHTML = btn.getAttribute('data-first-text');
					} else {
						container.classList.add('mp-is-fullscreen');
						btn.classList.add('mp-is-fullscreen');
						btn.innerHTML = btn.getAttribute('data-second-text');
					}
				}
			}

			/**
	   * 전체화면 변경 핸들러
	   */

		}, {
			key: 'FSChangeHandler',
			value: function FSChangeHandler() {
				var container = this.player.ui.container;
				var btn = this.player.ui.btnFullscreen;
				var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

				if (Boolean(fullscreenElement) === false) {
					container.classList.remove('mp-is-fullscreen');
					btn.classList.remove('mp-is-fullscreen');
					btn.innerHTML = btn.getAttribute('data-first-text');
				}
				if (Boolean(fullscreenElement) === true && fullscreenElement == container) {
					container.classList.add('mp-is-fullscreen');
					btn.classList.add('mp-is-fullscreen');
					btn.innerHTML = btn.getAttribute('data-second-text');
				}
			}

			/**
	   * 플레이어 이벤트 등록
	   */

		}, {
			key: 'on',
			value: function on() {
				var _this2 = this;

				var player = this.player,
				    el = player.el,
				    ui = player.ui;

				_get(VideoEvent.prototype.__proto__ || Object.getPrototypeOf(VideoEvent.prototype), 'on', this).call(this);

				/* ui event */
				if (ui.progress) {
					ui.progress.onDrag = this.uiEvents.progressOnDrag.bind(this);
				}
				if (ui.volume) {
					ui.volume.onDrag = this.uiEvents.volumeOnDrag.bind(this);
				}
				if (ui.btnPlay) {
					ui.btnPlay.addEventListener('click', this.uiEvents.btnPlay.bind(this), false);
				}
				if (ui.btnPause) {
					ui.btnPause.addEventListener('click', this.uiEvents.btnPause.bind(this), false);
				}
				if (ui.btnPlayPause) {
					ui.btnPlayPause.addEventListener('click', this.uiEvents.btnPlayPause.bind(this), false);
				}
				if (ui.btnStop) {
					ui.btnStop.addEventListener('click', this.uiEvents.btnStop.bind(this), false);
				}
				if (ui.poster) {
					ui.poster.addEventListener('click', this.uiEvents.poster.bind(this), false);
				}
				if (ui.btnMute) {
					ui.btnMute.addEventListener('click', this.uiEvents.btnToggleMute.bind(this), false);
				}
				if (ui.volumeBar) {
					ui.volumeBar.addEventListener('mousedown', this.uiEvents.volumeBar.bind(this), false);
				}
				if (ui.btnFullscreen) {
					ui.btnFullscreen.addEventListener('click', this.FSButtonHandler.bind(this), false);
				}

				if (_config.SUPPORT_FS) {
					_config.FSCHANGE_EVENT_LIST.forEach(function (eventName) {
						return document.addEventListener(eventName, _this2.FSChangeHandler.bind(_this2), false);
					});
				} else if (_config.IOS) {
					el.addEventListener('webkitbeginfullscreen', function () {
						el.setAttribute('playsinline', '');
					}, false);
				}
			}

			/**
	   * 플레이어 이벤트 제거
	   */

		}, {
			key: 'off',
			value: function off() {
				var _this3 = this;

				_get(VideoEvent.prototype.__proto__ || Object.getPrototypeOf(VideoEvent.prototype), 'off', this).call(this);

				/* ui event */
				if (_config.SUPPORT_FS) {
					_config.FSCHANGE_EVENT_LIST.forEach(function (eventName) {
						return document.removeEventListener(eventName, _this3.FSChangeHandler.bind(_this3), false);
					});
				}
			}
		}]);

		return VideoEvent;
	}(_commonEvent2.default);

	exports.default = VideoEvent;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _util = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 플레이어 공통 이벤트
	 * 
	 * @export
	 * @class CommonEvent
	 */
	var CommonEvent = function () {
		/**
	  * Creates an instance of CommonEvent.
	  * @param {Player} Player
	  */
		function CommonEvent(Player) {
			_classCallCheck(this, CommonEvent);

			/** @type {Player} */
			this.player = Player;
		}

		/**
	  * 플레이어 이벤트 등록
	  */


		_createClass(CommonEvent, [{
			key: 'on',
			value: function on() {
				var _this = this;

				_config.ELEMENT_EVENT_LIST.forEach(function (eventName) {
					return _this.player.el.addEventListener(eventName, _this[eventName].bind(_this), false);
				});

				// 내부에 포커스되면 mp-is-focus 추가
				[].forEach.call(this.player.ui.container.querySelectorAll('a, button, input, [tabindex]'), function (el) {
					el.addEventListener('focus', function () {
						return _this.player.ui.container.classList.add('mp-is-focus');
					});
					el.addEventListener('blur', function () {
						return _this.player.ui.container.classList.remove('mp-is-focus');
					});
				});

				this.player.ui.container.addEventListener('contextmenu', this.contextmenu.bind(this), false);

				window.addEventListener('resize', this.updateSizeOption.bind(this), false);
				window.addEventListener('scroll', this.updateSizeOption.bind(this), false);
				window.addEventListener('keydown', this.keydown.bind(this), false);
			}

			/**
	   * 플레이어 이벤트 제거
	   */

		}, {
			key: 'off',
			value: function off() {
				var _this2 = this;

				_config.ELEMENT_EVENT_LIST.forEach(function (eventName) {
					return _this2.player.el.removeEventListener(eventName, _this2[eventName].bind(_this2), false);
				});

				window.removeEventListener('resize', this.updateSizeOption.bind(this), false);
				window.removeEventListener('scroll', this.updateSizeOption.bind(this), false);
				window.removeEventListener('keydown', this.keydown.bind(this), false);
			}

			/**
	   * 콜백함수 호출
	   * @param {Object|String} e - 이벤트 객체 or 이벤트 이름
	   * @param {any} val
	   */

		}, {
			key: 'callback',
			value: function callback(e, val) {
				var _this3 = this;

				var eventName = void 0,
				    param = void 0;

				if (typeof e === 'string') {
					eventName = e;
					param = val;
				} else {
					eventName = e.type;
					param = e;
				}

				this.player.userEvents.forEach(function (obj) {
					if (obj.eventName === eventName) {
						obj.handler.call(_this3.player, param);
					}
				});
			}

			/**
	   * Buffered 게이지 적용
	   */

		}, {
			key: 'updateBuffered',
			value: function updateBuffered() {
				var el = this.player.el,
				    bar = this.player.ui.buffered,
				    range = 0,
				    bf = el.buffered,
				    time = el.currentTime,
				    duration = el.duration,
				    loadStartPercentage = 0,
				    loadEndPercentage = 0,
				    loadPercentage = 0;

				try {
					while (!(bf.start(range) <= time && time <= bf.end(range))) {
						range += 1;
					}
					loadStartPercentage = bf.start(range) / el.duration * 100;
					loadEndPercentage = bf.end(range) / el.duration * 100;
					loadPercentage = loadEndPercentage - loadStartPercentage;

					bar.style.width = loadPercentage + "%";
					bar.style.left = loadStartPercentage + "%";
				} catch (e) {
					// console.log(e);
				}
			}

			/**
	   * 플레이 상태 반영
	   */

		}, {
			key: 'updatePlayState',
			value: function updatePlayState() {
				var player = this.player,
				    el = player.el,
				    btnPlayPause = player.ui.btnPlayPause,
				    currentTime = player.ui.currentTime,
				    totalTime = player.ui.totalTime,
				    btnMute = player.ui.btnMute;

				if (btnPlayPause) {
					if (el.paused) {
						btnPlayPause.classList.remove('mp-is-paused');
						btnPlayPause.innerHTML = btnPlayPause.getAttribute('data-first-text');
					} else {
						btnPlayPause.classList.add('mp-is-paused');
						btnPlayPause.innerHTML = btnPlayPause.getAttribute('data-second-text');
					}
				}

				if (el.paused) {
					player.ui.container.classList.remove('mp-is-playing');
				} else {
					player.ui.container.classList.add('mp-is-playing');
				}

				if (currentTime) {
					player.ui.currentTime.innerHTML = (0, _util.sec2str)(el.currentTime);
				}

				if (totalTime) {
					player.ui.totalTime.innerHTML = (0, _util.sec2str)(el.duration);
				}

				if (btnMute) {
					if (el.muted) {
						btnMute.classList.add('mp-is-muted');
						btnMute.innerHTML = btnMute.getAttribute('data-second-text');
					} else {
						btnMute.classList.remove('mp-is-muted');
						btnMute.innerHTML = btnMute.getAttribute('data-first-text');
					}
				}
			}

			/**
	   * 사이즈 클래스 옵션 반영
	   */

		}, {
			key: 'updateSizeOption',
			value: function updateSizeOption() {
				var container = this.player.ui.container,
				    maxwidth = _util.getMatchAttr.call(container, 'data-maxwidth-'),
				    minwidth = _util.getMatchAttr.call(container, 'data-minwidth-'),
				    size = 0;

				if (maxwidth !== null) {
					size = parseInt(maxwidth.name);

					if (container.offsetWidth <= size) {
						container.classList.add(maxwidth.value);
					} else {
						container.classList.remove(maxwidth.value);
					}
				}

				if (minwidth !== null) {
					size = parseInt(minwidth.name);

					if (container.offsetWidth >= size) {
						container.classList.add(minwidth.value);
					} else {
						container.classList.remove(minwidth.value);
					}
				}
			}

			/**
	   * contextmenu
	   */

		}, {
			key: 'contextmenu',
			value: function contextmenu(e) {
				e.preventDefault();

				if (this.player.opt.contextmenu) {
					this.player.ui.contextmenu.show(e);
				}

				this.callback(e);
			}

			/**
	   * keydown - 단축키처리
	   */

		}, {
			key: 'keydown',
			value: function keydown(e) {
				var player = this.player;

				if (player.ui.container.classList.contains('mp-is-focus')) {
					switch (e.keyCode) {
						case 32:
							// 스페이스바
							e.preventDefault();
							player.togglePlay();
							break;
						case 70:
							// F키
							if (player.ui.btnFullscreen) {
								this.FSButtonHandler.call(this);
							}
							break;
						case 37:
							// 왼쪽 화살표
							e.preventDefault();
							player.currentTime -= 5;
							break;
						case 39:
							// 오른쪽 화살표
							e.preventDefault();
							player.currentTime += 5;
							break;
						case 38:
							// 위쪽 화살표
							e.preventDefault();
							player.volume += 0.05;
							break;
						case 40:
							// 아래쪽 화살표
							e.preventDefault();
							player.volume -= 0.05;
							break;
					}
				}
			}

			/**
	   * element click
	   */

		}, {
			key: 'click',
			value: function click() {
				if (this.player.el.paused) {
					this.player.play();
				} else {
					this.player.pause();
				}
				this.player.el.focus();
			}

			/**
	   * Fires when the loading of an audio/video is aborted
	   * @param {Event} e
	   */

		}, {
			key: 'abort',
			value: function abort(e) {
				this.callback(e);
			}

			/**
	   * Fires when the browser can start playing the audio/video
	   * @param {Event} e
	   */

		}, {
			key: 'canplay',
			value: function canplay(e) {
				this.callback(e);
			}

			/**
	   * Fires when the browser can play through the audio/video without stopping for buffering
	   * @param {Event} e
	   */

		}, {
			key: 'canplaythrough',
			value: function canplaythrough(e) {
				this.updateBuffered();
				this.callback(e);
			}

			/**
	   * Fires when the duration of the audio/video is changed
	   * @param {Event} e
	   */

		}, {
			key: 'durationchange',
			value: function durationchange(e) {
				this.callback(e);
			}

			/**
	   * Fires when the current playlist is empty
	   * @param {Event} e
	   */

		}, {
			key: 'emptied',
			value: function emptied(e) {
				this.callback(e);
			}

			/**
	   * Fires when the current playlist is ended
	   * @param {Event} e
	   */

		}, {
			key: 'ended',
			value: function ended(e) {
				this.callback(e);
			}

			/**
	   * Fires when an error occurred during the loading of an audio/video
	   * @param {Event} e
	   */

		}, {
			key: 'error',
			value: function error(e) {
				this.callback(e);
			}

			/**
	   * Fires when the browser has loaded the current frame of the audio/video
	   * @param {Event} e
	   */

		}, {
			key: 'loadeddata',
			value: function loadeddata(e) {
				this.updateBuffered();
				this.callback(e);
			}

			/**
	   * Fires when the browser has loaded meta data for the audio/video
	   * @param {Event} e
	   */

		}, {
			key: 'loadedmetadata',
			value: function loadedmetadata(e) {
				this.player.wrapper.applyPlayerOption();
				this.updatePlayState();
				this.updateSizeOption();
				this.callback(e);
			}

			/**
	   * Fires when the browser starts looking for the audio/video
	   * @param {Event} e
	   */

		}, {
			key: 'loadstart',
			value: function loadstart(e) {
				this.callback(e);
			}

			/**
	   * Fires when the audio/video has been paused
	   * @param {Event} e
	   */

		}, {
			key: 'pause',
			value: function pause(e) {
				this.updatePlayState();
				this.callback(e);
			}

			/**
	   * Fires when the audio/video has been started or is no longer paused
	   */

		}, {
			key: 'play',
			value: function play() {
				this.updatePlayState();
				this.callback('play');
			}

			/**
	   * Fires when the audio/video is playing after having been paused or stopped for buffering
	   * @param {Event} e
	   */

		}, {
			key: 'playing',
			value: function playing(e) {
				this.updateBuffered();
				this.callback(e);
			}

			/**
	   * Fires when the browser is downloading the audio/video
	   * @param {Event} e
	   */

		}, {
			key: 'progress',
			value: function progress(e) {
				this.updateBuffered();
				this.callback(e);
			}

			/**
	   * Fires when the playing speed of the audio/video is changed
	   * @param {Event} e
	   */

		}, {
			key: 'ratechange',
			value: function ratechange(e) {
				this.callback(e);
			}

			/**
	   * Fires when the user is finished moving/skipping to a new position in the audio/video
	   * @param {Event} e
	   */

		}, {
			key: 'seeked',
			value: function seeked(e) {
				this.player.ui.container.classList.remove('mp-is-seeking');
				this.callback(e);
			}

			/**
	   * Fires when the user starts moving/skipping to a new position in the audio/video
	   * @param {Event} e
	   */

		}, {
			key: 'seeking',
			value: function seeking(e) {
				this.player.ui.container.classList.add('mp-is-seeking');
				this.callback(e);
			}

			/**
	   * Fires when the browser is trying to get media data, but data is not available
	   * @param {Event} e
	   */

		}, {
			key: 'stalled',
			value: function stalled(e) {
				this.callback(e);
			}

			/**
	   * Fires when the browser is intentionally not getting media data
	   * @param {Event} e
	   */

		}, {
			key: 'suspend',
			value: function suspend(e) {
				this.callback(e);
			}

			/**
	   * Fires when the current playback position has changed
	   * @param {Event} e
	   */

		}, {
			key: 'timeupdate',
			value: function timeupdate(e) {
				if (this.player.ui.progress.isDown === false) {
					this.player.ui.progress.position = this.player.el.currentTime / this.player.el.duration * 100;
				}
				this.updatePlayState();
				this.callback(e);
			}

			/**
	   * Fires when the volume has been changed
	   * @param {Event} e
	   */

		}, {
			key: 'volumechange',
			value: function volumechange(e) {
				this.player.ui.volume.position = this.player.el.muted ? 0 : this.player.el.volume / 1 * 100;
				this.updatePlayState();
				this.callback(e);
			}

			/**
	   * Fires when the video stops because it needs to buffer the next frame
	   * @param {Event} e
	   */

		}, {
			key: 'waiting',
			value: function waiting(e) {
				this.callback(e);
			}
		}]);

		return CommonEvent;
	}();

	exports.default = CommonEvent;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _commonEvent = __webpack_require__(8);

	var _commonEvent2 = _interopRequireDefault(_commonEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 오디오 UI 이벤트 클래스
	 * 
	 * @class VideoUIEvent
	 */
	var AudioUIEvent = function () {
		/**
	  * Creates an instance of AudioUIEvent.
	  * @param {Player} Player
	  */
		function AudioUIEvent(Player) {
			_classCallCheck(this, AudioUIEvent);

			this.player = Player;
		}

		/** 탐색 드래그 핸들러 */


		_createClass(AudioUIEvent, [{
			key: 'progressOnDrag',
			value: function progressOnDrag(value) {
				this.player.el.currentTime = this.player.el.duration / 100 * value;
			}

			/** 음량 드래그 핸들러 */

		}, {
			key: 'volumeOnDrag',
			value: function volumeOnDrag(value) {
				this.player.el.volume = value / 100;
			}

			/** 재생 버튼 클릭 */

		}, {
			key: 'btnPlay',
			value: function btnPlay() {
				this.player.play();
			}

			/** 일시정지 버튼 클릭 */

		}, {
			key: 'btnPause',
			value: function btnPause() {
				this.player.pause();
			}

			/** 재생/일시정지 토글 클릭 */

		}, {
			key: 'btnPlayPause',
			value: function btnPlayPause() {
				if (this.player.el.paused) {
					this.player.play();
				} else {
					this.player.pause();
				}
			}

			/** 정지 버튼 클릭 */

		}, {
			key: 'btnStop',
			value: function btnStop() {
				this.player.stop();
			}

			/** 음소거 토글 클릭 */

		}, {
			key: 'btnToggleMute',
			value: function btnToggleMute() {
				this.player.toggleMute();
			}

			/** 음량 mousedown */

		}, {
			key: 'volumeBar',
			value: function volumeBar() {
				this.player.el.muted = false;
			}
		}]);

		return AudioUIEvent;
	}();

	/**
	 * 오디오 플레이어 이벤트
	 * 
	 * @class AudioEvent
	 * @extends {CommonEvent}
	 */


	var AudioEvent = function (_CommonEvent) {
		_inherits(AudioEvent, _CommonEvent);

		/**
	  * Creates an instance of AudioEvent.
	  * @param {Player} Player
	  */
		function AudioEvent(Player) {
			_classCallCheck(this, AudioEvent);

			/** @type {Object} */
			var _this = _possibleConstructorReturn(this, (AudioEvent.__proto__ || Object.getPrototypeOf(AudioEvent)).call(this, Player));

			_this.uiEvents = new AudioUIEvent(Player);
			return _this;
		}

		/**
	  * 플레이어 이벤트 등록
	  */


		_createClass(AudioEvent, [{
			key: 'on',
			value: function on() {
				var player = this.player,
				    el = player.el,
				    ui = player.ui;

				_get(AudioEvent.prototype.__proto__ || Object.getPrototypeOf(AudioEvent.prototype), 'on', this).call(this);

				/* ui event */
				if (ui.progress) {
					ui.progress.onDrag = this.uiEvents.progressOnDrag.bind(this);
				}
				if (ui.volume) {
					ui.volume.onDrag = this.uiEvents.volumeOnDrag.bind(this);
				}
				if (ui.btnPlay) {
					ui.btnPlay.addEventListener('click', this.uiEvents.btnPlay.bind(this), false);
				}
				if (ui.btnPause) {
					ui.btnPause.addEventListener('click', this.uiEvents.btnPause.bind(this), false);
				}
				if (ui.btnPlayPause) {
					ui.btnPlayPause.addEventListener('click', this.uiEvents.btnPlayPause.bind(this), false);
				}
				if (ui.btnStop) {
					ui.btnStop.addEventListener('click', this.uiEvents.btnStop.bind(this), false);
				}
				if (ui.btnMute) {
					ui.btnMute.addEventListener('click', this.uiEvents.btnToggleMute.bind(this), false);
				}
				if (ui.volumeBar) {
					ui.volumeBar.addEventListener('mousedown', this.uiEvents.volumeBar.bind(this), false);
				}
			}
		}]);

		return AudioEvent;
	}(_commonEvent2.default);

	exports.default = AudioEvent;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var contextMenuStyle = '\n<style>\n.mplayer-context-menu { line-height: 1.2; font-family: \'Malgun Gothic\', \'dotum\', sans-serif; font-size: 12px; color: #fff; background: rgba(0,0,0,.85); outline: none; position: absolute; z-index: 99999999; }\n.mplayer-context-main { margin: 0; padding: 0; list-style: none; }\n.mplayer-context-sub { display: none; margin: 0; padding: 0; background: rgba(0,0,0,.85); list-style: none; border: 1px solid #000; position: absolute; top: 0; left: 100%; }\n.mplayer-context-dir-left .mplayer-context-sub { left: auto; right: 100%; }\n.mplayer-context-dir-top .mplayer-context-sub { top: auto; bottom: 0; }\n.mplayer-context-item { position: relative; }\n.mplayer-context-item:not(:first-child) > .mplayer-context-link { border-top: 1px solid rgba(255,255,255,.2); }\n.mplayer-context-item:hover > .mplayer-context-sub { display: block; }\n.mplayer-context-link { -webkit-box-sizing: border-box; box-sizing: border-box; display: block; min-width: 100px; max-width: 250px; padding: 8px 15px; color: #fff; text-decoration: none; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }\n.mplayer-context-link:hover,\n.mplayer-context-link:focus { background-color: rgba(255,255,255,.2); }\n.mplayer-context-sub .mplayer-context-link { min-width: auto; }\n</style>\n';

	/**
	 * 컨텍스트 메뉴
	 * 서브 메뉴 지원
	 * 
	 * @class ContextMenu
	 */

	var ContextMenu = function () {

		/**
	  * Creates an instance of ContextMenu.
	  * 
	  * @param {Array} items 컨텍스트 메뉴 아이템 배열
	  * @param {Player} Player Player Object
	  */
		function ContextMenu(items, Player) {
			_classCallCheck(this, ContextMenu);

			/**
	   * 메뉴아이템 배열
	   * @type {Array}
	   */
			this.items = items;

			/**
	   * Player Object
	   * @type {Player}
	   */
			this.player = Player;

			/**
	   * 컨텍스트 메뉴 엘리먼트
	   * @type {Element}
	   */
			this.el = null;

			/**
	   * 메뉴이벤트 배열
	   * @type {Array}
	   */
			this.events = [];

			// 초기화
			this.init(items);

			return this;
		}

		/**
	  * 초기화. items 교체해서 재설정 가능
	  * @param {Array} items 컨텍스트 메뉴 아이템 배열
	  */


		_createClass(ContextMenu, [{
			key: 'init',
			value: function init(items) {
				this.items = items;
				this.events = [];
				this.el = document.createElement('div');
				this.el.setAttribute('class', 'mplayer-context-menu');
				this.el.setAttribute('tabindex', '0');
				this.el.innerHTML = '\n\t\t\t' + contextMenuStyle + '\n\t\t\t<ul class="mplayer-context-main">' + this.createTree(this.items) + '</ul>\n\t\t';
				this.applyEvent();
			}

			/**
	   * 트리메뉴 HTML 스트링 생성
	   * @param {Array} items
	   */

		}, {
			key: 'createTree',
			value: function createTree(items) {
				var str = '';
				for (var i = 0, len = items.length; i < len; ++i) {
					this.events.push(items[i].action);
					str += '\n\t\t\t\t<li class="mplayer-context-item">\n\t\t\t\t\t<a href="#" class="mplayer-context-link" onclick="event.preventDefault();">' + items[i].title + '</a>\n\t\t\t\t\t' + (items[i].group ? '<ul class="mplayer-context-sub">' + this.createTree(items[i].group) + '</ul>' : '') + '\t\t\n\t\t\t\t</li>\n\t\t\t';
				}

				return str;
			}

			/**
	   * 이벤트 적용
	   */

		}, {
			key: 'applyEvent',
			value: function applyEvent() {
				var link = this.el.querySelectorAll('.mplayer-context-link');
				for (var i = 0, len = link.length; i < len; ++i) {
					link[i].addEventListener('click', this.events[i].bind(this.player), false);
				}
			}

			/**
	   * 메뉴 보이기
	   * @param {MouseEvent} e
	   */

		}, {
			key: 'show',
			value: function show(e) {
				this.hide();
				window.addEventListener('click', this.hide, false);
				window.addEventListener('contextmenu', this.hide, false);
				window.addEventListener('resize', this.hide, false);
				document.body.appendChild(this.el);
				this.position(e);
				this.el.focus();
			}

			/**
	   * 메뉴 숨기기
	   */

		}, {
			key: 'hide',
			value: function hide(e) {
				if (e && e.type === 'contextmenu' && (0, _util.closest)(e.target, '.mplayer')) {
					return false;
				}

				var tg = document.querySelectorAll('.mplayer-context-menu');
				for (var i = 0, len = tg.length; i < len; ++i) {
					document.body.removeChild(tg[i]);
				}

				window.removeEventListener('click', this.hide, false);
				window.removeEventListener('contextmenu', this.hide, false);
				window.removeEventListener('resize', this.hide, false);
			}

			/**
	   * 위치 계산하여 설정
	   * @param {MouseEvent} e
	   */

		}, {
			key: 'position',
			value: function position(e) {
				var el = this.el,
				    winWidth = document.documentElement.clientWidth || document.body.clientWidth,
				    winHeight = document.documentElement.clientHeight || document.body.clientHeight,
				    scrollTop = window.pageYOffset,
				    scrollLeft = window.pageXOffset,
				    bottomLimit = winHeight - el.offsetHeight + scrollTop,
				    rightLimit = winWidth - el.offsetWidth + scrollLeft,
				    top = e.clientY + scrollTop,
				    left = e.clientX + scrollLeft;

				if (left >= rightLimit) {
					this.el.classList.add('mplayer-context-dir-left');
					left = rightLimit;
				}

				if (top >= bottomLimit) {
					this.el.classList.add('mplayer-context-dir-top');
					top = bottomLimit;
				}

				el.setAttribute('style', 'top:' + top + 'px; left:' + left + 'px');
			}
		}]);

		return ContextMenu;
	}();

	exports.default = ContextMenu;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 가로or세로형 드래그&드롭 슬라이더.
	 * 
	 * @class Slider
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Slider = function () {

		/**
	  * Creates an instance of Slider.
	  * 
	  * @param {Object} [{ 
	  * 		el, 			- 슬라이더 적용 대상 엘리먼트
	  * 		onDrag, 		- 드래그 콜백 함수
	  * 		axis='x' 		- 드래그 방향
	  * 	}={}]
	  */
		function Slider() {
			var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    el = _ref.el,
			    onDrag = _ref.onDrag,
			    _ref$axis = _ref.axis,
			    axis = _ref$axis === undefined ? 'x' : _ref$axis;

			_classCallCheck(this, Slider);

			/**
	   * 슬라이더 엘리먼트
	   * @type {Element}
	   */
			this.range = el;

			/**
	   * 드래그 버튼 엘리먼트
	   * @type {Element}
	   */
			this.dragger = this.range.children[0];

			/**
	   * 드래그 콜백 함수
	   * @type {Function}
	   */
			this.onDrag = onDrag;

			/**
	   * x 방향이면 true
	   * @type {Boolean}
	   */
			this.isX = axis === 'x';

			/**
	   * mousedown 상태이면 true
	   * @type {Boolean}
	   */
			this.isDown = false;

			this.range.addEventListener("mousedown", this.mousedown.bind(this));
			document.addEventListener("mousemove", this.update.bind(this));
			document.addEventListener("mouseup", this.mouseup.bind(this));
			this.range.addEventListener("touchstart", this.mousedown.bind(this));
			document.addEventListener("touchmove", this.update.bind(this));
			document.addEventListener("touchend", this.mouseup.bind(this));

			return this;
		}

		/**
	  * 드래그 시작
	  * @param {Event} e
	  */


		_createClass(Slider, [{
			key: 'mousedown',
			value: function mousedown(e) {
				e.preventDefault();
				e.stopPropagation();
				this.isDown = true;
				this.update(e);
			}

			/**
	   * 드래그 움직임
	   * @param {Event} e
	   */

		}, {
			key: 'update',
			value: function update(e) {
				var eventPos = e.touches ? this.isX ? e.touches[0].pageX : e.touches[0].pageY : this.isX ? e.pageX : e.pageY,
				    isOver = eventPos >= this.offsetPos && eventPos <= this.offsetPos + this.rangeSize,
				    gap = eventPos - this.offsetPos,
				    to = 0;

				if (this.isDown && isOver) {
					if (this.isX) {
						to = Math.round(gap / this.rangeSize * 100);
					} else {
						to = Math.round((this.rangeSize - gap) / this.rangeSize * 100);
					}

					this.position = to;

					if (typeof this.onDrag === "function") {
						this.onDrag.call(this, this.position);
					}
				}
			}

			/**
	   * 드래그 종료
	   */

		}, {
			key: 'mouseup',
			value: function mouseup() {
				this.isDown = false;
			}

			/**
	   * 현재 위치 백분율 값 리턴
	   * @type {Number}
	   */

		}, {
			key: 'position',
			get: function get() {
				var prop = this.isX ? 'width' : 'height';
				return Math.round(parseInt(this.dragger.style[prop]));
			}

			/**
	   * 슬라이더 위치 적용(백분율 값)
	   * @type {Number}
	   */
			,
			set: function set(val) {
				var prop = this.isX ? 'width' : 'height';
				this.dragger.style[prop] = val + '%';
			}

			/**
	   * 슬라이더 사이즈 리턴. width or height
	   * @type {Number}
	   * @readonly
	   */

		}, {
			key: 'rangeSize',
			get: function get() {
				return this.isX ? this.range.offsetWidth : this.range.offsetHeight;
			}

			/**
	   * 슬라이더 위치 리턴. left or top
	   * @type {Number}
	   * @readonly
	   */

		}, {
			key: 'offsetPos',
			get: function get() {
				var obj = this.range,
				    pos = 0;

				if (obj && obj.offsetParent) {
					while (obj) {
						if (this.isX) {
							pos += obj.offsetLeft;
						} else {
							pos += obj.offsetTop;
						}
						obj = obj.offsetParent;
					}
				}

				return pos;
			}
		}]);

		return Slider;
	}();

	exports.default = Slider;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _wrapper = __webpack_require__(6);

	var _wrapper2 = _interopRequireDefault(_wrapper);

	var _slider = __webpack_require__(11);

	var _slider2 = _interopRequireDefault(_slider);

	var _audioEvent = __webpack_require__(9);

	var _audioEvent2 = _interopRequireDefault(_audioEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 오디오 플레이어
	 * 
	 * @export
	 * @class AudioPlayer
	 * @extends {PlayerWrapper}
	 */
	var AudioPlayer = function (_PlayerWrapper) {
		_inherits(AudioPlayer, _PlayerWrapper);

		/**
	  * Creates an instance of VideoPlayer.
	  * 
	  * @param {Player} Player
	  */
		function AudioPlayer(Player) {
			var _ret;

			_classCallCheck(this, AudioPlayer);

			var _this = _possibleConstructorReturn(this, (AudioPlayer.__proto__ || Object.getPrototypeOf(AudioPlayer)).call(this, Player));

			_this.player.events = new _audioEvent2.default(_this.player);

			return _ret = _this, _possibleConstructorReturn(_this, _ret);
		}

		/**
	  * UI 생성
	  */


		_createClass(AudioPlayer, [{
			key: 'createInterface',
			value: function createInterface(htmlString) {
				_get(AudioPlayer.prototype.__proto__ || Object.getPrototypeOf(AudioPlayer.prototype), 'createInterface', this).call(this, htmlString);

				var player = this.player,
				    el = player.el,
				    opt = player.opt,
				    container = player.ui.container,
				    progressBar = container.querySelector('.mp-progress'),
				    volumeBar = container.querySelector('.mp-volume'),
				    progress = new _slider2.default({ el: progressBar }),
				    volume = new _slider2.default({ el: volumeBar });

				player.ui = _extends(player.ui, {
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
		}]);

		return AudioPlayer;
	}(_wrapper2.default);

	exports.default = AudioPlayer;

/***/ }
/******/ ]);