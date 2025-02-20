$(document).ready(function(){
    setVisualSlide();
    setNewsletterSlide();
    setVideoSlide();
    setBannerSlide();
	setNewsTab();
});

//자동재생 컨트롤
function autoPlayToggle(slide, chck){
    if (chck == true) {
        slide.autoplay.stop();
    } else {
        slide.autoplay.start();
    }
}
//슬라이드 포커스
function slideFocusMove(el, slide){
    var $this = el;
    var $slide = slide;
    if($slide.autoplay.running == true) {
        $slide.autoplay.stop();
    }
}
//슬라이드 포커스
function slideFocusOutMove(el, slide){
    var $this = el;
    var $slide = slide;
    if($slide.autoplay.running == false) {
        $slide.autoplay.start();
    }
}

// 비주얼 슬라이드
function setVisualSlide(){
    var visualSlide = new Swiper('.visual-slide', {
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        loop: true,
        pagination: {
            el: '.visual-control .swiper-pagination',
            type: 'bullets',
            clickable: true,
        }
    });

    var btnVisualAutoPlay = $('.visual-control .btn-stop');
    btnVisualAutoPlay.on('click', function() {
        var isClicked = $(this).hasClass('on');

        if (isClicked) {
            $(this).removeClass('on');
            $(this).find('span').text('일시정지');
        } else {
            $(this).addClass('on');
            $(this).find('span').text('재생');
        }
        autoPlayToggle(visualSlide, !isClicked);
    });
}

// 소식지 슬라이드
function setNewsletterSlide(){
    var newsletterSlide = new Swiper('.newsletter-slide', {
        slidesPerView: 'auto',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        loop: true,
        navigation: {
            nextEl: '.newsletter-control .btn-next',
            prevEl: '.newsletter-control .btn-prev'
        },  
        on: {	
            slideChangeTransitionStart: function(){ // 접근성 추가 - tab 포커스이동
                $('.newsletter-slide .swiper-slide').find('a').attr('tabindex', '-1');
                $('.newsletter-slide .swiper-slide-active, .newsletter-slide .swiper-slide-active + li, .newsletter-slide .swiper-slide-active + li + li').find('a').attr('tabindex', '0');
            }
        },
    });

    $('.newsletter-slide a').on('focusin', function() {
        var $this = $(this);
        slideFocusMove($this, newsletterSlide);
    });
    $('.newsletter-slide a').on('focusout', function() {
        var $this = $(this);
        slideFocusOutMove($this, newsletterSlide);
    });
}

// 홍보영상 슬라이드
function setVideoSlide(){
    var videoSlide = new Swiper('.video-slide', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        loop: true,
        navigation: {
            nextEl: '.video-control .btn-next',
            prevEl: '.video-control .btn-prev'
        },  
        on: {	
            slideChangeTransitionStart: function(){ // 접근성 추가 - tab 포커스이동
                $('.video-slide .swiper-slide').find('a').attr('tabindex', '-1');
                $('.video-slide .swiper-slide-active, .video-slide .swiper-slide-active + li').find('a').attr('tabindex', '0');
            }
        },
    });

    $('.video-slide a').on('focusin', function() {
        var $this = $(this);
        slideFocusMove($this, videoSlide);
    });
    $('.video-slide a').on('focusout', function() {
        var $this = $(this);
        slideFocusOutMove($this, videoSlide);
    });
}

// 배너모음 슬라이드
function setBannerSlide(){
    var bannerSlide = new Swiper('.banner-slide', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        loop: true,
        navigation: {
            nextEl: '.banner-control .btn-next',
            prevEl: '.banner-control .btn-prev'
        },  
        on: {	
            slideChangeTransitionStart: function(){ // 접근성 추가 - tab 포커스이동
                $('.banner-slide .swiper-slide').find('a').attr('tabindex', '-1');
                $('.banner-slide .swiper-slide-active, .banner-slide .swiper-slide-active + li, .banner-slide .swiper-slide-active + li + li, .banner-slide .swiper-slide-active + li + li + li').find('a').attr('tabindex', '0');
            }
        },
        breakpoints: {
            767: {
                spaceBetween: 10,
            }
        }
    });

    $('.banner-slide a').on('focusin', function() {
        var $this = $(this);
        slideFocusMove($this, bannerSlide);
    });
    $('.banner-slide a').on('focusout', function() {
        var $this = $(this);
        slideFocusOutMove($this, bannerSlide);
    });
}

// 소식 탭
function setNewsTab(){
    $('.tab-menu .tab-tit').on('click focus',function(e){
        e.preventDefault();

        $('.tab-menu .tab-tit').parent().removeClass('active');
        $('.tab-menu .tab-cont').removeClass('active');

        $(this).parent().addClass('active');
        $(this).siblings('.tab-cont').addClass('active');
    });
}