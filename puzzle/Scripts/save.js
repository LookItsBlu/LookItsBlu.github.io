function createSave(){
	var piecePosX = 0;
	var piecePosY = 0;
	
	var puzzlePiecePos = new Array();
	puzzlePiecePos[0] = new Array();
	
	puzzlePiecePos[0][0] = imgSource;
	puzzlePiecePos[0][1] = Size;
	
	for(i=1; i < pieceAmount+1; i++){
		puzzlePiecePos[i] = new Array();
		puzzlePiecePos[i][0] = $(".piece:nth-child("+i+")").css("top");
		puzzlePiecePos[i][1] = $(".piece:nth-child("+i+")").css("left");
	}
	
	localStorage["PuzzleSave"] = JSON.stringify(puzzlePiecePos);
	console.log(localStorage["PuzzleSave"]);
	window.alert("Puzzle sauvegardé!");
}

function loadSave(){
	if (localStorage.getItem("PuzzleSave") === null){
		alert("aucune sauvegarde disponible");
		return 0;
	}
	else {
		var saveData = JSON.parse(localStorage["PuzzleSave"]);
	}
	
	Size = saveData[0][1];
	oldSource = imgSource;
	imgSource = saveData[0][0];
	
	changeImageSource(imgSource);
	createGrid(parseInt(Size));
	createPieces(parseInt(Size), imgSource);
	
	for(i=1; i < pieceAmount+1; i++){
		$(".piece:nth-child("+i+")").css({
			top: saveData[i][0],
			left: saveData[i][1],
		});
	}
	
	$( "#pieceAmount" ).slider({
		value: saveData[0][1],
	});
	$("#pieceAmountValue").html(saveData[0][1]*saveData[0][1]);
}

function confirmDelete(){
	
	if (localStorage.getItem("PuzzleSave") === null){
		alert("il n'y a aucune sauvegarde a effacer");
		return 0;
	}
	else {
		var confirm = window.confirm(
			"Voulez-vous vraiment effacer votre sauvegarde? \n\n info sur la sauvegarde: \n image: "+imgSource+"\n taille: "+Size+"x"+Size
		);
		
		if(confirm == true){
			localStorage.clear();
			window.alert("sauvegarde effacé!");
		}
	}
}