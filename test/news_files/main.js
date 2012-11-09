jQuery(document).ready(function(){
	jQuery('.drop-menu').css("display","none");
	
	if( $('body').hasClass('front') ){
		 initSlideShow();
	}
});

/*
var t = setTimeout(
		function(){ $("#top").delay(2000).fadeOut(4500,'linear',function(){ },2000)});
*/

// ----------------------------------------------------------------- Front Slider


function initSlideShow(){
	var length = jQuery('.wrapSlider').children().length;
	
	jQuery('.wrapSlider').children().each(function(e){
		if(e != 0){
			jQuery(this).css('display','none');
		}
	});
	
	var nxtSlide = 1;
	RunSlideShow(nxtSlide);
}

function RunSlideShow(nxtSlide){
	var length = jQuery('.wrapSlider').children().length;
	
	//targets next slide
	nxtSlide++;
	
	//finds the id to the next slide
	if( nxtSlide > length ) nxtSlide = 1;	
	var id = "slide-"+nxtSlide; 
	
	//targets currently active slide
	currentSlide = jQuery( '.active.slider' );

	//fades out current slide and fades in the next
	$(currentSlide).delay(3500).removeClass('active').fadeOut(1000, function(){
		FadeInNextSlide(id, nxtSlide);
	});	
}

function FadeInNextSlide(id, nxtSlide){
	$("."+id).addClass('active').fadeIn(1000, function(){ RunSlideShow(nxtSlide); });
}

// ----------------------------------------------------------------- New Menu

$('nav .drop-down').live({
	mouseenter:
		function(){
			$(this).removeClass('inactive').addClass('active');
		},
	mouseleave:
		function(){
			$(this).removeClass('active').addClass('inactive');
		}
});

// ----------------------------------------------------------------- Starring System


$(".star").live({
  click: function(){
  		ToggleStars( $(this) );
  },
  mouseover: function() {
    if( $(this).hasClass('selected') ){
    	//$(this).attr('src', 'images/imgUnselectedStar.jpg');
    }else{
    	//$(this).attr('src', 'images/imgStar.jpg');
    }
  },
  mouseout: function() {
    if( $(this).hasClass('selected') ){
    	//$(this).attr('src', 'images/imgStar.jpg');
    }else{
    	//$(this).attr('src', 'images/imgUnselectedStar.jpg');
    }
  }
});

function ToggleStars(clickedStar){
	//Selecting this star and everything before it
	if( $(clickedStar).hasClass('unselected') ){
		
		TurnOnStar(clickedStar);
		
		if( $(clickedStar).hasClass('star-1') ){
			//do nothing
		}
		
		else if( $(clickedStar).hasClass('star-2') ){
			var stars = $(clickedStar).parent().children();
			
			$(stars).each(function(){
				if( $(this).hasClass('star-1')){
					TurnOnStar($(this));
				}
			});
		}
		
		else if( $(clickedStar).hasClass('star-3') ){
			var stars = $(clickedStar).parent().children();
			
			$(stars).each(function(){
				if( $(this).hasClass('star-1') || $(this).hasClass('star-2')){
					TurnOnStar($(this));
				}
			});
		}
		
		else if( $(clickedStar).hasClass('star-4') ){
			var stars = $(clickedStar).parent().children();
			
			$(stars).each(function(){
				if( $(this).hasClass('star-1') || $(this).hasClass('star-2') || $(this).hasClass('star-3')){
					TurnOnStar($(this));
				}
			});
		}
		
		else if( $(clickedStar).hasClass('star-5') ){
			var stars = $(clickedStar).parent().children();
			
			$(stars).each(function(){
				if( $(this).hasClass('star-1') || $(this).hasClass('star-2') || $(this).hasClass('star-3') || $(this).hasClass('star-4')){
					TurnOnStar($(this));
				}
			});
		}
	}
	
	//Unselecting star and everything after it
	else {
		
		TurnOffStar(clickedStar);
		
		if( $(clickedStar).hasClass('star-1') ){
			var stars = $(clickedStar).parent().children();
			
			$(stars).each(function(){
				if( $(this).hasClass('star-3') || $(this).hasClass('star-4') || $(this).hasClass('star-5') || $(this).hasClass('star-2') ){
					TurnOffStar($(this));
				}
			});
		}
		
		else if( $(clickedStar).hasClass('star-2') ){
			var stars = $(clickedStar).parent().children();
			
			$(stars).each(function(){
				if( $(this).hasClass('star-3') || $(this).hasClass('star-4') || $(this).hasClass('star-5') ){
					TurnOffStar($(this));
				}
			});
		}
		
		else if( $(clickedStar).hasClass('star-3') ){
			var stars = $(clickedStar).parent().children();
			
			$(stars).each(function(){
				if( $(this).hasClass('star-4') || $(this).hasClass('star-5')){
					TurnOffStar($(this));
				}
			});
		}
		
		else if( $(clickedStar).hasClass('star-4') ){
			var stars = $(clickedStar).parent().children();
			
			$(stars).each(function(){
				if( $(this).hasClass('star-5')){
					TurnOffStar($(this));
				}
			});
		}
		
		else if( $(clickedStar).hasClass('star-5') ){
			//do nothing
		}
		
	}
}

function TurnOffStar(star){
	$(star).removeClass('selected').addClass('unselected').attr('src', 'images/imgUnselectedStar.jpg');
}

function TurnOnStar(star){
	$(star).removeClass('unselected').addClass('selected').attr('src', 'images/imgStar.jpg');
}

// ----------------------------------------------------------------- Handle tabs

jQuery('.tab a').live("click", function(){
	jQuery('nav').find('.active').removeClass('active');
	
	
	jQuery(this).addClass('active').parent().addClass('active');
	
	if( jQuery(this).parent().hasClass('first') ){
		SwitchTabs("first");
	}
	else if( jQuery(this).parent().hasClass('second') ){
		SwitchTabs("second");
	}
	else if( jQuery(this).parent().hasClass('third') ){
		SwitchTabs("third");
	}
	else if( jQuery(this).parent().hasClass('fourth') ){
		SwitchTabs("fourth");
	}
	else if( jQuery(this).parent().hasClass('fifth') ){
		SwitchTabs("fifth");
	}
	
});

function SwitchTabs(newTab){
	switch(newTab){
		case "first":
			TurnOffTab();
			jQuery('.tab-content.first').addClass('active');
			break;
		case "second":
			TurnOffTab();
			jQuery('.tab-content.second').addClass('active');
			break;
		case "third":
			TurnOffTab();
			jQuery('.tab-content.third').addClass('active');
			break;
		case "fourth":
			TurnOffTab();
			jQuery('.tab-content.fourth').addClass('active');
			break;
		case "fifth":
			TurnOffTab();
			jQuery('.tab-content.fifth').addClass('active');
			break;
		default:break;
	}
}

function TurnOffTab(){
	jQuery('.tabbed-info .tab-content.active').removeClass('active');
}

// ----------------------------------------------------------------- Delete Placeholder Text on Focus

jQuery('input[type=search]').live("click",function(){
	jQuery(this).attr("value", "");
});

jQuery('input[type=text]').live("click",function(){
	jQuery(this).attr("value", "").html("");
	
});
	
// ----------------------------------------------------------------- Tabbed Arrow Boxes
	
jQuery(".tabArrowOpened").live("click",function(){
	jQuery(this).parent().find("p").css("display","none");
	jQuery(this).removeClass("tabArrowOpened").addClass("tabArrowClosed").attr("src","images/tabArrowClosed.png");
});

jQuery(".tabArrowClosed").live("click",function(){
	jQuery(this).parent().find("p").css("display","block");
	jQuery(this).removeClass("tabArrowClosed").addClass("tabArrowOpened").attr("src","images/tabArrowOpened.png");
});
	
	
// ----------------------------------------------------------------- Search : Tab Switching
var resultsPage = "accp";

jQuery('.search-query-tabs a').live('click',function(){
	if( jQuery(this).parent().hasClass('inactive') ){
		jQuery('.search-query-tabs .active').removeClass('active').addClass('inactive');
		jQuery(this).parent().removeClass('inactive').addClass('active');	
		
		switch(resultsPage){
			case "accp":
				resultsPage = "chest-journal";
				jQuery('.chest-journal-results-footer').css('display', 'block');
				jQuery('.accp-results-footer').css('display','none');
				jQuery('.chest-journal-results').css('display', 'block');
				jQuery('.accp-results').css('display','none');
				break;
			case "chest-journal":
				resultsPage = "accp";
				jQuery('.chest-journal-results-footer').css('display', 'none');
				jQuery('.accp-results-footer').css('display','block');
				jQuery('.chest-journal-results').css('display', 'none');
				jQuery('.accp-results').css('display','block');
				break;
		}	
	}
});

// ----------------------------------------------------------------- Search Results : See More

jQuery('.see-more').live('click',function(){
	
	if( jQuery(this).hasClass('open') ){
		jQuery(this).removeClass('open');
		jQuery(this).html('More');
		jQuery(this).parent().parent().children('.extra-filters').slideUp(100);
		//jQuery(this).parent().parent().children('.extra-filters').css('display', 'none');
	}
	else{
		jQuery(this).addClass('open');
		jQuery(this).html('Less');
		jQuery(this).parent().parent().children('.extra-filters').slideDown(100);
		//jQuery(this).parent().parent().children('.extra-filters').css('display', 'block');
	}
});


