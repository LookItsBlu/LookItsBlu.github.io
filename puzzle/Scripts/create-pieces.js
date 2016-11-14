function createPieces(val, imgSource){
	var pieceBGX = 0;
	var pieceBGY = 0;
	var piece = "<div class='piece'></div>";
	var pieceimg = "";
	var pieceposX = "0%";
	var pieceposY = "0%";
	var containerWidth = parseInt($("#puzzlePieces").css("width"));
	var containerHeight = parseInt($("#puzzlePieces").css("height"));
	
	var pieceSize = 500/val;
	
	$( ".piece" ).remove();
	
	
	for(i=1; i < pieceAmount+1; i++){
		$("#puzzlePieces").append(piece);
		
		pieceimgPositionX = -pieceBGX * pieceSize;
		pieceimgPositionY = -pieceBGY * pieceSize;
		
		pieceBGX++;
		if (pieceBGX > val-1){
			pieceBGX = 0;
			pieceBGY++;
		}
		
		if (imgSource.indexOf('.png') !== -1 || imgSource.indexOf('.jpg') !== -1 || imgSource.indexOf('.gif') !== -1){
			pieceimg = "<img src='" +imgSource+ "'></img>";
		}
		
		else if (imgSource.indexOf('.avi') !== -1 || imgSource.indexOf('.ogg') !== -1
		|| imgSource.indexOf('.mp3') !== -1 || imgSource.indexOf('.mp4') !== -1 || imgSource.indexOf('.webm') !== -1){
			pieceimg = "<video autoplay loop muted><source src='" +imgSource+ "'></source></video>";
		}
			
		$(".piece:nth-child("+i+")").append(pieceimg);
		
		pieceposX = Math.floor(Math.random()*(containerHeight - pieceSize)) + "px";
		pieceposY = Math.floor(Math.random()*(containerWidth - pieceSize)) + "px";
		
		$(".piece:nth-child("+i+")").css({
			top: pieceposX,
			left: pieceposY,
			width: pieceSize,
			height: pieceSize
		});
		
		$(".piece:nth-child("+i+") img").css({
			marginLeft: pieceimgPositionX,
			marginTop: pieceimgPositionY
		});
		$(".piece:nth-child("+i+") video").css({
			marginLeft: pieceimgPositionX,
			marginTop: pieceimgPositionY
		});
	};
	$( ".piece" ).draggable({ snap: "#puzzleContainer tr td" });
}