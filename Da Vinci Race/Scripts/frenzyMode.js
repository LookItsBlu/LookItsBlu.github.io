/*==========================================*/
/*            frenzy mode button            */
/*==========================================*/

var timerId = 0;
$("#frenzyModeToggle").on("click", function(){
	if (frenzyMode == 0) {
		$(this).css("background", "#1a1a1a")
		$("#frenzyModeBottom").css("width", "100%")
		
		$("#visualizerSensibility").slider({ value: 4 });
		$("#visualizerSensibilityNumber").html(0.6);
		analyser.smoothingTimeConstant = 0.6;
		
		frenzyMode = 1;
		timerId = window.setInterval(function(){ frenzyModeBG() }, 7500);
		frenzyModeBG()
		
		$("#tweenSongs").slider({
			max: frenzyModeSongs.length-1,
			value: Math.floor(frenzyModeSongs.length/2)
		});
		tweenSongs = Math.floor(frenzyModeSongs.length/2);
		$("#tweenSongsNumber").html(tweenSongs);
		
		frenzyModeSong()
		listSongs()
		Musique.playbackRate = audioSpeed;
		$(".PlayPause").attr("src", "Resources/mediaPlayerControls/pause.png");
		PlayPauseState = 1;
		Musique.play();
	}
	else {
		$(this).css("background", "#262626")
		$("#frenzyModeBottom").css("width", "0%")
		
		$("#visualizerSensibility").slider({ value: 2 });
		$("#visualizerSensibilityNumber").html(0.8);
		analyser.smoothingTimeConstant = 0.8;
		
		frenzyMode = 0;
		clearInterval(timerId);
		frenzyModeBG()
		
		if (Random == 0){
			$("#tweenSongs").slider({
				max: songTotal-1,
				value: Math.floor(songTotal/2)
			});
			tweenSongs = Math.floor(songTotal/2);
			$("#tweenSongsNumber").html(tweenSongs);
		}
		else {
			$("#tweenSongs").slider({
				max: (songTotal - frenzyModeSongs.length)-1,
				value: Math.floor((songTotal - frenzyModeSongs.length)/2)
			});
			tweenSongs = Math.floor((songTotal - frenzyModeSongs.length)/2);
			$("#tweenSongsNumber").html(tweenSongs);
		}
		
		randomizeTrack()
		listSongs()
		Musique.playbackRate = audioSpeed;
		Musique.play();
	}
});



/*==========================================*/
/*          frenzy mode background          */
/*==========================================*/

var duration=2.5; //in seconds
function frenzyModeBG() {
	if (frenzyMode == 1) {
			$("#BGFrenzy").css("opacity", 1);
			$("#visualizer").css("opacity", 1);
			randomRgb()
			$("#BGFrenzy").animate({ backgroundColor : frenzyModeColors[BGcolor] }, duration*1000);
			opacityStep=0;
			requestAnimationFrame(animate);
	}
	else {
		$("#BGFrenzy").css("opacity", 0);
		$("#visualizer").css("opacity", 0.1);
		ctx.fillStyle = visualizerColor;
	}
};

function randomRgb () {
	RandColor = Math.floor(Math.random() * frenzyModeColors.length);
	BGcolor = RandColor;
	Visualizercolor = RandColor;
	return frenzyModeColors[BGcolor];
}



/*==========================================*/
/*          frenzy mode visualizer          */
/*==========================================*/

var canvasTransition = document.getElementById("visualizerTransition");
var ctxTransition = canvasTransition.getContext('2d');
var opacitySteps=parseInt(60*duration);
var opacityStep=0;
function animate(time){
	if (frenzyMode == 1) {
		var opacity=100*(opacityStep/opacitySteps);
		if(opacityStep>=opacitySteps-1){ opacity=100; }

		ctxTransition.clearRect(0,0,canvas.width,canvas.height);
		
		ctxTransition.globalAlpha=(opacity)/100;
		ctxTransition.fillStyle=frenzyModeVisualizerColors[Visualizercolor];
		for (i=0; i < bars; i++) {
            bar_x = i * bar_x_spaces + 0.5;
            bar_height = -(fbcArray[i] / bar_height_sensibility);
			
			if (visualizerStyle == 1){
				//Simple
				ctxTransition.fillRect(bar_x, canvas.height, bar_width, bar_height);
				$("#visualizerStyleType").html("Simple");
			}
			else if (visualizerStyle == 2) {
				//Reflection
				ctxTransition.fillRect(bar_x, canvas.height/2, bar_width, bar_height/2);
				ctxTransition.fillRect(bar_x, canvas.height/2, bar_width, -bar_height/2);
				$("#visualizerStyleType").html("Reflection");
			}
			else {
				//Two-faced
				ctxTransition.fillRect(0, bar_x, -bar_height, bar_width);
				ctxTransition.fillRect(canvas.width, bar_x, bar_height, bar_width);
				$("#visualizerStyleType").html("Face to Face");
			}
		}

		ctxTransition.globalAlpha=1.00;
		if(++opacityStep>=opacitySteps-3){ ctx.fillStyle = frenzyModeVisualizerColors[Visualizercolor]; }
		if(++opacityStep>=opacitySteps){
			ctxTransition.clearRect(0,0,canvas.width,canvas.height);
			return;
		}
		
		requestAnimationFrame(animate);
	}
	else {
		ctxTransition.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = visualizerColor;
	}
}