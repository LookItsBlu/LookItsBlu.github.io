$(document).ready(function(){
  var i,j;
  for(i=0; i<$(".albumlisting").length; i++){
    $(".albumlisting:nth-child("+(i+1)+")").append("<ol class='songList'></ol>");

    for(j=0; j<SONGS[i][1].length; j++){
      $(".albumlisting:eq("+i+") .songList").append("<li>"+SONGS[i][0]+" - "+SONGS[i][1][j]+"</li>");
    }
  }
});
