function changeImageSource(imagesrc){
	if(imagesrc == ""){
		alert("veuillez entrer un lien");
		return 0;
	}
	
	oldSource = imgSource;
	imgSource = imagesrc;
		
	createPieces(Size, imgSource);
	
	if (imgSource.indexOf('.png') !== -1 || imgSource.indexOf('.jpg') !== -1 || imgSource.indexOf('.gif') !== -1){
		if ($("#puzzleContainer img").length == 0){
			if ($("#puzzleContainer video").length){ $("#puzzleContainer video").remove(); }
			if ($("#puzzleContainer audio").length){ $("#puzzleContainer audio").remove(); }
			
			$("#puzzleContainer").prepend("<img/>");
		}
		$("#puzzleContainer img").attr("src", imgSource);
	}
	
	else if (imgSource.indexOf('.avi') !== -1 || imgSource.indexOf('.ogg') !== -1 || 
	imgSource.indexOf('.mp4') !== -1 || imgSource.indexOf('.webm') !== -1 || 
	imgSource.indexOf('.mp3') !== -1 || imgSource.indexOf('.gifv') !== -1){
		if ($("#puzzleContainer video").length == 0){
			if ($("#puzzleContainer img").length){ $("#puzzleContainer img").remove(); }
			if ($("#puzzleContainer audio").length){ $("#puzzleContainer audio").remove(); }
			
			$("#puzzleContainer").prepend("<video autoplay loop></video>");
			$("#puzzleContainer video").append("<source></source>");
		}
		$("#puzzleContainer video source").attr("src", imgSource);
	}
	
	$(".piece").on("click", function(){
		$(".piece").css("z-index", 50);
		$(this).css("z-index", 51);
	});
	$(".piece").on("dragstart", function(){
		$(".piece").css("z-index", 50);
		$(this).css("z-index", 51);
	});
}

$("#puzzleContainer img").error(function(){
	$("#puzzleContainer img").remove();
	$("#puzzleContainer video").remove();
	
	imgSource = oldSource;
	createGrid(Size);
	createPieces(Size, imgSource);
	$("#puzzleContainer").append("<img/>");
	$("#puzzleContainer img").attr("src", imgSource);
	alert("l'image est introuvable, le lien est-il correct?");
});