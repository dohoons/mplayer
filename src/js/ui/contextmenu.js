'use strict';

import classList from 'classlist';
import { closest } from '../util/util';

const contextMenuStyle = `
<style>
.mplayer-context-menu { line-height: 1.2; font-family: 'Malgun Gothic', 'dotum', sans-serif; font-size: 12px; color: #fff; background: rgba(0,0,0,.85); outline: none; position: absolute; z-index: 99999999; }
.mplayer-context-main { margin: 0; padding: 0; list-style: none; }
.mplayer-context-sub { display: none; margin: 0; padding: 0; background: rgba(0,0,0,.85); list-style: none; border: 1px solid #000; position: absolute; top: 0; left: 100%; }
.mplayer-context-dir-left .mplayer-context-sub { left: auto; right: 100%; }
.mplayer-context-dir-top .mplayer-context-sub { top: auto; bottom: 0; }
.mplayer-context-item { position: relative; }
.mplayer-context-item:not(:first-child) > .mplayer-context-link { border-top: 1px solid rgba(255,255,255,.2); }
.mplayer-context-item:hover > .mplayer-context-sub { display: block; }
.mplayer-context-link { -webkit-box-sizing: border-box; box-sizing: border-box; display: block; min-width: 100px; max-width: 250px; padding: 8px 15px; color: #fff; text-decoration: none; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.mplayer-context-link:hover,
.mplayer-context-link:focus { background-color: rgba(255,255,255,.2); }
.mplayer-context-sub .mplayer-context-link { min-width: auto; }
</style>
`;

/**
 * 컨텍스트 메뉴
 * 서브 메뉴 지원
 * 
 * @class ContextMenu
 */
export default class ContextMenu {

	/**
	 * Creates an instance of ContextMenu.
	 * 
	 * @param {Array} items 컨텍스트 메뉴 아이템 배열
	 * @param {Player} Player Player Object
	 */
	constructor(items, Player) {
		
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
	init(items) {
		this.items = items;
		this.events = [];
		this.el = document.createElement('div');
		this.el.setAttribute('class', 'mplayer-context-menu');
		this.el.setAttribute('tabindex', '0');
		this.el.innerHTML = `
			${contextMenuStyle}
			<ul class="mplayer-context-main">${this.createTree(this.items)}</ul>
		`;
		this.applyEvent();
	}

	/**
	 * 트리메뉴 HTML 스트링 생성
	 * @param {Array} items
	 */
	createTree(items) {
		let str = '';
		for(let i=0, len=items.length; i<len; ++i) {
			this.events.push(items[i].action);
			str += `
				<li class="mplayer-context-item">
					<a href="#" class="mplayer-context-link" onclick="event.preventDefault();">${items[i].title}</a>
					${items[i].group ? `<ul class="mplayer-context-sub">${this.createTree(items[i].group)}</ul>` : ``}		
				</li>
			`;
		}

		return str;
	}

	/**
	 * 이벤트 적용
	 */
	applyEvent() {
		let link = this.el.querySelectorAll('.mplayer-context-link');
		for(let i=0, len=link.length; i<len; ++i) {
			link[i].addEventListener('click', this.events[i].bind(this.player), false);
		}
	}

	/**
	 * 메뉴 보이기
	 * @param {MouseEvent} e
	 */
	show(e) {
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
	hide(e) {
		if(e && e.type === 'contextmenu' && closest(e.target, '.mplayer')) {
			return false;
		}

		let tg = document.querySelectorAll('.mplayer-context-menu');
		for(let i=0, len=tg.length; i<len; ++i) {
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
	position(e) {
		var el = this.el,
			winWidth = document.documentElement.clientWidth || document.body.clientWidth,
			winHeight = document.documentElement.clientHeight || document.body.clientHeight,
			scrollTop = window.pageYOffset,
			scrollLeft = window.pageXOffset,
			bottomLimit = winHeight - el.offsetHeight + scrollTop,
			rightLimit = winWidth - el.offsetWidth + scrollLeft,
			top = e.clientY + scrollTop,
			left = e.clientX + scrollLeft;
		
		if(left >= rightLimit) {
			classList(this.el).add('mplayer-context-dir-left')
			left = rightLimit;
		}

		if(top >= bottomLimit) {
			classList(this.el).add('mplayer-context-dir-top')
			top = bottomLimit;
		}

		el.style.top = `${top}px`;
		el.style.left = `${left}px`;
	}
}