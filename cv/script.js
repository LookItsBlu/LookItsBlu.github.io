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
	
	
	//TIMELINE POSITION
	currentTime = new Date();
	$("#timeline").attr("data-lastDate", currentTime.getDate()+"/"+(currentTime.getMonth()+1)+"/"+currentTime.getFullYear());
	
	var firstDate = $("#timeline").attr("data-firstDate").split("/").reverse().join("");
	var lastDate = $("#timeline").attr("data-lastDate").split("/").reverse().join("");
	for(var i=0; i<$(".pin").length;i++){
		var pinDate = $(".pin:eq("+i+")").attr("data-date").split("/").reverse().join("");
		$(".pin:eq("+i+")").css("left",(((pinDate-firstDate)/(lastDate-firstDate))*100)+"%");
	}
	
	//FORMATION BAR
	for(var i=0; i<$("#formationTable tr").length;i++){
		var cell = $("#formationTable tr:eq("+i+") td:nth-child(2)");
		if(/[0-9]+%/.test(cell.html())){
			var progress = $("#formationTable tr:eq("+i+") td:nth-child(2) .formationBar");
			progress.css("width", progress.html());
			
		}
	}
	
	//INTERETS
	$("#interetsSquares").css("height", $("#interetsSquares").width()/$("#interetsSquares>div").length);
	$(window).resize(function() {
		$("#interetsSquares").css("height", $("#interetsSquares").width()/$("#interetsSquares>div").length);
	});
});
