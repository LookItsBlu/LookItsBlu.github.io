//=============================================//
//                   Buttons                   //
//=============================================//

var gadgetPadding = parseInt($("#Reverse").css("padding-bottom"));
var gadgetMenuDivHeight = parseInt($(".menu").css("height")) + gadgetPadding;
var gadgetResultDivHeight = parseInt($(".result").css("height")) + gadgetPadding;
var defaultMargin = parseInt($("#Reverse").css("margin-bottom"));

var gadgetUsed;
$(".actionButton").click(function(){
	gadgetUsed=$(this).closest("div").parent();
	
	if(parseInt(gadgetUsed.css("height"))>0) {
		gadgetMenuDivHeight = parseInt($("#"+gadgetUsed.attr("id")+" .menu").css("height")) + gadgetPadding;
		gadgetResultDivHeight = parseInt($("#"+gadgetUsed.attr("id")+" .result").css("height")) + gadgetPadding;
	}
	
	gadgetUsed.animate({
		height: "0px",
		marginBottom: gadgetMenuDivHeight+defaultMargin
	}, 500, function() {
		readData(gadgetUsed.attr("id"));
		$(gadgetUsed.children()[0]).css("display", "none");
		$(gadgetUsed.children()[1]).css("display", "block");
		
		gadgetUsed.animate({
			height: gadgetResultDivHeight + "px",
			marginBottom: defaultMargin + "px"
		}, 500);
	});
});

$(".redoButton").click(function(){
	gadgetUsed=$(this).closest("div").parent();
	
	gadgetUsed.animate({
		height: "0px",
		marginBottom: gadgetResultDivHeight+defaultMargin
	}, 500, function() {
		$(gadgetUsed.children()[1]).css("display", "none");
		$(gadgetUsed.children()[0]).css("display", "block");
		
		gadgetUsed.animate({
			height: gadgetMenuDivHeight + "px",
			marginBottom: defaultMargin + "px"
		}, 500);
	});
});