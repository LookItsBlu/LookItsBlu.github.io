function createGrid(val){
	pieceAmount = 0;
	
	$( "#puzzleContainer table" ).remove();
	
	$("#puzzleContainer").append("<table></table>");
	for(x=1; x < val+1; x++){
		$("#puzzleContainer table").append("<tr></tr>");
		for(y=1; y < val+1; y++){
			$("#puzzleContainer table tr:nth-child("+x+")").append("<td></td>");
			pieceAmount++;
		};
	};
}