var canvas = document.getElementById('Editor')
var context = canvas.getContext('2d');

var sectionAmountWidth = 11;
var sectionAmountHeight = 10;

var gridWidth, gridHeight;
var mouseGridCoordX, mouseGridCoordY;
var platformPreviewX, platformPreviewY;

var platformTypes = ["air", "platform", "energy", "barrier", "falling", "fast"];
var platformColors = ["transparent", "#666666", "#28A1AB", "#414141", "#D5736A", "#898989", "#000000"];
var currentPlatformType = 1;

var platformInfo = new Array();

for(x=0; x < sectionAmountWidth; x++) {
    platformInfo[x] = new Array();
    
    for(y=0; y < sectionAmountHeight; y++) {
        platformInfo[x][y] = new Array();
        platformInfo[x][y][0] = "air";
    }
}

//platformInfo[x][y][0] => type
//platformInfo[x][y][1] => altitude


window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
    
    gridWidth = canvas.width / sectionAmountWidth;
    gridHeight = canvas.height / sectionAmountHeight;
}
resizeCanvas();

window.addEventListener('mousemove', function moveOnGrid(e) {
    var mouseX, mouseY;
    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    
    for(x=0; x < sectionAmountWidth; x++) {
        for(y=0; y < sectionAmountHeight; y++) {
            var caseWidthStart = x * gridWidth;
            var caseWidthEnd = caseWidthStart + gridWidth;
            var caseHeightStart = y * gridHeight;
            var caseHeightEnd = caseHeightStart + gridHeight;
            
            if(caseWidthStart <= mouseX && mouseX <= caseWidthEnd) {
                if(caseHeightStart <= mouseY && mouseY <= caseHeightEnd) {
                    console.log("mouse found! it is in the grid x="+x+" y="+y);
                    mouseGridCoordX = x;
                    mouseGridCoordY = y;
                    break;
                }
            }
        }
    }
});

window.addEventListener('mousewheel', function changePlatform(e) {
    //currentPlatformType
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if(delta == 1){
        if(currentPlatformType == platformTypes.length-1) {
            currentPlatformType = 0;
        }
        else {
            currentPlatformType++;
        }
    }
    else {
        if(currentPlatformType == 0) {
            currentPlatformType = platformTypes.length-1;
        }
        else {
            currentPlatformType--;
        }
    }
});

window.addEventListener('click', placePlatform, false);
function placePlatform() {
    platformInfo[mouseGridCoordX][mouseGridCoordY][0] = platformTypes[currentPlatformType];
}



function Update() {
    window.requestAnimationFrame(Update);
    
    platformPreviewX = mouseGridCoordX * gridWidth;
    platformPreviewY = mouseGridCoordY * gridHeight;
    
    Draw();
}


function Draw() {
    context.fillStyle = "#EBEBEB";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    for(x=0; x < sectionAmountWidth; x++) {
        for(y=0; y < sectionAmountHeight; y++) {
            switch (platformInfo[x][y][0]) {
                case "air":
                    context.fillStyle = platformColors[0];
                    break;
                case "platform":
                    context.fillStyle = platformColors[1];
                    break;
                case "energy":
                    context.fillStyle = platformColors[2];
                    break;
                case "barrier":
                    context.fillStyle = platformColors[3];
                    break;
                case "falling":
                    context.fillStyle = platformColors[4];
                    break;
                case "fast":
                    context.fillStyle = platformColors[5];
                    break;
                default:
                    context.fillStyle = platformColors[6];
                    break;
            }
            context.fillRect(x * gridWidth, y * gridHeight, gridWidth, gridHeight);
        }
    }
    
    context.fillStyle = platformColors[currentPlatformType];
    context.fillRect(platformPreviewX, platformPreviewY, gridWidth, gridHeight);
    
    context.font = "bold 24px Arial";
    context.fillText(platformTypes[currentPlatformType], 10, 25);
    context.strokeText(platformTypes[currentPlatformType], 10, 25);
}

Update();