var UI = {

	screen: {
		width: '',
		height: '',

		set: function(){
			this.width = $(window).width();
			this.height = $(window).height();
		}
	},

	nav: {
		element: '',
		trigger: '',		

		set: function(element, trigger){
			this.element = element;
			this.trigger = trigger;
		},

		state: function(){
			if($(this.element).hasClass('active')){
				return true;
			}else{
				return false;
			}
		},

		enable: function(){
			$(this.element).addClass('active');
			$(this.trigger).addClass('active');
		},

		disable: function(){
			$(this.element).removeClass('active');
			$(this.trigger).removeClass('active');
		}		
	},

	scroll: {
		trigger: '',

		set: function(trigger){			
			this.trigger = trigger;
		},

		scroll: function(anchor){
			var hash = $(anchor.hash);	
			$('html, body').animate({
				scrollTop: hash.offset().top
			}, 600);
		}
	},

	preloader: {
		element: '',

		set: function(element){			
			this.element = element;
		},

		init: function(){
			$('body').waitForImages({waitForAll: true}).progress(function(loaded, count, success) {
				if(loaded == (count-1)){					
					$(UI.preloader.element).fadeOut();
				}
			});
		}
	},

	flowtype: {
		init: function(){

			$('.inicio').flowtype({		
				maximum : 1400,
				fontRatio : 115,
				minFont: 8
			});

			$('.vantagens').flowtype({		
				maximum : 1400,
				fontRatio : 115,
				minFont: 8
			});

			$('footer').flowtype({		
				maximum : 1400,
				fontRatio : 115,
				minFont: 9
			});
			
		}
	}

}


$(document).ready(function(){
	
	var preloader_element = '.loading';
	var nav_element = 'nav';
	var nav_trigger = '.nav-button';
	var scroll_trigger = '.smooth-scroll';

	UI.preloader.set(preloader_element);
	UI.preloader.init();

	UI.nav.set(nav_element, nav_trigger);
	$(UI.nav.trigger).on('click', function(event){
		event.preventDefault();
		if(UI.nav.state()){
			UI.nav.disable();
			setTimeout(function(){
				$('nav').css('display', 'none');
			}, 200);
		}else{
			$('nav').css('display', 'block');
			setTimeout(function(){
				UI.nav.enable();	
			}, 200);
		}
	});

	UI.scroll.set(scroll_trigger);
	$(UI.scroll.trigger).on('click', function(event){
		event.preventDefault();
		UI.scroll.scroll(this);
		if(UI.nav.state()){
			UI.nav.disable();
		}
	});

	UI.flowtype.init();
	UI.screen.set();

	$(window).on('resize', function(){
		UI.screen.set();
	});	

	$('.ios-click').on('click', function(){
		$(this).addClass('ios-active');
	}).on('mouseleave', function(){
		$(this).removeClass('ios-active');
	});

	/*
	var sobrePosition = $('body').offset();
	var lastScrollTop = 0;
	$(window).scroll(function(event){	
		var st = $(this).scrollTop();

		if($(window).scrollTop() > sobrePosition.top && $(window).scrollTop() > 40){

			$('header').removeClass('margin-top');

			if(st > lastScrollTop){
				$('header').removeClass('fixed');
				//$('header').addClass('margin-top');
			}else{
				$('header').addClass('fixed');
				$('header').removeClass('margin-top');
			}
			lastScrollTop = st;
		}else{
			$('header').removeClass('fixed');
			$('header').addClass('margin-top');
		}
	});
	*/

	var index = 1;
	
	$('.tab-nav-item').on('click', function(event){
		event.preventDefault();

		var click_index = $(this).attr('id').replace('tab-nav-','');

		$('.tab-content-item').removeClass('tab-content-active');
		$('.tab-content-'+click_index).addClass('tab-content-active');

		$('.tab-nav-item').parent().removeClass('active');
		$(this).parent().addClass('active');

		index = click_index;
	});

	$('#tab-nav-prev').on('click', function(event){
		event.preventDefault();

		index--;

		if(index == 0){
			index = 5;
		}else if(index == 6){
			index = 1;
		}

		$('.tab-content-item').removeClass('tab-content-active');
		$('.tab-content-'+index).addClass('tab-content-active');

		$('.tab-nav-item').parent().removeClass('active');
		$('#tab-nav-'+index).parent().addClass('active');
	});

	$('#tab-nav-next').on('click', function(event){
		event.preventDefault();

		index++;

		if(index == 0){
			index = 5;
		}else if(index == 6){
			index = 1;
		}

		$('.tab-content-item').removeClass('tab-content-active');
		$('.tab-content-'+index).addClass('tab-content-active');

		$('.tab-nav-item').parent().removeClass('active');
		$('#tab-nav-'+index).parent().addClass('active');
	});


});