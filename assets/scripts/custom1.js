/* Table of Content
================================================== 

    01. Sticky Header
    02. Main Menu
    03. Mobile Navigation
    04. Header Search
    05. Revolution Slider
    06. Flexslider
    07. Team Image Overlay
    08. ShowBiz Carousel
    09. Hover Overlay
    10. ToolTip
    11. Isotope Portfolio Filter
    12. Magnific Popup
    13. Accordion
    14. Toggle
    15. Tabs
    16. Skills Bar Animation
    17. Pie Chart
    19. Flick Feeds
    20. Alert Boxes
    21. Words Rotate Animation
    22. Content Animation 
    23. Parallax Section
    24. Animated Stats Numbers

*/


/* ----------------- Start Document ----------------- */


(function($){
    "use strict";
	$(document).ready(function(){

/* 00 Preloader
================================================== */
	$(window).load(function() { // makes sure the whole site is loaded
		"use strict";
			$('.ring').fadeOut(); // will first fade out the loading animation
			$('.loader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
			$('body').delay(350).css({'overflow':'visible'});
		})	


/* 01 Sticky Header
================================================== */
    function stickyPosition(val, body, header) {
        $(header).css({ marginTop: val });
        $(body).css({ paddingTop: val });
    }
	var stickyheader = true; // set false to disable or true to enable sticky header
	
	if(stickyheader == true) {

		var searchform = $('#search-form'),
			logo = $('#logo'),
			header = $('#header'),
			menu = $('.menu ul > li > a');
		
		var smallHeight = 60,   // set compact header height
			durationAnim = 150, // animation speed

			defaultHeight = parseInt(header.css('height')),
			defSearchformMarginTop = parseInt(searchform.css('margin-top')),
			defLogoMarginTop = parseInt(logo.css('margin-top')),
			defMenuPaddingTop = parseInt(menu.css('padding-top')),
			defMenuPaddingBottom = parseInt(menu.css('padding-bottom')),
			small_height = defaultHeight - smallHeight;

		$("#header").css({ position: "fixed"});
		
		
		
		var stickyValue = defaultHeight - 20;
		stickyPosition(-stickyValue, null, "#header");
		stickyPosition(stickyValue, "body", null);

		var stickymenu = function(){
			var base = this,
				offset = $(window).scrollTop(), // Get how much of the window is scrolled
				header = $('#header'),
				src = logo.find('img').attr('src');

			var	searchformMarginTop = defSearchformMarginTop - small_height/4,
				menuPaddingTop = defMenuPaddingTop - small_height/4,
				menuPaddingBottom = defMenuPaddingBottom - small_height/4,
				logoMarginTop = defLogoMarginTop - 1 - small_height/4;

			if ($(window).width() > 767) {
				if (offset > 60) { // if it is over 60px (the initial width)
					if (!header.hasClass('compact')) {
						header.animate({
								height: defaultHeight-small_height
							}, {
								queue: false,
								duration: durationAnim,
								complete: function () {
									header.addClass('compact').css("overflow", "visible");
									$("#header .topbar").css({ display: "none"});
									$("#header").css({ opacity: "0.95"});
									$("#header .search-button").css({ position:"absolute",top: "20px"});
									$("#logo a img").css({"height": "55px", "margin-top": "-7px"});
								}
							});
							searchform.animate({
								marginTop: searchformMarginTop,
							}, {
								queue: false,
								duration: durationAnim
							});
							
							logo.animate({
								marginTop: logoMarginTop
							}, {
								queue: false,
								duration: durationAnim
							});
						menu.animate({
								paddingTop: menuPaddingTop,
								paddingBottom: menuPaddingBottom,
								margin:0
							}, {
								queue: false,
								duration: durationAnim
							});
						}
				} else if (offset > -1 && offset < 60) {
					header.animate({
							height: defaultHeight,
						}, {
							queue: false,
							duration: durationAnim,
							complete: function () {
								header.removeClass('compact').css("overflow", "visible");
								$("#header .topbar").css({ display: "block"});
								$("#header").css({ opacity: "1"});
								$("#header .search-button").css({ position:"absolute",top: "40px"});
								$(".login_signup_btn").css({ "font-size": "17px",padding: "15px","margin-top": "25px" });
								$("#logo a img").css({"height": "85px", "margin-top": "-25px"});
							}
						});
					searchform.animate({
							marginTop: defSearchformMarginTop,
						}, {
							queue: false,
							duration: durationAnim
						});
					  logo.stop().animate({
							marginTop: defLogoMarginTop
						}, {
							queue: false,
							duration: durationAnim
						});
					menu.animate({
							paddingTop: defMenuPaddingTop,
							paddingBottom: defMenuPaddingBottom,
						}, {
							queue: false,
							duration: durationAnim
						});
				}
			}
		}

		stickymenu();
		$(window).scroll(function () { stickymenu(); });

		// sticky header reset for mobile
		$(window).resize(function (){
			var winWidth = $(window).width();
			if(winWidth < 767) {
				 $('#logo').css('marginTop','');
				 $('#header').css('height','').removeClass('compact');
				 $("#header").css({ position: ""});
				 $('.menu ul > li > a').css({
					'paddingTop' : '',
					'paddingBottom' : '',
				 });
				 $('#search-form').css('marginTop','');
				 
				stickyPosition(null, null, "#header");
				stickyPosition(null, "body", null);
			} else {
				stickymenu();
				stickyPosition(-stickyValue, null, "#header");
				stickyPosition(stickyValue, "body", null);
				$("#header").css({ position: "fixed"});
				
				
				
				
			}
		});
	}


/* 02 Main Menu
================================================== */

	$('.menu ul').superfish({
		delay:       300,                              // one second delay on mouseout
		animation:   {opacity:'show',height:'show'},   // fade-in and slide-down animation
		speed:       200,                              // animation speed
		speedOut:    50                                // out animation speed
	});


/* 03 Mobile Navigation
================================================== */

	var jPanelMenu = {};
	$(function() {
		$('pre').each(function(i, e) {hljs.highlightBlock(e)});

		jPanelMenu = $.jPanelMenu({
			menu: '#responsive',
			animated: false,
			keyboardShortcuts: true
		});
		jPanelMenu.on();

		$(document).on('click',jPanelMenu.menu + ' li a',function(e){
			if ( jPanelMenu.isOpen() && $(e.target).attr('href').substring(0,1) == '#' ) { jPanelMenu.close(); }
		});

		$(document).on('touchend','.menu-trigger',function(e){
			jPanelMenu.triggerMenu();
			e.preventDefault();
			return false;
		});
		   
		// Removes SuperFish Styles
		$('#jPanelMenu-menu').removeClass('sf-menu');
		$('#jPanelMenu-menu li ul').removeAttr('style');

	});

/* Mobile Search
================================================== */

	$('.search-trigger').click(function(){
		if($('#menu-search').is(":visible")){
			$('.menu-trigger,#logo').show();
			$('#menu-search').hide();
			$('.search-trigger .icon-remove').removeClass('icon-remove').addClass('icon-search');
		} else {
			$('.menu-trigger, #logo').hide();
			$('#menu-search').show();
			$('.search-trigger .icon-search').removeClass('icon-search').addClass('icon-remove');
		}
	})

	$(window).resize(function (){
		var winWidth = $(window).width();
		if(winWidth>767) {
			jPanelMenu.close();
			$('.menu-trigger, #logo').show();
			$('#menu-search').hide();
			$('.icon-remove').removeClass('icon-remove').addClass('icon-search');
		}
	});

/* 04 Header Search
================================================== */
     var searchBtn = $('#header-search-button'),
			searchPanel = $('#header-search-panel'),
			searchP = $('#header-search'),
			searchInput = searchPanel.find('input[type="text"]'),
			searchClose = searchPanel.find('.close-search');
			
		searchBtn.click(function(e){
			e.preventDefault();
			var _t = $(this);
			if(!_t.hasClass('active')) {
				 searchPanel.fadeIn(300);
				_t.addClass('active');
				
			} else {
				_t.removeClass('active');
				searchPanel.fadeOut(300);
			}
			
	 }); // searchBtn.click //
		
	 searchClose.click(function(){
			searchBtn.removeClass('active');
			searchPanel.fadeOut(300);
			
	});
	 
	 
/* 05 Revolution Slider
================================================== */
	var revapi;
	    revapi = jQuery('.tp-banner').revolution(
		{
			 delay:9000,
			 startwidth:1170,
			 startheight:500,
			 hideThumbs:10,
			 fullWidth:"on"
		});


/* 06 Flexslider
================================================== */

	$(window).load(function() {
	  $('.flexslider').flexslider({
		animation: "fade",
		controlNav: false,
		animationSpeed: 400,
		smoothHeight: true,              //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
        directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
        prevText: "",           //String: Set the text for the "previous" directionNav item
        nextText: "",     
		
	  });
	});

	$(window).load(function() {
	  $('.flexslider-blog').flexslider({
		animation: "fade",
		controlNav: true,
		directionNav: false,
		animationSpeed: 400,
		smoothHeight: true
		
		
		
	  });
	});
$(window).load(function() {
	  $('.testimonial-home').flexslider({
		animation: "slide",
		controlNav: true,
		directionNav: false,
		animationSpeed: 400,
		smoothHeight: true
		
		
		
	  });
	});
$(window).load(function() {
	  $('.flexslider-banner').flexslider({
		animation: "fade",
		controlNav: false,
		directionNav: false,
		animationSpeed: 400,
		smoothHeight: true
		
		
		
	  });
	});
/* 07 Team Image Overlay
================================================== */
    $('.team, .team-alt').on('mouseover', function()
    {
        var overlay = $(this).find('.overlay-wrp');
        var content = $(this).find('.overlay-content');
        var top = parseInt(overlay.height() * 0.5 - 4);

        overlay.stop(true,true).fadeIn(300);
        content.stop().animate({'top': top}, 400);
        
    }).on('mouseleave', function()
    {
        var overlay = $(this).find('.overlay-wrp');
        var content = $(this).find('.overlay-content');
        var top = parseInt(overlay.height() * 0.2);
        
        content.stop().animate({'top': top}, 100);
        overlay.fadeOut(200);
    });
    

/* 08 ShowBiz Carousel
================================================== */

	function is_mobile() {
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry','Android', 'webos', ,'iPod', 'iPhone', 'iPad', 'Blackberry', 'BlackBerry'];
		var ismobile=false;
		for(i in agents) {
			if (navigator.userAgent.split(agents[i]).length>1)
			ismobile = true;
		}
		return ismobile;
	}

	jQuery('#recent-work').showbizpro({
		dragAndScroll: (is_mobile() ? "on" : "off"),
		visibleElementsArray:[6,4,3,1],
		carousel:"on",
		entrySizeOffset:1,
		allEntryAtOnce:"off"
	});
	

	jQuery('#our-clients').showbizpro({
		dragAndScroll:"off",
		visibleElementsArray:[4,7,5,1],
		carousel:"off",
		entrySizeOffset:0,
		allEntryAtOnce:"off"
	});

	jQuery('#testimonials').showbizpro({
		dragAndScroll:"off",
		visibleElementsArray:[1,1,1,1],
		carousel:"off",
		entrySizeOffset:0,
		allEntryAtOnce:"off"
	});

	jQuery('#happy-clients').showbizpro({
		dragAndScroll:"off",
		visibleElementsArray:[1,1,1,1],
		carousel:"off",
		entrySizeOffset:0,
		allEntryAtOnce:"off",
		speed:1000,
		autoPlay:"on",
		rewindFromEnd:"on",
		delay:8000
	});

	jQuery('#team-members').showbizpro({
		dragAndScroll:"off",
		visibleElementsArray:[4,4,3,1],
		carousel:"off",
		entrySizeOffset:4,
		allEntryAtOnce:"off"
	});

	jQuery('#recent-blog').showbizpro({
		dragAndScroll: (is_mobile() ? "on" : "off"),
		visibleElementsArray:[2,2,1,1],
		carousel:"on",
		entrySizeOffset:0,
		allEntryAtOnce:"off"
	});

/* 09 Hover Overlay
================================================== */

	$(".media").hover(function () {
		$(this).find(".hovercover").stop().fadeTo(200, 1);
		$(this).find(".hovericon").stop().animate({'top' : '50%', 'opacity' : 1}, 250, 'easeOutBack');
	},function () {
		$(this).find(".hovercover").stop().fadeTo(200, 0);
		$(this).find(".hovericon").stop().animate({'top' : '65%', 'opacity' : 0}, 150, 'easeOutSine');
	});


/* 10 ToolTip
================================================== */

	$(".tooltip.top").tipTip({
		defaultPosition: "top"
	});

	$(".tooltip.bottom").tipTip({
		defaultPosition: "bottom"
	});

	$(".tooltip.left").tipTip({
		defaultPosition: "left"
	});

	$(".tooltip.right").tipTip({
		defaultPosition: "right"
	});


/* 11 Isotope Portfolio Filter
================================================== */
 $(window).load(function() {
  // custom masonry type gallery plugin
$.fn.customGallery = function(options) {
    return this.each(function() {

        var    $gridContainer    = $(this),
        padding = ($gridContainer.hasClass('portfolio-with-padding-yes') || $gridContainer.hasClass('gallery-with-padding-yes'))? 5 : 0 ;

        var getColNum = function() {
           var w = $gridContainer.width(), 
           columnNum = $gridContainer.data('columns');
           if(!columnNum){
               columnNum = 5 ;
           }
           
               if( w <= 1024 ) { columnNum = 4;}
               if( w <= 800 ) { columnNum = 3;}
               if( w <= 500 ) { columnNum = 2;}
         
         return columnNum;
        
        };
        
        var getColWidth = function() {
             var w     = $gridContainer.width(), 
             columnNum     = getColNum(), 
             colWidth     = Math.floor(w/columnNum);
            return colWidth;     
        };
        
      var setImageSize = function() {
             var colWidth = getColWidth();
               // Set width of each column
              $gridContainer.find('.gallery-item , .portfolio-item').each(function(){ 
                    var $column = $(this).find('.image'),
                    $columnphoto = $column.find('img');
                    if ($column.hasClass('large')) {
                        $columnphoto.css({
                            'width'         : ((colWidth*2) - padding ) + 'px',
                            'min-height' : ( ((colWidth*2) * 0.680 )  ) + 'px',
                           });
                      }
                      
                     else if ($column.hasClass('long')) {
                        $columnphoto.css({
                            'width'         : ((colWidth) - padding ) + 'px',
                            'min-height' : ((colWidth) *  1.37) + 'px'
                           });
                      }
                      
                     else if ($column.hasClass('wide')) {
                        $columnphoto.css({
                            'width'         : ((colWidth*2) - padding) + 'px',
                            'min-height' : (((colWidth*2)  *  0.342 ) -  padding ) + 'px'
                           });
                      }  
                      
                       else {
                        $columnphoto.css( { 
                            'width'       : ( colWidth - padding) + 'px',
                            'min-height' : ( ( colWidth * 0.685 ) -  padding + 1 ) + 'px'
                            });
                        }
                });         
          };
   
    });
}
  //portfolio and gallery masonary layout
  $('.gallery , .portfolio, .portfolio-item-alt, .portfolio-items.portfolio-style4:not(.carousel-items)').customGallery();

  
 });	

  	$(window).load(function(){
		$('#portfolio-wrapper').isotope({
			  itemSelector : '.portfolio-item',
				layoutMode : 'fitRows'
		});
		$('#filters a.selected').trigger("click");
	});
	$('#filters a').click(function(e){
		e.preventDefault();

		var selector = $(this).attr('data-option-value');
		$('#portfolio-wrapper').isotope({ filter: selector });

		$(this).parents('ul').find('a').removeClass('selected');
		$(this).addClass('selected');
	});
	

	jQuery(document).ready(function($) {
		var $Filter = $('#filters');
		var FilterTimeOut;
		$Filter.find('ul li:first').addClass('active');
		
		$Filter.hover(function(){
			clearTimeout(FilterTimeOut);
			if( $(window).width() < 959 )
			{
				return;
			}
			FilterTimeOut=setTimeout(function(){ $Filter.find('ul li:not(.active)').stop(true, true).animate({width: 'show' }, 250, 'swing'); }, 100);
		},function(){
			if( $(window).width() < 959 )
			{
				return;
			}
			clearTimeout(FilterTimeOut);
			FilterTimeOut=setTimeout(function(){ $Filter.find('ul li:not(.active)').stop(true, true).animate({width: 'show' }, 250, 'swing'); }, 100);
		});
		$(window).resize(function() {
			if( $(window).width() < 959 )
			{
				$Filter.find('ul li:not(.active)').show();
			}
			
		});
		$(window).resize();
		$Filter.find('a').click(function(){
			$Filter.find('ul li').not($(this)).removeClass('active');
			$(this).parent('li').addClass('active');
		});
	});








var isotopeBreakpoints = [
                            { min_width: 1680, columns: 5 },
                            { min_width: 1440, max_width: 1680, columns: 5 },
                            { min_width: 1024, max_width: 1440, columns: 4 },
                            { min_width: 768, max_width: 1024, columns: 3 },
                            { max_width: 768, columns: 1 }
                            
                         ];

$(document).ready(function () {
"use strict";
    var $container = $('.full-portfolio .items');

    $container.imagesLoaded(function () {
        $container.isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });
    });

    // hook to window resize to resize the portfolio items for fluidity / responsiveness
    $(window).smartresize(function() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        for ( var i = 0; i < isotopeBreakpoints.length; i++ ) {
            if (windowWidth >= isotopeBreakpoints[i].min_width || !isotopeBreakpoints[i].min_width) {
                if (windowWidth < isotopeBreakpoints[i].max_width || !isotopeBreakpoints[i].max_width) {
                    $container.find('.item').each(function() {
                        $(this).width( Math.floor( $container.width() / isotopeBreakpoints[i].columns ) );
                    });

                    break;
                }
            }
        }
    });

    $(window).trigger( 'smartresize' );


    $('.filter li a').click(function () {

        $('.filter li a').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        });

        return false;
    });
});







/* 12 Magnific Popup
================================================== */

	$(document).ready(function(){

		$('body').magnificPopup({ 
		  type: 'image',
		  delegate: 'a.mfp-gallery',
		  
		  fixedContentPos: true,
		  fixedBgPos: true,

		  overflowY: 'auto',

		  closeBtnInside: true,
		  preloader: true,

		  removalDelay: 0,
		  mainClass: 'mfp-fade',
		  
		  gallery:{enabled:true},
		  
		  callbacks: {
			buildControls: function() {
			 console.log('inside'); this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
			}
		  }
		});
		
		$('.mfp-image').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			mainClass: 'mfp-fade',
			image: {
				verticalFit: true
			}
		});
		
		$('.mfp-youtube, .mfp-vimeo, .mfp-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 0,
			preloader: false,
			fixedContentPos: false
		});

	});


/* 13 Accordion
================================================== */
	var $accor = $('.accordion');
    var $trigger,$triggerloc;

	$accor.each(function() {
		$(this).addClass('ui-accordion ui-widget ui-helper-reset');
		$(this).find('h3').addClass('ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all');
		$(this).find('div').addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
		$(this).find("div").hide().first().show();
		$(this).find("h3").first().removeClass('ui-accordion-header-active ui-state-active ui-corner-top').addClass('ui-accordion-header-active ui-state-active ui-corner-top');
		$(this).find("span").first().addClass('ui-accordion-icon-active');
	});

	var $trigger = $accor.find('h3');

	$trigger.on('click', function(e) {
		var location = $(this).parent();

	   if( $(this).next().is(':hidden') ) {
			$triggerloc = $('h3',location);
			$triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
			$triggerloc.find('span').removeClass('ui-accordion-icon-active');
			$(this).find('span').addClass('ui-accordion-icon-active');
			$(this).addClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideDown(300);
		}
		e.preventDefault();
	});

/* 14 Toggle
================================================== */

	$(".toggle-container").hide();
	$(".trigger").toggle(function(){
		$(this).addClass("active");
		}, function () {
		$(this).removeClass("active");
	});
	$(".trigger").click(function(){
		$(this).next(".toggle-container").slideToggle();
	});

	$(".trigger.opened").toggle(function(){
		$(this).removeClass("active");
		}, function () {
		$(this).addClass("active");
	});

	$(".trigger.opened").addClass("active").next(".toggle-container").show();
	
/* 15 Tabs
================================================== */

	var $tabsNav    = $('.tabs-nav'),
		$tabsNavLis = $tabsNav.children('li'),
		$tabContent = $('.tab-content');

	$tabsNav.each(function() {
		var $this = $(this);

		$this.next().children('.tab-content').stop(true,true).hide()
		.first().show();

		$this.children('li').first().addClass('active').stop(true,true).show();
	});

	$tabsNavLis.on('click', function(e) {
		var $this = $(this);

		$this.siblings().removeClass('active').end()
		.addClass('active');

		$this.parent().next().children('.tab-content').stop(true,true).hide()
		.siblings( $this.find('a').attr('href') ).fadeIn();

		e.preventDefault();
	});



/* 16 Skills Bar Animation
================================================== */

	$('.skill-bar li').each(function(i){
		
		$(this).appear1(function(){
			
			var percent = $(this).find('span').attr('data-width');
			
			$(this).find('span').animate({
				'width' : percent + '%'
			},1700, 'easeOutCirc',function(){
			});
			
			$(this).find('span strong').animate({
				'opacity' : 1
			},1400);	
			
			////100% progress bar 
			if(percent == '100'){
				$(this).find('span strong').addClass('full');
			}
			
		});

	});	

		

/* 17 Pie Chart
================================================== */ 
  
               
                $('.percentage-light').easyPieChart({
                    barColor: function(percent) {
                        percent /= 100;
                        return "rgb(255, 255, 255)";
                    },
                    trackColor: 'rgba(255, 255, 255, 0.2)',
                    scaleColor: false,
                    lineCap: 'butt',
                    rotate: 0,
                    lineWidth: 5,
                    animate: 6000,
                    onStep: function(value) {
                        this.$el.find('span').text(~~value);
                    }
                });

                $('.updateEasyPieChart').on('click', function(e) {
                  e.preventDefault();
                  $('.percentage, .percentage-light').each(function() {
                    $(this).data('easyPieChart').update(Math.round(100*Math.random()));
                  });
                });
          

/* 19 Flick Feeds
================================================== */

 $('.photo-stream, .grayscale').flickrfeed('52617155@N08','', {
        limit: 8,
        title: false,
        date: false
    });

/* 20 Alert Boxes
================================================== */

	$(document).ready(function(){
		$("a.close").removeAttr("href").click(function(){
			$(this).parent().fadeOut(200);
		});
	});


/* 21 Words Rotate Animation
================================================== */		
		var ut_word_rotator = function() {
                
			var ut_rotator_words = [
				'Creative Designs',
				'Professional Minds',
				'Unique Brand'
			] ,
			counter = 0;                
			
			setInterval(function() {
			$(".parallex-slider-title, .parallex-slider-title-black, .parallex-slider-title-slider").fadeOut(function(){
					$(this).html(ut_rotator_words[counter=(counter+1)%ut_rotator_words.length]).fadeIn();
				});
			}, 3000 );
		}
		
		ut_word_rotator();


var isMobile = false;

/* Mobile Detect
================================================== */

            if (navigator.userAgent.match(/Android/i) || 
                navigator.userAgent.match(/webOS/i) ||
                navigator.userAgent.match(/iPhone/i) || 
                navigator.userAgent.match(/iPad/i)|| 
                navigator.userAgent.match(/iPod/i) || 
                navigator.userAgent.match(/BlackBerry/i)) {                 
                isMobile = true;            
            }


/* 22 Content Animation
================================================== */


            if (isMobile == false) {
                $('*[data-animated]').addClass('animated');
            }
            

            function animated_contents() {
                $(".animated:appeared").each(function (i) {
                    var $this    = $(this),
                        animated = $(this).data('animated');

                    setTimeout(function () {
                        $this.addClass(animated);
                    }, 100 * i);

                    $('.progress-bar .bar').each(function (i) {
                        var pogresBar = $this.data('width');
                        $this.css({'width' : pogresBar});
                    });
                });
            }
            
            animated_contents();
            $(window).scroll(function () {
                animated_contents();
            });


/* 23 Parallax Section
================================================== */

            $(window).bind('load', function() {                           
                parallaxInit();                       
            });

            function parallaxInit() {

                if (isMobile == true  ) return false;
                $('.parallax').each(function() {
                    var paralax_id = $(this).attr('id');
                    $('#' + paralax_id).parallax("50%", 0.6);
                });
            }

            parallaxInit();


/* 24 Animated Stats Numbers
================================================== */

            function number(num, content, target, duration) {
                if (duration) {
                    var count    = 0;
                    var speed    = parseInt(duration / num);
                    var interval = setInterval(function(){
                        if(count - 1 < num) {
                            target.html(count);
                        }
                        else {
                            target.html(content);
                            clearInterval(interval);
                        }
                        count++;
                    }, speed);
                } else {
                    target.html(content);


                }
            }

            function stats(duration) {
                jQuery('.stats .num, .stats-alt .num').each(function() {
                    var container = jQuery(this);
                    var num       = container.attr('data-num');
                    var content   = container.attr('data-content');
                    number(num, content, container, duration);
                });
            }

            if (isMobile == false) {
                var $i = 1;
                $('.stats, .stats-alt').appear().on('appear', function() {
                    if ($i === 1) { stats(300); }
                    $i++;
                });
            }


/* ------------------ End Document ------------------ */
});
	


})(this.jQuery);