$(document).ready(function() {
	var scrollPos=0;
	//ARROW POSITION
	$('.pageDiv').height(document.body.clientHeight);
	$('.pageDiv').width(document.body.clientWidth);
	$(window).resize(function() {
		$('.pageDiv').height(document.body.clientHeight);
		$('.pageDiv').width(document.body.clientWidth);
	});
	
	$(document).on('scroll', function() {
		//ARROW OPACITY
		$(".pageDiv").css("opacity",(200-($(document).scrollTop()*1.5))/100);
		
		scrollPos=$(document).scrollTop();
	});
	
	//TOP LINKS
	$('.topLink').on('click', function() {
		var page = $(this).attr('href');
		var speed = 750;
		$('html, body').animate( { scrollTop: $(page).offset().top - $(".top").outerHeight() }, speed );
		return false;
	});
});
