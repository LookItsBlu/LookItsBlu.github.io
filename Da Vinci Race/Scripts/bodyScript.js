var mediaPlayerOut = 1;
NomEquipe1 = "College Republique";
NomEquipe2 = "College Martin Luther King";

initVisualizer();

/*==================================*/
/*           Tab Display            */
/*==================================*/

//Menu display on hover
var menuTimeout;
$('#mainMenu').bind('mouseover', function() {
	clearTimeout(menuTimeout);
	menuTimeout = null;
	showMenu();
});
$('#mainMenu').bind('mouseout', function() { menuTimeout = setTimeout(hideMenu, 300); });

function showMenu() { $('#mainMenu').animate({ right: "0" }, { duration: 300 }, { specialEasing: { right: "easeOut" } }); }
function hideMenu() { $('#mainMenu').animate({ right: "-105px" }, { duration: 300 }, { specialEasing: { right: "easeOut" } }); }

//option to hide the media player
$("#DVRmediaPlayer").on("click", "#mediaHide", function(){
	optionPanelOut = 1;
	$("#mediaOptions").trigger("click");
	
	$("#mediaPlayer").animate(
	{ bottom: "-30%" }, {
	duration: 500,
	complete: function () {
		$("#smallMediaPlayer").animate( { bottom: 0 }, 250);
	}
	});

	mediaPlayerOut = 0;
});
$("#DVRmediaPlayer").on("click", "#smallMediaPlayer", function(){
	$("#smallMediaPlayer").animate(
	{ bottom: "-9%" }, {
	duration: 250,
	complete: function () {
		$("#mediaPlayer").animate( { bottom: 0 }, 500); }
	});
	
	mediaPlayerOut = 1;
});


var helpPanelOut = 0;
$("#helpMenu").on("click", "#help", function(){
	if (helpPanelOut == 0) {
		$("#helpTab").css("display", "inherit").animate({ bottom: "10px", opacity : "1" }, 250);
		helpPanelOut = 1;
	}
	else {
		$("#helpTab").animate({ bottom: "80px", opacity : "0" }, 250,
		function(){ $(this).css("display", "none") });
		helpPanelOut = 0;
	}
});

/*==================================*/
/*           Chronometre            */
/*==================================*/

//display the page on click
var chronoPanelOut = 0;
$("#mainMenu").on("click", ".chronometre", function(){
	if (chronoPanelOut == 0) {
		if (teamPanelOut == 1){
			teamPanelOut = 0;
			$("#DVREquipe").animate({ left: "10%", opacity: 0 }, 250,
			function(){ $(this).css("display", "none") });
		}
		
		chronoPanelOut = 1;
		$("#DVRChrono").css("display", "inherit").animate({ left: 0, opacity: 1 }, 250);
		TeamName(NomEquipe1, NomEquipe2);
	}
	else {
		chronoPanelOut = 0;
		$("#DVRChrono").animate({ left: "10%", opacity: 0 }, 250,
		function(){ $(this).css("display", "none") });
	}
});

//display team name
function TeamName(NomEquipe1, NomEquipe2) {
	if ( NomEquipe1 == "" ) { NomEquipe1 = "MissingNo."; }
	if ( NomEquipe2 == "" ) { NomEquipe2 = "MissingNo."; }
	
	$("#nomEquipe1 span").html(NomEquipe1);
	$("#nomEquipe2 span").html(NomEquipe2);
	
	$("#nomEquipe1").textfill();
	$("#nomEquipe2").textfill();
}



/*==================================*/
/*             Equipes              */
/*==================================*/

//display the page on click
var teamPanelOut = 0;
$("#mainMenu").on("click", ".equipe", function(){
	if (teamPanelOut == 0) {
		if (chronoPanelOut == 1){
			chronoPanelOut = 0;
			$("#DVRChrono").animate({ left: "10%", opacity: 0 }, 250,
			function(){ $(this).css("display", "none") });
		}
		
		teamPanelOut = 1;
		$("#DVREquipe").css("display", "inherit").animate({ left: 0, opacity: 1 }, 250);
	}
	else {
		teamPanelOut = 0;
		$("#DVREquipe").animate({ left: "10%", opacity: 0 }, 250,
		function(){ $(this).css("display", "none") });
	}
});



/*==================================*/
/*          Miscellaneous           */
/*==================================*/

$("#fullscreen").on("click", function(){
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
	if (document.documentElement.requestFullScreen) {  
	  document.documentElement.requestFullScreen();  
	} else if (document.documentElement.mozRequestFullScreen) {  
	  document.documentElement.mozRequestFullScreen();  
	} else if (document.documentElement.webkitRequestFullScreen) {  
	  document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
	}  
  }
  else {  
	if (document.cancelFullScreen) {  
	  document.cancelFullScreen();  
	} else if (document.mozCancelFullScreen) {  
	  document.mozCancelFullScreen();  
	} else if (document.webkitCancelFullScreen) {  
	  document.webkitCancelFullScreen();  
	}  
  }  
});

//tooltips
$( document ).tooltip();

$("#tweenSongsName").tooltip({ position: { at: "center", my: "center bottom-20" } });
$("#frenzyModeToggle").tooltip({ position: { at: "center", my: "center bottom-20" } });

$(".helpMP").tooltip({ position: { at: "right", my: "left-20 center+50" } });
$(".helpMM").tooltip({ position: { at: "right", my: "left-20 center+50" } });

//displays informations under the sliders
$("#tweenSongsNumber").html(tweenSongs);
$("#playbackRateNumber").html(Musique.playbackRate);

//prevents users from dragging images
$("img").bind('dragstart', function(){ return false; });