SC.initialize({
  client_id: '0d2a10fffdd0bd799408681cbddcdeba'
});

$(".mediaName").dblclick(function(){
	$(".mediaName").html("<input id='customSong' placeholder='lien soundcloud'>");
	$("#customSong").focus();
	
	$("#customSong").focusout(function(){
		$("#customSong").val("");
		$(".mediaName").html("<span></span>");
		$(".mediaName span").html(songNames[Song]);
		$(".mediaName").textfill();
	});
	
	$(document).keydown(function(e){
		if (e.which == 13 && $("#customSong").is(":focus")){
			var customSongLink = $("#customSong").val();
			
			SC.get('/resolve', { url: customSongLink }, function(sound) {
				SC.get("/tracks/" + sound.id, {}, function(sound){
					$("#Musique").attr("src", sound.uri+"/stream?client_id=0d2a10fffdd0bd799408681cbddcdeba" );
					
					$(".PlayPause").attr("src", "Resources/mediaPlayerControls/pause.png");
					PlayPauseState = 1;
					Musique.play();
					
					$(".mediaName").html("<span></span>");
					$(".mediaName span").html(sound.user.username+" - "+sound.title);
					$(".mediaName").textfill();
				});
			});
		}
	});
});