'use strict';

/**
 * 가로or세로형 드래그&드롭 슬라이더.
 * 
 * @class Slider
 */
export default class Slider {

	/**
	 * Creates an instance of Slider.
	 * 
	 * @param {Object} [{ 
	 * 		el, 			- 슬라이더 적용 대상 엘리먼트
	 * 		onDrag, 		- 드래그 콜백 함수
	 * 		axis='x' 		- 드래그 방향
	 * 	}={}]
	 */
	constructor({ el, onDrag, axis='x' } = {}) {
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
	mousedown(e) {
		e.preventDefault();
		e.stopPropagation();
		this.isDown = true;
		this.update(e);
	}

	/**
	 * 드래그 움직임
	 * @param {Event} e
	 */
	update(e) {
		let eventPos = e.touches ? (this.isX ? e.touches[0].pageX : e.touches[0].pageY) : (this.isX ? e.pageX : e.pageY),
			isOver = eventPos >= this.offsetPos && eventPos <= (this.offsetPos + this.rangeSize),
			gap = eventPos - this.offsetPos,
			to = 0;
		
		if (this.isDown && isOver) {
			if(this.isX) {
				to = Math.round(gap / this.rangeSize * 100);
			} else {
				to = Math.round((this.rangeSize -gap) / this.rangeSize * 100);
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
	mouseup() {
		this.isDown = false;
	}

	/**
	 * 현재 위치 백분율 값 리턴
	 * @type {Number}
	 */
	get position() {
		let prop = this.isX ? 'width' : 'height';
		return Math.round(parseInt(this.dragger.style[prop]));
	}
	
	/**
	 * 슬라이더 위치 적용(백분율 값)
	 * @type {Number}
	 */
	set position(val) {
		let prop = this.isX ? 'width' : 'height';
		this.dragger.style[prop] = val + '%';
	}

	/**
	 * 슬라이더 사이즈 리턴. width or height
	 * @type {Number}
	 * @readonly
	 */
	get rangeSize() {
		return this.isX ? this.range.offsetWidth : this.range.offsetHeight;
	}

	/**
	 * 슬라이더 위치 리턴. left or top
	 * @type {Number}
	 * @readonly
	 */
	get offsetPos() {
		let obj = this.range,
			pos = 0;
			
		if (obj && obj.offsetParent) {
			while (obj) {
				if(this.isX) {
					pos += obj.offsetLeft;
				} else {
					pos += obj.offsetTop;
				}
				obj = obj.offsetParent;
			}
		}

		return pos;
	}
}