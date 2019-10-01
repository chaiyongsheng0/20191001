$(document).on('touchstart touchmove touchend', function (ev) {
	ev.preventDefault();
});

let swiperModule = (function () {
	let swiperExample = null,
		$swiperBox = $('.swiperBox');

	function pageMove() {
		$baseInfo = $('.baseInfo');

		//=>this:swiperExample
		let activeIndex = this.activeIndex,
			slides = this.slides;

		//=>给当前页面设置ID，让其内容有动画效果
		[].forEach.call(slides, (item, index) => {
			if (index === activeIndex) {
				activeIndex === 0 ? activeIndex = 7 : null;
				activeIndex === 8 ? activeIndex = 1 : null;
				item.style.opacity = '1';
				item.id = 'page' + activeIndex;
				return;
			}
			item.style.opacity = '0';
			item.id = null;
		});
	}

	return {
		init(index = 1) {
			$swiperBox.css('display', 'block');
			if (swiperExample) {
				swiperExample.slideTo(index, 0);
				return;
			}
			swiperExample = new Swiper('.swiper-container', {
				direction: 'vertical',
				loop: true,
				effect: "slide",
				on: {
					init: pageMove,
					transitionEnd: pageMove
				}
			});
			swiperExample.slideTo(index, 0);

		}
	}
})();

swiperModule.init();

/* ==音乐的处理== */
function handleMusic() {
	let $musicAudio = $('.musicAudio'),
		musicAudio = $musicAudio[0],
		$musicIcon = $('.musicIcon');

	$musicAudio.on('canplay', function () {
		$musicIcon.css('display', 'block')
			.addClass('move');
	});

	$musicIcon.tap(function () {
		if (musicAudio.paused) {
			//=>当前暂停状态
			play();
			$musicIcon.addClass('move');
			return;
		}
		//=>当前播放状态
		musicAudio.pause();
		$musicIcon.removeClass('move');
	});

	function play() {
		musicAudio.play();
		document.removeEventListener("touchstart", play);
	}
	play();

	//=>兼容处理
	document.addEventListener("WeixinJSBridgeReady", play);
	document.addEventListener("YixinJSBridgeReady", play);
	document.addEventListener("touchstart", play);
}
handleMusic();