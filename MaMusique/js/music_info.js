$(document).ready(function(){
    var url = "";
    var currentAlbum;
    var SongIndex = 0;
    var songTotal = 0;
    var tweenSongs = 0;
    var songList = [];
    var songListNumber = 0;
    var PlayPauseState = 0;

    //Media Player Initialize & Misc. functions
    function updateSong() {
        $("#Musique").html("");

        url = "Musiques/"+ SONGS[currentAlbum][0] +"/"+ SONGS[currentAlbum][1][SongIndex] +".mp3";
        $("#Musique").attr("src", url);
        $(".mediaName span").html(SONGS[currentAlbum][0]+" // "+SONGS[currentAlbum][1][SongIndex]);

        $(".songList li").css("color", "#000");
        $(".albumlisting:eq("+currentAlbum+") .songList li:eq("+SongIndex+")").css("color", "#1ad445");

        songTotal = SONGS[currentAlbum][1].length-1;
    }

    function changeAlbum(clickedElem){
      $(".albumlisting:eq("+currentAlbum+") .songList li").css("color", "#000"); //removes the color of the songList
      $(".playBtnON").click();  //simulates a click on the current album's play button to stop the album
      currentAlbum=$(".playBtn").index(clickedElem);  //change album ID to the current album
      PlayPauseState=0;  //reset play/pause state to count this click as a "play" click
      SongIndex=0;  //start at first song
      updateSong(); //update song url and name
    }

    //Play/Pause
    $(".playBtn").on("click", function (){
        if(currentAlbum != undefined && $(".playBtn").index(this) != currentAlbum){
            changeAlbum(this);  //if an album is playing AND the selected album is not the one playing, change it
        }

        if (PlayPauseState == 0) {
            PlayPauseState = 1;
            $(this).addClass("playBtnON");

            if(currentAlbum == undefined){
                currentAlbum=$(".playBtn").index(this);
                updateSong();
            } else {
                currentAlbum=$(".playBtn").index(this);
                //no need to update the song again, as it's already loaded (this also prevents the music from restarting from the start)
            }

            $("#Musique").get(0).play();
            visualizerStart();
            updateTimeline();
        }
        else {
            $(this).removeClass("playBtnON");
            $("#Musique").get(0).pause();
            PlayPauseState = 0;
        }
    });

    //Volume Slider
    /*
    $(".mediaVolume").slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 100,
        value: 50,
        step: 2,
        animate: true,
        slide: function (event, ui) {
            $("#Musique").get(0).volume = ui.value / 100;
        }
    });

    $(".mediaVolume .ui-slider-handle").dblclick(function(){
        $(".mediaVolume").slider({ value: 50 });
        $("#Musique").get(0).volume = 0.5;
    });
    */

    //TimeLine
    //$("#Musique").bind("timeupdate", function (){
    function updateTimeline(){
        var mediaTime = 0;
        if ($("#Musique").get(0).currentTime > 0) {
            mediaTime = (100 / $("#Musique").get(0).duration) * $("#Musique").get(0).currentTime;
        }
        $(".mediaTimelineInner").css("width", mediaTime + "%");

        //TIME DISPLAY
        /*
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
        $(".mediaCurrentTime").html(currentTime);
        $(".mediaTotalTime").html(totalTime);
        $(".mediaTime").html(currentTime+ " / " +totalTime);
        */

        window.requestAnimationFrame(updateTimeline);
    }
    //});

    $(".mediaTimelineOuter").click(function(e){
        var clickPos = (e.pageX) - this.offsetLeft;
        var maxWidth = $(this).width();
        var percentage = clickPos / maxWidth * 100;
        $(".mediaTimelineInner").css("width", percentage + "%");
        $("#Musique").get(0).currentTime = (percentage * $("#Musique").get(0).duration)/100;
    });
    $(".mediaTimelineOuter").mousedown(function(e){
        //$(".mediaTimelineOuter").animate({paddingTop: "10px"}, 200);
        $("body").css("user-select", "none");
        $("html").mousemove(function(e){
            var clickPos = (e.pageX + 1) - this.offsetLeft;
            var maxWidth = $(this).width();
            var percentage = clickPos / maxWidth * 100;
            $(".mediaTimelineInner").css("width", percentage + "%");
            $(".mediaTimelineInnerSmall").css("width", percentage + "%");
            $("#Musique").get(0).currentTime = (percentage * $("#Musique").get(0).duration)/100;
        });
    });
    $(document).mouseup(function(){  $("html").off("mousemove");  });

    //AutoPlay Next Track
    $("#Musique").bind("ended", function (){
        //Play random track
        if(SongIndex==songTotal) {
            $(".playBtnON").click();
            $("#Musique").stop();
            SongIndex=0;
            updateSong();
        } else {
            SongIndex++;
            updateSong();
            $("#Musique").get(0).play();
        }
    });


    $(".songList li").click(function(){
      if(currentAlbum != undefined && $(".songList").index($(this).parent()) != currentAlbum){
          changeAlbum($(this).parent().parent().find(".playBtn"));
          //if an album is playing AND the selected song is not from the one playing, change it
      }
      currentAlbum=$(".songList").index($(this).parent());
      SongIndex=$(".songList:eq("+currentAlbum+") li").index(this);

      updateSong();
      visualizerStart();
      $(this).parent().parent().find(".playBtn").click();
      $("#Musique").get(0).play();
    });


    $(".arrowCenter").click(function(){
      if($(this).find(".arrow").hasClass("previous")){
        if(currentAlbum != undefined && $(".arrow.previous").index($(this).find(".arrow")) != currentAlbum){
          changeAlbum($(this).parent().find(".playBtn"));
          //if an album is playing AND the selected song is not from the one playing, change it
        } else {
          SongIndex==0 ? SongIndex=songTotal : SongIndex--;
          currentAlbum=$(".arrow.previous").index($(this).find(".arrow"));
        }

        updateSong();
        visualizerStart();
        $(this).parent().find(".playBtn").click();
        $("#Musique").get(0).play();
      }
      if($(this).find(".arrow").hasClass("next")){
        if(currentAlbum != undefined && $(".arrow.next").index($(this).find(".arrow")) != currentAlbum){
          changeAlbum($(this).parent().find(".playBtn"));
          //if an album is playing AND the selected song is not from the one playing, change it
        } else {
          SongIndex==songTotal ? SongIndex=0 : SongIndex++;
          currentAlbum=$(".arrow.next").index($(this).find(".arrow"));
        }

        updateSong();
        visualizerStart();
        $(this).parent().find(".playBtn").click();
        $("#Musique").get(0).play();
      }
    });


    //Launch Media Player Initialisation
    $("#Musique").get(0).volume = 0.5;
});
