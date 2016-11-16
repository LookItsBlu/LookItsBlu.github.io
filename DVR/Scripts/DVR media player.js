var url = "";
var Song = 1;
var songTotal = songNames.length - 1;
var tweenSongs = 0;
var songList = [];
var songListNumber = 1;
var PlayPauseState = 0;
var Repeat = 0;
var Random = 0;
var visualizerStyle = 2;
var frenzyMode = 0;


//Media Player Initialize & Misc. functions
function listSongs() {
	$("#Musique").html("");
	url = "Musiques/" + Song + ".mp3";
	Musique.setAttribute("src", url);
	$(".mediaName span").html(songNames[Song]);
	$(".mediaName").textfill();
	
	$(".mediaName").css("lineHeight", $(".mediaName span").css("fontSize"));
	$("#smallMediaPlayer .mediaName").css("lineHeight", $("#smallMediaPlayer .mediaName span").css("fontSize"));
	$("#mediaVolInnerSmall").css("height", (Musique.volume * 100) + "%");
}

function PlayPauseInitialize() {
	$(".PlayPause").attr("src", "Resources\\mediaPlayerControls\\play.png");
	PlayPauseState = 0;
}

function randomizeTrack() {
	var tooRecent = false;

    do {
		Song = Math.floor((Math.random() * songTotal) + 1);

		tooRecent = false;
		for (var i=0; i < tweenSongs && i < songListNumber; i++)
		{
			if (songList[songListNumber - 1 - i] == Song)
			{
				tooRecent = true;
				break;
			}
		}
		
		if (tooRecent == false && frenzyMode == 0) {
			var frenzyModeSongDetection = false;
			for (var i=0; i != frenzyModeSongs.length; i++) {
				if (frenzyModeSongs[i] == Song) {
					frenzyModeSongDetection = true;
					break;
				}
			}
		}
		
    } while (tooRecent || frenzyModeSongDetection);
	
	if (frenzyMode == 0){
		songList[songListNumber] = Song;
		songListNumber++;
		console.log(Song);
	}
}

function frenzyModeSong() {
	var frenzySong = false;

    do {
		randomizeTrack()
		
		for (var i=0; i != frenzyModeSongs.length; i++) {
			if (frenzyModeSongs[i] == Song) {
				frenzySong = true;
				break;
			}
		}
    } while (!frenzySong);
	
	songList[songListNumber] = Song;
	songListNumber++;
	console.log(Song);
}

//Media Player Controls

//Previous
$("#mediaButtons").on("click", ".Left", function (){
	Song--
	if (Song < 1) { Song = songTotal; }

	listSongs()
	Musique.playbackRate = audioSpeed;
	if (PlayPauseState == 1) {Musique.play();}
});

//Play/Pause
$("#mediaButtons").on("mousedown", ".PlayPause", function (){
	if (PlayPauseState == 0) {
		Musique.playbackRate = audioSpeed;
		Musique.play();
		PlayPauseState = 1;
	}
	else {
		Musique.pause();
		PlayPauseState = 0;
	}
});

//Stop
$("#mediaButtons").on("click", ".Stop", function (){
	Musique.pause();
	Musique.currentTime = 0;
	PlayPauseInitialize()
});

//Next
$("#mediaButtons").on("click", ".Right", function (){
	if (frenzyMode == 1) { frenzyModeSong() }
	else if (Random == 1) { randomizeTrack() }
	else {
		Song++
		if (Song > songTotal) { Song = 1; }
	}
	
	listSongs()
	Musique.playbackRate = audioSpeed;
	if (PlayPauseState == 1) {Musique.play();}
});

//Randomize
$("#mediaButtons").on("click", ".Random", function(){
	if (Random == 1){
		$("#tweenSongs").slider({
			max: (songTotal - frenzyModeSongs.length)-1,
			value: Math.floor((songTotal - frenzyModeSongs.length)/2)
		});
		tweenSongs = Math.floor((songTotal - frenzyModeSongs.length)/2);
		$("#tweenSongsNumber").html(tweenSongs);
	}
	else {
		if (frenzyMode == 1){
			$("#tweenSongs").slider({
				max: frenzyModeSongs.length-1,
				value: Math.floor(frenzyModeSongs.length/2)
			});
			tweenSongs = Math.floor(frenzyModeSongs.length/2);
			$("#tweenSongsNumber").html(tweenSongs);
		}
		else{
			$("#tweenSongs").slider({
				max: songTotal-1,
				value: Math.floor(songTotal/2)
			});
			tweenSongs = Math.floor(songTotal/2);
			$("#tweenSongsNumber").html(tweenSongs);
		}
	}
});

//Volume Slider
$("#mediaVolume").slider({
	orientation: "horizontal",
	range: "min",
	min: 0,
	max: 100,
	value: 100,
	step: 2,
	animate: true,
	slide: function (event, ui) {
		Musique.volume = ui.value / 100;
		$("#mediaVolInnerSmall").css("height", (Musique.volume * 100) + "%");
	}
});

$("#mediaVolume .ui-slider-handle").dblclick(function(){
	$("#mediaVolume").slider({ value: 100 });
	Musique.volume = 1;
	$("#mediaVolInnerSmall").css("height", (Musique.volume * 100) + "%");
});

//TimeLine
$("#Musique").bind("timeupdate", function (){
	var mediaTime = 0;
	if (Musique.currentTime > 0) {
		mediaTime = (100 / Musique.duration) * Musique.currentTime;
	}
	$("#mediaTimelineInner").css("width", mediaTime + "%");
	$("#mediaTimelineInnerSmall").css("width", mediaTime + "%");
	
	var currentTimeSeconds = "00";
	var totalTimeSeconds = "00";
	
	if (Musique.currentTime%60 < 1){ currentTimeSeconds = "00" }
	else if (Musique.currentTime%60 < 10){ currentTimeSeconds = "0" +parseInt((Musique.currentTime%60)) }
	else { currentTimeSeconds = parseInt((Musique.currentTime%60)) }
	
	if (Musique.duration%60 < 1){ totalTimeSeconds = "00" }
	else if (Musique.duration%60 < 10){ totalTimeSeconds = "0" +parseInt((Musique.duration%60)) }
	else { totalTimeSeconds = parseInt((Musique.duration%60)) }
	
	var currentTime = Math.floor(Musique.currentTime/60)+ ":" +currentTimeSeconds;
	var totalTime = Math.floor(Musique.duration/60)+ ":" +totalTimeSeconds;
	$("#mediaCurrentTime").html(currentTime);
	$("#mediaTotalTime").html(totalTime);
	$("#mediaTime").html(currentTime+ " / " +totalTime);
});

$("#mediaTimelineOuter").click(function(e){
	var clickPos = (e.pageX - 7) - this.offsetLeft;
	var maxWidth = $(this).width();
	var percentage = clickPos / maxWidth * 100;
	$("#mediaTimelineInner").css("width", percentage + "%");
	$("#mediaTimelineInnerSmall").css("width", percentage + "%");
	Musique.currentTime = (percentage * Musique.duration)/100;
});
$("#mediaTimelineOuter").mousedown(function(e){
	$("#mediaTimelineOuter").animate({paddingTop: "10px"}, 200);
		
	$("#mediaTimelineOuter").mousemove(function(e){
		var clickPos = (e.pageX - 7) - this.offsetLeft;
		var maxWidth = $(this).width();
		var percentage = clickPos / maxWidth * 100;
		$("#mediaTimelineInner").css("width", percentage + "%");
		$("#mediaTimelineInnerSmall").css("width", percentage + "%");
		Musique.currentTime = (percentage * Musique.duration)/100;	
	});
});
$(document).mouseup(function(){
	$("#mediaTimelineOuter").animate({paddingTop: "0px"}, 200);
	$("#mediaTimelineOuter").off("mousemove");
});
 
//AutoPlay Next Track
$("#Musique").bind("ended", function (){
	//Play random track
	if (frenzyMode == 1) {
		frenzyModeSong();
		listSongs()
		Musique.playbackRate = audioSpeed;
		Musique.play();
	}
	else if (Random == 1) {
		randomizeTrack()
		listSongs()
		Musique.playbackRate = audioSpeed;
		Musique.play();
	}
	else if (Repeat == 1) {
		Musique.currentTime = 0;
		Musique.playbackRate = audioSpeed;
		Musique.play();
	}
	else {
		Song++
		if (Song > songTotal) { Song = 1; }
		
		listSongs()
		Musique.playbackRate = audioSpeed;
		Musique.play();
	}
});

//Control music on key press
$(document).keydown(function (event){
	if ($("#teamName").is(":focus")) return;
	
	if (event.which == 37){
		if ($(".ui-slider-handle").is(":focus")) return;
		else {
			Musique.currentTime -= 5;
		}
	}
	else if (event.which == 39){
		if ($(".ui-slider-handle").is(":focus")) return;
		else {
			Musique.currentTime += 5;
		}
	}
	else if (event.which == 32){
		if (PlayPauseState == 0) {
			Musique.play();
			$(".PlayPause").attr("src", "Resources/mediaPlayerControls/pause.png");
			PlayPauseState = 1;
		}
		else {
			Musique.pause();
			$(".PlayPause").attr("src", "Resources/mediaPlayerControls/play.png");
			PlayPauseState = 0;
		}
	}
	else if (event.which == 27){
		$(".Stop").trigger("click");
	}
	else if (event.which == 40){
		if ($(".ui-slider-handle").is(":focus")) return;
		else {
			$(".Left").trigger("click");
		}
	}
	else if (event.which == 38){
		if ($(".ui-slider-handle").is(":focus")) return;
		else {
			$(".Right").trigger("click");
		}
	}
	else if (event.which == 226 || event.which == 60){
		if (mediaPlayerOut == 1){
			$("#mediaHide").trigger("click");
		}
		else {
			$("#smallMediaPlayer").trigger("click");
		}
	}
	else if (event.which == 109){
		if (Musique.volume > 0.1) {
			Musique.volume-=0.1;
			$("#mediaVolume").slider({ value: Musique.volume * 100 });
			$("#mediaVolInnerSmall").css("height", (Musique.volume * 100) + "%");
		}
	}
	else if (event.which == 107){
		if (Musique.volume < 1) {
			Musique.volume+=0.1;
			$("#mediaVolume").slider({ value: Musique.volume * 100 });
			$("#mediaVolInnerSmall").css("height", (Musique.volume * 100) + "%");
		}
	}
});

//Option Panel
var optionPanelOut = 0;
$("#DVRmediaPlayer").on("click", "#mediaOptions", function (){
	if (optionPanelOut == 0) {
		$("#mediaOptionPanel").css("display", "inherit").animate({
			bottom: "100px",
			opacity : "1"
		}, 250);
		optionPanelOut = 1;
	}
	else {
		$("#mediaOptionPanel").animate({
			bottom: "200px",
			opacity : "0"
		}, 250, function(){$(this).css("display", "none")});
		optionPanelOut = 0;
	}
});


$("#tweenSongs").slider({
	orientation: "horizontal",
	range: "min",
	min: 0,
	max: songTotal - 1,
	value: Math.floor(songTotal/2),
	step: 1,
	animate: true,
	slide: function (event, ui) {
		tweenSongs = ui.value;
		$("#tweenSongsNumber").html(tweenSongs);
	}
});
$("#tweenSongs .ui-slider-handle").dblclick(function(){
	if (Random == 1){
		$("#tweenSongs").slider({ value: Math.floor((songTotal - frenzyModeSongs.length)/2) });
		tweenSongs = Math.floor((songTotal - frenzyModeSongs.length)/2);
		$("#tweenSongsNumber").html(tweenSongs);
	}
	else if (frenzyMode == 1){
		$("#tweenSongs").slider({ value: Math.floor(frenzyModeSongs.length/2) });
		tweenSongs = Math.floor(frenzyModeSongs.length/2);
		$("#tweenSongsNumber").html(tweenSongs);
	}
	else {
		$("#tweenSongs").slider({ value: Math.floor(songTotal/2) });
		tweenSongs = Math.floor(songTotal/2);
		$("#tweenSongsNumber").html(tweenSongs);
	}
});

tweenSongs = Math.floor(songTotal/2);
$("#tweenSongsNumber").html(tweenSongs);


$("#visualizerStyle").slider({
	orientation: "horizontal",
	range: "min",
	min: 1,
	max: 3,
	value: 2,
	step: 1,
	animate: true,
	slide: function (event, ui) {
		visualizerStyle = ui.value;
	}
});
$("#visualizerStyle .ui-slider-handle").dblclick(function(){
	$("#visualizerStyle").slider({ value: 2 });
	visualizerStyle = 2;
	$("#visualizerStyleType").html("Simple");
});

$("#visualizerSensibility").slider({
	orientation: "horizontal",
	range: "min",
	min: 1,
	max: 10,
	value: 2,
	step: 1,
	animate: true,
	slide: function (event, ui) {
		analyser.smoothingTimeConstant = (1 - (ui.value / 10)).toPrecision(1);
		$("#visualizerSensibilityNumber").html(analyser.smoothingTimeConstant);
		if (frenzyMode == 1 && ui.value < 4) {
			$("#visualizerSensibility").slider({ value: 4 });
			$("#visualizerSensibilityNumber").html(0.6);
			analyser.smoothingTimeConstant = 0.6;
			return false;
		}
	}
});
$("#visualizerSensibility .ui-slider-handle").dblclick(function(){
	if (frenzyMode == 1) {
		$("#visualizerSensibility").slider({ value: 4 });
		analyser.smoothingTimeConstant = 0.6;
		$("#visualizerSensibilityNumber").html(analyser.smoothingTimeConstant);
	}
	else {
		$("#visualizerSensibility").slider({ value: 2 });
		analyser.smoothingTimeConstant = 0.8;
		$("#visualizerSensibilityNumber").html(analyser.smoothingTimeConstant);
	}
});

$("#visualizerFPS").slider({
	orientation: "horizontal",
	range: "min",
	min: 5,
	max: 60,
	value: 60,
	step: 1,
	animate: true,
	slide: function (event, ui) {
		fps = ui.value;
		interval = 1000/fps;
		$("#visualizerFPSNumber").html(fps+" FPS");
	}
});
$("#visualizerFPS .ui-slider-handle").dblclick(function(){
	$("#visualizerFPS").slider({ value: 60 });
	fps = 60;
	interval = 1000/fps;
	$("#visualizerFPSNumber").html(fps+" FPS");
});

var audioSpeed = 1;
$("#playbackRate").slider({
	orientation: "horizontal",
	range: "min",
	min: 0.5,
	max: 4,
	value: 1,
	step: 0.1,
	animate: true,
	slide: function (event, ui) {
		audioSpeed = ui.value;
		Musique.playbackRate = audioSpeed;
		$("#playbackRateNumber").html(Musique.playbackRate);
	}
});
$("#playbackRate .ui-slider-handle").dblclick(function(){
	$("#playbackRate").slider({ value: 1 });
	audioSpeed = 1;
	Musique.playbackRate = audioSpeed;
	$("#playbackRateNumber").html(Musique.playbackRate);
});


$("#frequency").slider({
	orientation: "horizontal",
	range: "min",
	min: 100,
	max: 20000,
	value: 15000,
	step: 100,
	animate: true,
	slide: function (event, ui) {
		biquad.frequency.value = ui.value;
		$("#frequencyNumber").html(biquad.frequency.value);
	}
});
$("#frequency .ui-slider-handle").dblclick(function(){
	$("#frequency").slider({ value: 15000 });
	biquad.frequency.value = 15000;
	$("#frequencyNumber").html(biquad.frequency.value);
});


$("#gain").slider({
	orientation: "horizontal",
	range: "min",
	min: 0,
	max: 5,
	value: 1,
	step: 0.05,
	animate: true,
	slide: function (event, ui) {
		gainNode.gain.value = ui.value;
		$("#gainNumber").html(gainNode.gain.value.toPrecision(3));
	}
});
$("#gain .ui-slider-handle").dblclick(function(){
	$("#gain").slider({ value: 1 });
	gainNode.gain.value = 1;
	$("#gainNumber").html(gainNode.gain.value.toPrecision(3));
});


//Launch Media Player Initialisation
listSongs()