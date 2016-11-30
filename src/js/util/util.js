'use strict';

/**
 * 초단위 숫자를 시간형식의 스트링으로 리턴
 * 
 * @param {String} str
 * @returns {String}
 */
module.exports.sec2str = function(str) {
	let t = parseInt(str),
		d = Math.floor(t/86400),
		h = ('0'+Math.floor(t/3600) % 24).slice(-2),
		m = ('0'+Math.floor(t/60)%60).slice(-2),
		s = ('0' + t % 60).slice(-2);
	return (d>0?d+'d ':'')+(h>0?h+':':'')+(m+':')+(t>60?s:s+'');
};

/**
 * 엘리먼트 속성에 대해 검색어로 시작하는 속성일 경우 오브젝트 리턴
 * 
 * @param {String} str 검색할 스트링
 * @returns {Object}
 */
module.exports.getMatchAttr = function(str) {
	let attrs = this.attributes;
	for (let i = attrs.length; i--; ) {
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
 * 현재 스크립트 FILE PATH 리턴
 * 
 * @returns {String}
 */
module.exports.getCurrentScriptPath = function() {
	let script, path;

	if (document.currentScript) {
		script = document.currentScript.src;
	} else {
		let scripts = document.getElementsByTagName('script');
		script = scripts[scripts.length-1].src;
	}

	return script.substring(0, script.lastIndexOf('/'));
};