'use strict';

function getElem(elem) {
	return document.querySelector(elem);
}

function addClass(el, className) {
	if (el.classList) {
		el.classList.add(className);
	} else {
		el.className += ' ' + className;
	}
}
function removeClass(el, className) {
	if (el.classList) {
		el.classList.remove(className);
	} else {
		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
}
function extendObj(_def, addons) {
	if (typeof addons !== 'undefined') {
		for (let prop in _def) {
			if (addons[prop] != undefined) {
				_def[prop] = addons[prop];
			}
		}
	}
}

let slider_plugin = (function () {

	let fifi_slider = function (settings) {
		let _ = this;

		_.def = {
			target: getElem('.slider'),
			dotsWrapper: getElem('.dots-wrapper'),
			transition: {
				speed: 300,
				easing: ''
			},
			swipe: true,
			autoHeight: true,
			afterChangeSlide: function afterChangeSlide() { }
		};

		extendObj(_.def, settings);

		_.init();
	};

	fifi_slider.prototype.buildDots = function () {
		let _ = this;

		for (let i = 0; i < _.pageCounts; i++) {
			let dot = document.createElement('li');
			dot.innerHTML = (i+1).toString();
			dot.setAttribute('data-slide', i);
			dot.style.color = 'white';
			dot.style.fontSize = '13px';
			_.def.dotsWrapper.appendChild(dot);
		}

		_.def.dotsWrapper.addEventListener('click', function (e) {
			if (e.target && e.target.nodeName == 'LI' || e.target.nodeName == 'P' && e.target) {
				_.curSlide = e.target.getAttribute('data-slide');
				_.gotoSlide();
			}
		}, false);
	};
	fifi_slider.prototype.getCurLeft = function () {
		let _ = this;
		if (_.sliderInner.style.left == '') {
			_.curLeft = 0;
		} else {
			_.curLeft = parseInt(_.sliderInner.style.left.split('px')[0]);
		}
	};
	fifi_slider.prototype.gotoSlide = function () {
		let _ = this;

		_.sliderInner.style.transition = 'left ' + _.def.transition.speed / 1000 + 's ' + _.def.transition.easing;
		_.sliderInner.style.left = -_.curSlide * _.totalWidth + 'px';
		addClass(_.def.target, 'isAnimating');
		setTimeout(function () {
			_.sliderInner.style.transition = '';
			removeClass(_.def.target, 'isAnimating');
		}, _.def.transition.speed);
		_.setDot();

		_.def.afterChangeSlide(_);
	};
	fifi_slider.prototype.init = function () {
		let _ = this;

		function on_resize(c, t) {
			onresize = function () {
				clearTimeout(t);
				t = setTimeout(c, 100);
			};
			return onresize;
		}

		window.addEventListener('resize', on_resize(function () {
			_.updateSliderDimension();
		}), false);


		let nowHTML = _.def.target.innerHTML;
		_.def.target.innerHTML = '<div class="slider-inner">' + nowHTML + '</div>';

		initBlocks();

		_.allSlides = 0;
		_.curSlide = 0;
		_.curLeft = 0;
		_.totalSlides = _.def.target.querySelectorAll('.slide').length;

		_.sliderInner = _.def.target.querySelector('.slider-inner');
		_.loadedCnt = 0;
		_.slideW = parseInt(_.def.target.querySelectorAll('.slide')[0].offsetWidth);
		_.totalWidth = parseInt(_.def.target.offsetWidth);
		_.pageCounts = Math.round((_.def.target.querySelectorAll('.slide').length + 1) * _.slideW / _.totalWidth);

		_.allSlides = _.def.target.querySelectorAll('.slide');


		_.sliderInner.style.width = (_.totalSlides) * 100 * _.slideW / _.totalWidth + '%';
		for (let _i = 0; _i < _.totalSlides; _i++) {
			_.allSlides[_i].style.width = 100 / (_.totalSlides) + '%';
		}

		_.buildDots();
		_.setDot();


		function addListenerMulti(el, s, fn) {
			s.split(' ').forEach(function (e) {
				return el.addEventListener(e, fn, false);
			});
		}
		function removeListenerMulti(el, s, fn) {
			s.split(' ').forEach(function (e) {
				return el.removeEventListener(e, fn, false);
			});
		}

		if (_.def.swipe) {
			addListenerMulti(_.sliderInner, 'mousedown touchstart', startSwipe);
		}

		_.isAnimating = false;

		function startSwipe(e) {
			let touch = e;
			_.getCurLeft();
			if (!_.isAnimating) {
				if (e.type == 'touchstart') {
					touch = e.targetTouches[0] || e.changedTouches[0];
				}
				_.startX = touch.pageX;
				_.startY = touch.pageY;
				addListenerMulti(_.sliderInner, 'mousemove touchmove', swipeMove);
				addListenerMulti(getElem('body'), 'mouseup touchend', swipeEnd);
			}
		}

		function swipeMove(e) {
			let touch = e;
			if (e.type == 'touchmove') {
				touch = e.targetTouches[0] || e.changedTouches[0];
			}
			_.moveX = touch.pageX;
			_.moveY = touch.pageY;


			if (Math.abs(_.moveX - _.startX) < 40) return;

			_.isAnimating = true;
			addClass(_.def.target, 'isAnimating');
			e.preventDefault();

			if (_.curLeft + _.moveX - _.startX > 0 && _.curLeft == 0) {
				_.curLeft = 0;
			} else if (_.curLeft + _.moveX - _.startX < -(_.pageCounts + 1) * _.totalWidth) {
				_.curLeft = -_.totalWidth;
			}
			_.sliderInner.style.left = _.curLeft + _.moveX - _.startX + 'px';
		}

		function swipeEnd() {
			_.getCurLeft();

			if (Math.abs(_.moveX - _.startX) === 0) return;

			_.stayAtCur = Math.abs(_.moveX - _.startX) < 40 || typeof _.moveX === 'undefined' ? true : false;
			_.dir = _.startX < _.moveX ? 'left' : 'right';

			if (!_.stayAtCur) {
				_.dir == 'left' ? _.curSlide-- : _.curSlide++;
				if (_.curSlide < 0) {
					_.curSlide = 0;
				} else if (_.curSlide >= _.pageCounts) {
					_.curSlide = _.pageCounts - 1;
				}
			}

			_.gotoSlide();

			delete _.startX;
			delete _.startY;
			delete _.moveX;
			delete _.moveY;

			_.isAnimating = false;
			removeClass(_.def.target, 'isAnimating');
			removeListenerMulti(_.sliderInner, 'mousemove touchmove', swipeMove);
			removeListenerMulti(getElem('body'), 'mouseup touchend', swipeEnd);
		}
	};

	fifi_slider.prototype.setDot = function () {
		let _ = this;

		for (let j = 0; j < _.pageCounts; j++) {
			removeClass(_.def.dotsWrapper.querySelectorAll('li')[j], 'active');
		}


		addClass(_.def.dotsWrapper.querySelectorAll('li')[_.curSlide], 'active');
	};
	fifi_slider.prototype.updateSliderDimension = function () {
		let _ = this;

		_.totalWidth = parseInt(_.def.target.offsetWidth);
		_.sliderInner.style.left = -_.totalWidth * _.curSlide + 'px';

		if (_.def.autoHeight) {
			_.def.target.style.height = _.allSlides[_.curSlide].offsetHeight + 'px';
		} else {
			for (let i = 0; i < _.totalSlides; i++) {
				if (_.allSlides[i].offsetHeight > _.def.target.offsetHeight) {
					_.def.target.style.height = _.allSlides[i].offsetHeight + 'px';
				}
			}
		}
		_.def.afterChangeSlide(_);
	};
	return fifi_slider;
})();

new slider_plugin({
	target: getElem('slider'),
	dotsWrapper: getElem('.dots-wrapper')
});

function initBlocks() {
	let text_block = '<div class = "title">' +
        '<p id = "textTitle">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe </p>' +
        '</div>' +
        '<div id = "image">' +
        '</div>' +
        '<div class = "mans">' +
        '<img class = "icoMan"src="../resource/man.png" height="27" width="27">' +
        '<p id = "author">Author</p>' +
        '</div>' +
        '<div class = "calendar">' +
        ' <img class = "icoCalendar"src="../resource/calendar.png" height="27" width="27">' +
        '<p id = "day">2018-02-03</p>' +
        ' </div>' +
        '<div class = "eyes">' +
        '<img class = "icoEye"src="../resource/eye.png" height="27" width="27">' +
        '<p id = "count">4523</p>' +
        '</div>' +
        '<p id = "text"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis' +
        'optio cumque voluptas nam perspiciatis suscipit omnis atque quia.</p>';

	for (let i = 0; i < 15; i++) {
		let block = document.createElement('div');
		block.setAttribute('class', 'block');
		block.innerHTML = text_block;
		document.querySelectorAll('.slide')[i].appendChild(block);
	}
}