$(document).ready(function(){
    setGnb();
    setSearch();
    setMenuModal();
    setSubVisual();
    setQuickMenu();
});

// gnb
function setGnb(){
    $('#gnb ul li a').on('mouseenter focus',function(){
        $('#gnb .depth2, .header-bg').stop().slideDown(300,'easeOutExpo');
    });

    $('#gnb').on('mouseleave',function(){
        $('#gnb .depth2, .header-bg').stop().slideUp(100,'easeOutExpo');
    });

    $('#gnb .depth1 > li').on('mouseenter focusin',function(){
        $(this).addClass('on');
    });
    $('#gnb .depth1 > li').on('mouseleave focusout',function(){
        $(this).removeClass('on');
    });

    $('*:not("#gnb a")').on('focus',function(){
        $('#gnb .depth2, .header-bg').stop().slideUp(100,'easeOutExpo');
    });

    $('#gnb .depth1 > li:eq(0)').on('focusin mouseenter',function(){
        $('.header-bg .cont-tit').html('6가지 직불제를<br>한눈에 볼 수 있어요!');
        $('.header-bg .cont-img').css('background','url(../../images/common/ico_menu01.png)');
    });
    $('#gnb .depth1 > li:eq(1)').on('focusin mouseenter',function(){
        $('.header-bg .cont-tit').html('교육과정을<br>알 수 있어요!');
        $('.header-bg .cont-img').css('background','url(../../images/common/ico_menu02.png)');
    });
    $('#gnb .depth1 > li:eq(2)').on('focusin mouseenter',function(){
        $('.header-bg .cont-tit').html('수강 및 이수증 출력을<br>할 수 있어요!');
        $('.header-bg .cont-img').css('background','url(../../images/common/ico_menu03.png)');
    });
    $('#gnb .depth1 > li:eq(3)').on('focusin mouseenter',function(){
        $('.header-bg .cont-tit').html('공지사항 등 여러정보를<br>볼 수 있어요!');
        $('.header-bg .cont-img').css('background','url(../../images/common/ico_menu04.png)');
    });
}

// 통합검색
function setSearch(){
    var target = '#search-modal';

    $('a[href="'+target+'"]').on('click',function(e){
        e.preventDefault();
        
        var $this = $(this);
        if($this.hasClass('on')){
            $this.removeClass('on');
            $this.find('span').text('통합검색 열기');
            $(target).stop().slideUp(300,'easeOutExpo');
        }else{
            $this.addClass('on');
            $this.find('span').text('통합검색 닫기');
            $(target).stop().slideDown(300,'easeOutExpo');
            $('#header .search input').focus();
        }
    });

    $('#search-modal input').on('keydown',function(e){
        if(e.shiftKey && e.keyCode == 9){
            e.preventDefault();
            searchModalClose();
        }
    });

    $('#search-modal .search-btn').on('keydown',function(e){
        if(!e.shiftKey && e.keyCode == 9){
            e.preventDefault();
            searchModalClose();
        }
    });

    function searchModalClose(){
        $('#header .btn-search').removeClass('on')
        $('#header .btn-search').find('span').text('통합검색 열기');
        $(target).stop().slideUp(300,'easeOutExpo');
        $('#header .btn-search').focus();
    }
}

// 전체메뉴, 모바일메뉴
function setMenuModal(){
    $(window).on('load resize', function(){	
        var view_w = window.innerWidth;
        var btnMenuOpen = $('.btn-menu');	
        var btnMenuClose = $('.menu-close');
        var menuModal = $('#menu-modal');
        var menuAll = $('#all-menu');
        var menuMo = $('#mo-menu');
    
        //초기화
        menuModal.off();
        btnMenuOpen.off();
    
        // for Tab, Mobile
        if(view_w <= 1024){
            //Tab, Mobile 초기화
            if(menuAll.hasClass('on')){
                $('body').removeClass('open-modal');
                menuModal.removeClass('on');
                menuAll.removeClass('on');
            }

            btnMenuOpen.on('click',function(e){		
                e.preventDefault();
        
                $('body').addClass('open-modal');
                menuModal.addClass('on');
                menuMo.addClass('on');
            });	        

            btnMenuClose.on('click',function(e){
                e.preventDefault();

                menuClose();
            });	

            function menuClose(){
                $('body').removeClass('open-modal');
                menuModal.removeClass('on');
                menuMo.removeClass('on');
                $('#mo-menu .depth1 > li').removeClass('open');
            }

            menuModal.on('click',function(e){
                var target = $(e.target);
                if(! target.closest('#menu-modal #mo-menu').length){
                    menuClose();
                }
            });

            $('#mo-menu .depth1 > li > a').on('click',function(){
                $('#mo-menu .depth1 > li').removeClass('open');
                $(this).parent().addClass('open');
            });

            $('#mo-menu .depth1 > li').each(function(){
                var depth2 = $(this).find('.depth2 > li');

                depth2.each(function(i){
                    $(this).css('transition-delay',i*10/100+'s');
                });
            });
        }
    
        // for PC
        else{
            //PC 초기화
            if(menuMo.hasClass('on')){
                $('body').removeClass('open-modal');
                menuModal.removeClass('on');
                menuMo.removeClass('on');
            }
            $('#mo-menu .depth1 > li').removeClass('open');

            btnMenuOpen.on('click',function(e){		
                e.preventDefault();
                var content = $('#all-menu').find('.cont-body');
        
                $('body').addClass('open-modal');
                menuModal.addClass('on');
                menuAll.addClass('on');
                btnMenuClose.focus();
                content.find('a:last').focusout(function(){btnMenuClose.focus();});  
            });	           

            btnMenuClose.on('click',function(e){
                e.preventDefault();

                menuClose();
            });	

            function menuClose(){
                $('body').removeClass('open-modal');
                menuModal.removeClass('on');
                menuAll.removeClass('on');
                btnMenuOpen.focus();
            }

            menuModal.on('click',function(e){
                var target = $(e.target);
                if(! target.closest('#menu-modal #all-menu').length){
                    menuClose();
                }
            });
        }
    });
}

// 서브페이지 상단
function setSubVisual(){
    var imageNum = Math.floor(Math.random() * 9) + 1;
    var imgPath = ('../../images/common/bg_sub_visual0'+imageNum+'.jpg');

    $('.sub-visual').css('background-image',('url("'+imgPath+'")'));
}

// 퀵메뉴
function setQuickMenu(){
    $('.top-btn').on('click',function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, 400);
    });

    $(window).on('scroll resize',function(){
        if($(window).outerWidth() <= 767){
            if ($(window).scrollTop() > 100) {
                $('.top-btn').addClass('action');
            }else{
                $('.top-btn').removeClass('action');
            }
        }
    });
}