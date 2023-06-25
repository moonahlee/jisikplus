var w_width = 0;
var w_height = 0;

// Elements Size Control
$(document).ready(function () {
	$(window).resize(function () {
		w_height = $(window).height();
		w_width = $(window).width();
		$('.page-left').height(w_height + "px");
		$('.page-quick').height(w_height + "px");		
		$('.container').css('height', (w_height - ($('.page-head').height() + 1)) + "px"); //1 = border		
		$('.page-navigation').css('height', (w_height - ($('.sysLogo').height())) + "px");			
		$('.page-left').hasClass('leftOpen') ? $('.container').css('width', (w_width - ($('.page-left').width() + $('#privateApp').width())) + "px") : $('.container').css('width', (w_width - ($('#privateApp').width())) + "px");
		$('.page-left').hasClass('left-quick') ? $('.container').css('width', (w_width - ($('.page-left').width() + $('.page-quick').width())) + "px") : '';
		$('.page-left.left-type').hasClass('leftOpen') ? $('.all_menu_wrap').css('width', (w_width - ($('.page-left').width())) + "px") : $('.all_menu_wrap').css('width', (w_width) + "px");
		$('.all_menu_wrap').css('height', (w_height - ($('.page-head').height() + 1)) + "px");
		$('.all_menu_wrap .all_menu_box').height((w_height - ($('.page-head').height() + 195)));			
		
	});
	$(window).resize();    
});

// img src on/off Function
function onImgFnc(kind) {
	return kind.children('img').attr('src').replace('_off', '_on');
}

function offImgFnc(kind) {
	return kind.children('img').attr('src').replace('_on', '_off');
}

$(function () {
    // Favorite Menu Check
	$('.page-title i').click(function () {
		$('.page-title i').hasClass('checked') ? $('.page-title i').removeClass('checked') : $('.page-title i').addClass('checked');
	});
	
	// Favorite Menu Check
	$('.favorite i').click(function() {	
		if($(this).hasClass('active')) {			
			$(this).removeClass('active').children('img').attr('src', onImgFnc($(this)));			
		} else {			
			$(this).addClass('active').children('img').attr('src', offImgFnc($(this)));
		}		
	});		
	
	// top type Favorite Menu check
	$('.top_favorite > a').click(function() {
		if($('.page-favorite').is(':hidden')) {
			$('.page-favorite').show();
			$('.page-favorite').siblings('.page-navigation').hide();
			$('.top_favorite > a').children('img').attr('src', onImgFnc($(this)));
		} else {
			$('.page-favorite').hide();
			$('.page-favorite').siblings('.page-navigation').show();
			$('.top_favorite > a').children('img').attr('src', offImgFnc($(this)));
		}
	});
	
	// Left-Quick type favorite check
	$('.quick_box').find('.quick_favorite a').click(function() {
		if($('.pop_favorite').is(':hidden')) {
			$('.pop_favorite').show();
		} else {
			$('.pop_favorite').hide();
		}
	});	
	
	$('.pop_favorite').find('.pop_close').click(function() {    //close button click
		$('.pop_favorite').hide();
	});	
	// all menu button click
	$('#all_menu').click(function(e) {
		e.preventDefault();
		
		if($('.all_menu_wrap').is(':hidden')) {			
			$('.all_menu_wrap').show('slide', {direction: "up"}, 800);			
			$('#all_menu').children('img').attr('src', onImgFnc($(this)));
			
		} else {			
			$('.all_menu_wrap').hide('slide', {direction: "up"}, 1000);
			$('#all_menu').children('img').attr('src', offImgFnc($(this)));
		}
	});	
	//all menu close button click
	$('#all_menu_close').click(function() {    
		$('.all_menu_wrap').hide('slide', {direction: "up"}, 1000);	
		$('#all_menu').children('img').attr('src', function() {
			return $(this).attr('src').replace('_on', '_off'); 
		});
	});

    // Page-left control
	$('.leftCon').click(function () {
		if ($('.page-left').hasClass('leftOpen')) {			
			$('.page-left').animate({left: -211}, 300);
			$('.page-content,.page-head').animate({'padding-left': 0}, 300);
			$('.page-left').removeClass('leftOpen');				
			
			//right 영역 가지고 있는지 판단하여 width 계산
			if($('section').hasClass('page-right')) {
				if($('#privateApp').is(':visible')) {
					$('.container').animate({width: w_width - ($('#privateApp').width())}, 300);
				}
				
				if($('#QuickMenuBar').is(':visible')) {
					$('.container').animate({width: w_width - ($('#QuickMenuBar').width())}, 300);
				}
			} 
			
			else {				
				$('.container').animate({width: w_width}, 300);
			}			
			
			//Left type일 경우, menu icon image replace
			if($(this).hasClass('left')) {
				$('.leftCon').children('img').attr('src', offImgFnc($(this)));	
			};	
			
			//Left type을 제외한 나머지 type일 경우, menu icon 변경, content padding 계산
			if($(this).parent().hasClass('depth1_title')) {
				$(this).addClass('on');
				$('.page-left').hasClass('left-quick') ? $('.content').css('padding-left', 95+'px') : $('.content').css('padding-left', 40+'px');				
			} 
			
			//all menu width			
			$('.all_menu_wrap').animate({width: w_width}, 300);
			
		} else {	
			//Left type일 경우
			if($('.page-left').hasClass('left-type')) {				
				$('.page-left').animate({left: 0}, 300);
				$('.page-content,.page-head').animate({'padding-left': 211}, 300);
				$('.page-left').addClass('leftOpen');
			}
			//Left type 제외한, 나머지 type일 경우
			else {				
				$('.page-left').hasClass('left-quick') ? $('.page-left').animate({left: 52}, 300) : $('.page-left').animate({left: 0}, 300);
				$('.page-left').hasClass('left-quick') ? $('.page-content').animate({'padding-left': 263}, 300) : $('.page-content').animate({'padding-left': 211}, 300);
				$('.page-left').addClass('leftOpen');
			}	
			
			//right 영역 가지고 있는지 판단하여 width 계산
			if($('section').hasClass('page-right')) {
				if($('#privateApp').is(':visible')) {
					$('.container').animate({width: (w_width - ($('.page-left').width() + $('#privateApp').width()))}, 300);
				}				
				if($('#QuickMenuBar').is(':visible')) {
					$('.container').animate({width: w_width - ($('.page-left').width() + $('#QuickMenuBar').width())}, 300);
				}
			} 			
			else {
				$('.page-left').hasClass('left-quick') ? $('.container').animate({width: w_width - ($('.page-left').width() + $('.page-quick').width())}, 300) : $('.container').animate({width: w_width - ($('.page-left').width())}, 300);
				
			}		
			
			//Left type일 경우, menu icon image replace
			if($(this).hasClass('left')) {
				$('.leftCon').children('img').attr('src', onImgFnc($(this)));	
			};
			
			//Left type을 제외한 나머지 type일 경우, menu icon 변경, content padding 계산
			if($(this).parent().hasClass('depth1_title')) {
				$(this).removeClass('on');
				$('.content').css('padding-left', 20+'px');
			} 
			
			//all menu width		
			$('.all_menu_wrap').hasClass('type02') ? $('.all_menu_wrap').animate({width: w_width + 'px'}, 300) : $('.all_menu_wrap').animate({width: (w_width - ($('.page-left').width())) + 'px'}, 300);
		}
	});	
    
    // Search toggle
    $('.search-toggleBtn button').click(function () {
        $(this).parent('.search-toggleBtn').toggleClass('spread');
        $(this).parent('.search-toggleBtn').siblings('fieldset').find('.hiddenBlock').toggleClass('show');
    });
    
    // Tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
    
    // Widget toggle
    $('.widget-toggleBtn').click(function () {
        $(this).parent('.widget-header').toggleClass('fold');
        $(this).parent('.widget-header').siblings('.widget-content, .widget-footer').toggleClass('hiddenBlock');
    });

    // Checkbox check all
    $('.listTable thead th input[type="checkbox"]').click(function () {
        var chk = $(this).parents('.table').find('tbody td:first-child input[type="checkbox"]');
        this.checked ? chk.each(function () {this.checked = true;}) : chk.each(function(){ this.checked = false; });
    });

    // File attach
    $('input[type="file"]').on('change', function () {
        $('input[type="file"').parents('.inline-data').find('input[type="text"]').val(this.value.split(/(\\|\/)/g).pop());
    });
    
});

// Date & Time
$(document).ready(
	/* realtime date & time */
	function realTime() {
		 var now = new Date();
		 var year = now.getFullYear();
		 var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
		 var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();
		 var h = now.getHours() > 9 ? '' + now.getHours() : '0' + now.getHours();
		 var m = now.getMinutes() > 9 ? '' + now.getMinutes() : '0' + now.getMinutes();
		 var s = now.getSeconds() > 9 ? '' + now.getSeconds() : '0' + now.getSeconds();
	
		 // print
		 var date = $('#nowDate');
		 var clock = $('#nowTime');
		 date.html(year + '.' + mon +'.' + day);
		 clock.html(h +':'+ m + ':' + s);
		 
		 // update period(0.5s)
		 setTimeout( function() { realTime() }, 500 );
	}
);

$(document).ready(
    function () {
        /* Left Navigation */
		$('#leftNav [data-accordion]').accordion();
    }
);

// Tree toggle all
function toggleTree(em, id) {
    var tree = id;
    $(tree).toggleClass('openedAll');
    if($(tree).hasClass('openedAll')) {
        $(tree).jstree('open_all');
        $(em).html('- All');
    } else {
        $(tree).jstree('close_all');
        $(em).html('+ All');
    };
}

//Accordion Current Page Recognition
$(function () {
	$(".finalDepth a").click(function() {
		var idx = $(".finalDepth a").index(this);
		
		$(".finalDepth a").removeClass("currentPage");
		$(this).addClass("currentPage");

	});
});











