//==============================================//
//                   Reverser                   //
//==============================================//

//Gadget Description
$('#Reverse h1').attr('title', 'use this gadget to make your default patterns playable while the game is rewinding');
//Description Position
$('#Reverse h1').tooltip({ position: { at: 'center', my: 'center bottom-20' } });

//Code
var startTime, endTime, timeInterval, reversedTime;
var rewindSpeed, convertedCode;
function Reverse() {
	
	startTime = parseFloat(SD_object[0].time);
	endTime = parseFloat(SD_object[SD_object.length-1].time);
	rewindSpeed = parseFloat($(".rewindSpeed").val());
	
	$(".codeArea.final.Reverse").val("");
	
	for(var objLine in SD_object) {
		
		timeInterval = (parseFloat(SD_object[objLine].time) - startTime)/rewindSpeed
		reversedTime = +(endTime - timeInterval).toFixed(3);
		
		if(SD_object[objLine].constructor.name == 'Bullet') {
			switch(SD_object[objLine].shotType){
				case "stream":
					convertedCode = "<Script time='"+reversedTime+"' enemies='"+SD_object[objLine].enemies+"' shotType='stream' bulletType='"+
					SD_object[objLine].bulletType+"' aim='"+SD_object[objLine].aim+"' offset0='"+SD_object[objLine].offset0+"' amount0='"+
					SD_object[objLine].amount0+"' speed0='"+SD_object[objLine].speed0+"' angle0='"+SD_object[objLine].angle0+"' offset1='"+
					SD_object[objLine].offset1+"' speed1='"+SD_object[objLine].speed1+"' angle1='"+SD_object[objLine].angle1+
					"' duration='"+SD_object[objLine].duration+"'/>";
					break;
				case "burst":
					convertedCode = "<Script time='"+reversedTime+"' enemies='"+SD_object[objLine].enemies+"' shotType='burst' bulletType='"+
					SD_object[objLine].bulletType+"' rows='"+SD_object[objLine].rows+"' aim='"+SD_object[objLine].aim+"' offset0='"+SD_object[objLine].offset0+
					"' amount0='"+SD_object[objLine].amount0+"' speed0='"+SD_object[objLine].speed0+"' angle0='"+SD_object[objLine].angle0+
					"' speed1='"+SD_object[objLine].speed1+"'/>";
					break;
				case "wave":
					convertedCode = "<Script time='"+reversedTime+"' enemies='"+SD_object[objLine].enemies+"' shotType='wave' bulletType='"+
					SD_object[objLine].bulletType+"' rows='"+SD_object[objLine].rows+"' aim='"+SD_object[objLine].aim+"' offset0='"+SD_object[objLine].offset0+
					"' amount0='"+SD_object[objLine].amount0+"' speed0='"+SD_object[objLine].speed0+"' angle0='"+SD_object[objLine].angle0+"' offset1='"
					+SD_object[objLine].offset1+"' amount1='"+SD_object[objLine].amount1+"' speed1='"+SD_object[objLine].speed1+"' angle1='"+
					SD_object[objLine].angle1+"'/>";
					break;
				default:
					convertedCode = "<Script time='"+reversedTime+"' enemies='"+SD_object[objLine].enemies+"' shotType='"+SD_object[objLine].shotType+
					"' bulletType='"+SD_object[objLine].bulletType+"' rows='"+SD_object[objLine].rows+"' aim='"+SD_object[objLine].aim+"' offset0='"+
					SD_object[objLine].offset0+"' amount0='"+SD_object[objLine].amount0+"' speed0='"+SD_object[objLine].speed0+"' angle0='"+
					SD_object[objLine].angle0+"'/>";
			}
			
			if(SD_object[objLine].bulletType == "homing") {
				convertedCode = convertedCode.slice(0,convertedCode.length-2) + " lifespan='"+SD_object[objLine].lifespan+"'/>";
			}
		} else {
			alert("an error as occured when reversing:\n\nobject:\n"+JSON.stringify(SD_object[1])+"\nis a "+SD_object[objLine].constructor.name+" object, only Bullet objects are allowed in this gadget");
			
			$(".redoButton.Reverse").trigger("click");
			break;
		}
		
		$(".codeArea.final.Reverse").val(convertedCode + "\n" + $(".codeArea.final.Reverse").val());
	}
}

//==============================================//
//                 Bullet Mover                 //
//==============================================//

//Gadget Description
$('#BulletMover h1').attr('title', 'use this gadget to change the time of multiple bullets/warps at once without having to worry about your notes going on top of each other or going really far apart, even the ones that can\'t be moved in the editor (warps with high values)');
//Description Position
$('#BulletMover h1').tooltip({ position: { at: 'center', my: 'center bottom-20' } });

//Code
var addedTime;
function BulletMover() {
	addedTime = parseFloat($(".addedTime").val());
	
	$(".codeArea.final.BulletMover").val("");
	
	for(var objLine in SD_object) {
		
		var movedTime=(parseFloat(SD_object[objLine].time)+addedTime).toFixed(3);
		
		if(SD_object[objLine].constructor.name == 'Bullet') {
			switch(SD_object[objLine].shotType){
				case "stream":
					convertedCode = "<Script time='"+movedTime+"' enemies='"+SD_object[objLine].enemies+"' shotType='stream' bulletType='"+
					SD_object[objLine].bulletType+"' aim='"+SD_object[objLine].aim+"' amount='"+
					SD_object[objLine].amount+"' offset0='"+SD_object[objLine].offset0+"' speed0='"+SD_object[objLine].speed0+"' angle0='"+SD_object[objLine].angle0+"' offset1='"+
					SD_object[objLine].offset1+"' speed1='"+SD_object[objLine].speed1+"' angle1='"+SD_object[objLine].angle1+
					"' duration='"+SD_object[objLine].duration+"'/>";
					break;
				case "burst":
					convertedCode = "<Script time='"+movedTime+"' enemies='"+SD_object[objLine].enemies+"' shotType='burst' bulletType='"+
					SD_object[objLine].bulletType+"' aim='"+SD_object[objLine].aim+"' offset0='"+SD_object[objLine].offset0+
					"' amount0='"+SD_object[objLine].amount0+"' speed0='"+SD_object[objLine].speed0+"' angle0='"+SD_object[objLine].angle0+
					"' speed1='"+SD_object[objLine].speed1+"'/>";
					break;
				case "wave":
					convertedCode = "<Script time='"+movedTime+"' enemies='"+SD_object[objLine].enemies+"' shotType='wave' bulletType='"+
					SD_object[objLine].bulletType+"' rows='"+SD_object[objLine].rows+"' aim='"+SD_object[objLine].aim+"' offset0='"+SD_object[objLine].offset0+
					"' amount0='"+SD_object[objLine].amount0+"' speed0='"+SD_object[objLine].speed0+"' angle0='"+SD_object[objLine].angle0+"' offset1='"
					+SD_object[objLine].offset1+"' amount1='"+SD_object[objLine].amount1+"' speed1='"+SD_object[objLine].speed1+"' angle1='"+
					SD_object[objLine].angle1+"'/>";
					break;
				default:
					convertedCode = "<Script time='"+movedTime+"' enemies='"+SD_object[objLine].enemies+"' shotType='"+SD_object[objLine].shotType+
					"' bulletType='"+SD_object[objLine].bulletType+"' aim='"+SD_object[objLine].aim+"' offset0='"+
					SD_object[objLine].offset0+"' amount0='"+SD_object[objLine].amount0+"' speed0='"+SD_object[objLine].speed0+"' angle0='"+
					SD_object[objLine].angle0+"'/>";
			}
			
			if(SD_object[objLine].bulletType == "homing") {
				convertedCode = convertedCode.slice(0,convertedCode.length-2) + " lifespan='"+SD_object[objLine].lifespan+"'/>";
			}
		} else {
			convertedCode = "<Script time='"+movedTime+"' enemies='"+SD_object[objLine].enemies+"' warpType='"+SD_object[objLine].warpType+"' val='"+SD_object[objLine].val+"'/>";
		}
		
		$(".codeArea.final.BulletMover").val($(".codeArea.final.BulletMover").val() + convertedCode + "\n");
	}
}