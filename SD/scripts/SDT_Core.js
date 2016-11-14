//==============================================//
//             Bullet & Warp Object             //
//==============================================//

function Bullet(code) {
	this.time = getValue("time", code);
	this.enemies = getValue("enemies", code);
	this.shotType = getValue("shotType", code);
	this.bulletType = getValue("bulletType", code);
	this.aim = getValue("aim", code);
	this.amount0 = getValue("amount0", code);
	this.offset0 = getValue("offset0", code);
	this.speed0 = getValue("speed0", code);
	this.angle0 = getValue("angle0", code);										//getValue OP!
	
	if(this.bulletType == "homing") {
		this.lifespan = getValue("lifespan", code);
	}
	
	if(this.shotType == "stream") {
		this.amount = getValue("amount", code);
		this.offset1 = getValue("offset1", code);
		this.speed1 = getValue("speed1", code);
		this.angle1 = getValue("angle1", code);
		this.duration = getValue("duration", code);
	}
	else if(this.shotType == "burst") {
		this.amount0 = getValue("amount0", code);
		this.speed1 = getValue("speed1", code);
	}
	else if(this.shotType == "wave") {
		this.amount0 = getValue("amount0", code);
		this.rows = getValue("rows", code);
		this.amount1 = getValue("amount1", code);
		this.offset1 = getValue("offset1", code);
		this.speed1 = getValue("speed1", code);
		this.angle1 = getValue("angle1", code);
	}
}

function Warp(code) {
	this.time = getValue("time", code);
	this.enemies = getValue("enemies", code);
	this.warpType = getValue("warpType", code);
	this.val = getValue("val", code);
}


//=============================================//
//                 Data reader                 //
//=============================================//

var SD_object = [];
var originalCode;
function readData(gadget){
	if($(".codeArea.original."+gadget).val().indexOf("<Script") != -1) {
		originalCode = $(".codeArea.original."+gadget).val().split("\n");
		
		for(var line in originalCode){
			
			if(originalCode[line].indexOf("warpType") != -1) {
				SD_object[line] = new Warp(originalCode[line]);
			} else {
				SD_object[line] = new Bullet(originalCode[line]);
			}
		}
		
		window[gadget]();
	} else {
		$(".codeArea.original."+gadget).val(
			"please enter your code before hitting the '"+$(".actionButton."+gadget).html()+"' button"
		);
		$(".redoButton."+gadget).trigger("click");
	}
}

function getValue(valueName, code) {
	var theThingIveAskedFor = code.substr(code.indexOf(valueName+"=\"")+(valueName.length+2)).replace("\"", "");
	theThingIveAskedFor = theThingIveAskedFor.split(" ")[0];
	theThingIveAskedFor = theThingIveAskedFor.split("/>")[0];
	return theThingIveAskedFor;
}