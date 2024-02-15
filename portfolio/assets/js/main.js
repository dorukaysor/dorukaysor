'use strict';

(function () {
"use strict";

/**
   * [isMobile description]
   * @type {Object}
   */

window.isMobile = {
	Android: function Android() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function any() {
		return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	}
};
window.isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
window.windowHeight = window.innerHeight;
window.windowWidth = window.innerWidth;

/**
   * Match height 
   */
$('.row-eq-height > [class*="col-"]').matchHeight();

var myEfficientFn = debounce(function () {
	$('.row-eq-height > [class*="col-"]').matchHeight();
}, 250);

window.addEventListener('resize', myEfficientFn);

/**
   * [debounce description]
   * @param  {[type]} func      [description]
   * @param  {[type]} wait      [description]
   * @param  {[type]} immediate [description]
   * @return {[type]}           [description]
   */
function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			    args = arguments;
		var later = function later() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/**
   * Fullscreen menu
   */
$('.fullscreenmenu__module').each(function () {
	var self = $(this),
		    triggerID = self.attr('trigger');

	self.on("click", function () {
		$(triggerID).toggleClass('open');
		$(this).toggleClass('open');
	});
	$(triggerID).on("click", function () {
		$(triggerID).toggleClass('open');
		self.toggleClass('open');
	});
});

/**
   * Masonry
   */
$('.grid__inner').masonry({
	itemSelector: '.grid-item',
	columnWidth: '.grid-sizer'
});

/**
   * grid css
   */

$.fn.reCalWidth = function () {
	var $self = $(this);
	$self.on('reCalWidth', function () {
		var _self = $(this);
		_self.css('width', '');
		var width = Math.floor(_self.width());
		_self.css('width', width + 'px');
		var height = Math.floor(_self.parent().children('.wide').width() / 2);
		_self.parent().children('.wide').css('height', height + 'px');
	});
	$(window).on('resize', function () {
		$self.trigger('reCalWidth');
	});
};
function work() {
	$('.grid-css').each(function () {
		var workWrapper = $(this),
			    workContainer = $('.grid__inner', workWrapper),
			    filters = $('.filter', workWrapper),
			    filterCurrent = $('.current a', filters),
			    filterLiCurrent = $('.current', filters),
			    duration = 0.3;
		workContainer.imagesLoaded(function () {

			// Fix Height
			if (workWrapper.hasClass('grid-css--fixheight')) {
				workContainer.find('.grid-item__content-wrapper').matchHeight();
			}

			workContainer.isotope({
				layoutMode: 'masonry',
				itemSelector: '.grid-item',
				transitionDuration: duration + 's',
				masonry: {
					columnWidth: '.grid-sizer'
					// hiddenStyle: {},
					// visibleStyle: {}
				} });
		});
		filters.on('click', 'a', function (e) {
			e.preventDefault();
			var $el = $(this);
			var selector = $el.attr('data-filter');
			filters.find('.current').removeClass('current');
			$el.parent().addClass('current');
			workContainer.isotope({
				filter: selector
			});
		});

		filters.find('.select-filter').change(function () {
			var $el = $(this);
			var selector = $el.val();
			workContainer.isotope({
				filter: selector
			});
		});

		$('.grid-item', workWrapper).reCalWidth();
	});
}
work();

$('.ef-hoverdir').each(function () {
	$(this).hoverdir({
		speed: 300,
		easing: 'ease',
		hoverDelay: 40
	});
});

/**
   * ProgressBar
   */
var progress = $('.progress');

progress.each(function () {

	var _self = $(this);
	var progressNumber = _self.find('.progress__number');
	progressNumber.text('0%');

	_self.waypoint(function (direction) {
		var progressBar = _self.find('.progress__bar'),
			    delay = progressBar.data("delay"),
			    durations = progressBar.data("duration"),
			    timing = progressBar.data("timing"),
			    getPercent = progressBar.data('progress-percent');

		console.log(durations);

		progressBar.css({
			'width': getPercent + '%',
			'transition': 'all ' + durations + 'ms ' + timing,
			'transition-delay': delay + 'ms'
		});

		setTimeout(function () {
			progressNumber.prop('Counter', 0).animate({
				Counter: getPercent
			}, {
				duration: durations,
				easing: 'swing',
				step: function step(now) {
					$(this).text(Math.ceil(now) + '%');
				}
			});
		}, delay);

		this.destroy();
	}, {
		offset: function offset() {
			return Waypoint.viewportHeight() - _self.outerHeight() - 150;
		}
	});
});

/**
   * Typing effect
   */
$('.typing__module').each(function (index) {
	var self = $(this),
		    _wrapper = $('.typed', self)[0],
		    optData = eval('(' + self.attr('data-options') + ')'),
		    optDefault = {
		stringsElement: self.find('.typed-strings')[0],
		typeSpeed: 50,
		backSpeed: 500,
		fadeOut: true,
		loop: true
	},
		    options = $.extend(optDefault, optData);
	var typed = new Typed(_wrapper, options);
});

/**
  * Footer
  */

$('#back-to-top').on('click', function (e) {
	e.preventDefault();
	$('html,body').animate({
		scrollTop: 0
	}, 700);
});
//*
// Header
//*


var wh = $(window).height(),
	    half = wh / 5,
	    headerHeight = $('header').outerHeight();

$(window).scroll(function () {
	var scrollTop = $(window).scrollTop();

	if (scrollTop >= half) {
		$('header').addClass('is-scroll');
	} else {
		$('header').removeClass('is-scroll');
	}
});

$('.onepage-nav').dropdownMenu({
	menuClass: 'onepage-menu',
	breakpoint: 1200,
	toggleClass: 'active',
	classButtonToggle: 'navbar-toggle',
	subMenu: {
		class: 'sub-menu',
		parentClass: 'menu-item-has-children',
		toggleClass: 'active'
	}
});

$('.onepage-nav').onePageNav({
	currentClass: 'current-menu-item',
	scrollOffset: headerHeight
});

//*
// Back to top
//*

$(window).scroll(function () {
	var wh = $(window).height(),
		    scrollTop = $(window).scrollTop();

	if (scrollTop >= wh) {
		$('#back-to-top').addClass('is-visible');
	} else {
		$('#back-to-top').removeClass('is-visible');
	}
});

var headerHeight = $('header').outerHeight();

$('#back-to-down').on('click', function () {
	var offsets = $(this).closest('.hero').next().offset().top - headerHeight;

	$('html,body').animate({
		scrollTop: offsets
	}, 700);
});
})();