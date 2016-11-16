function push(optionButton){
	$(optionButton).css({
	"margin-top": "1%",
	"margin-left": "1%"
	});
	
	$(optionButton).mouseup(function(){
		$(optionButton).css({
		"margin-top": "0%",
		"margin-left": "0%"
		});
	});
}


function mediaButtonPress(mediaButton) {
	if (mediaButton == ".PlayPause") {
		if (PlayPauseState == 0) {
			var src = $(mediaButton).attr("src").match(/[^\.]+/) + " on.png";
			$(mediaButton).attr("src", src);
			
			$(document).mouseup(function(){
				var src = $(mediaButton).attr("src").replace("play on.png", "pause.png");
				$(mediaButton).attr("src", src);
			});
		}
		else {
			var src = $(mediaButton).attr("src").match(/[^\.]+/) + " on.png";
			$(mediaButton).attr("src", src);
			
			$(document).mouseup(function(){
				var src = $(mediaButton).attr("src").replace("pause on.png", "play.png");
				$(mediaButton).attr("src", src);
			});
		}
	}
	else {
		var src = $(mediaButton).attr("src").match(/[^\.]+/) + " on.png";
		$(mediaButton).attr("src", src);
		
		$(document).mouseup(function(){
			var src = $(mediaButton).attr("src").replace(" on.png", ".png");
			$(mediaButton).attr("src", src);
		});
	}
}

var RepeatState = 0;
var RandomState = 0;
function mediaButtonOn(mediaButton) {
	if (mediaButton == ".Repeat" && RepeatState == 0) {
		var src = $(mediaButton).attr("src").match(/[^\.]+/) + " on.png";
		$(mediaButton).attr("src", src);
		Repeat = 1;
		RepeatState = 1;
	}
	else if (mediaButton == ".Repeat" && RepeatState == 1) {
		var src = $(mediaButton).attr("src").replace(" on.png", ".png");
		$(mediaButton).attr("src", src);
		Repeat = 0;
		RepeatState = 0;
	}
	else if (mediaButton == ".Random" && RandomState == 0) {
		var src = $(mediaButton).attr("src").match(/[^\.]+/) + " on.png";
		$(mediaButton).attr("src", src);
		Random = 1;
		RandomState = 1;
	}
	else if (mediaButton == ".Random" && RandomState == 1) {
		var src = $(mediaButton).attr("src").replace(" on.png", ".png");
		$(mediaButton).attr("src", src);
		Random = 0;
		RandomState = 0;
	}
}