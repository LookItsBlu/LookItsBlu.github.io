//Level Names
var bosonName = ["Avalon", "Boson", "Dark Boson", "The", "Marvelous", "Hyper"];
var letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var getRandomName, getRandomLetter;


//Difficulty
var defDifficultyColor = 45;
var minDifficultyColor = 45;
var maxDifficultyColor = 135;
var rgbColor;


//Leaderboard
var leaderboardSize = 100;
var maxScore = 100;
var player = ["Ian", "Mranth0ny62", "Spyro", "Sevenanth", "Furret", "Atom", "metalDrove", "N.Dromeda", "N.Lightened", "Proffessor", "Betty", "???", " _ ThatOneGuyWithAnAnnoyingUsername _ "];


//Level Object
function Level(){
    this.ID = 0;
    this.name = "Boson X";
    this.creator = "Ian";
    this.plays = 100;
    this.wins = 10;
    this.playWinRatio = this.wins/this.plays;
    
    if(this.playWinRatio>0.5)
        this.difficulty = 1%this.playWinRatio; //0.5;
    else
        this.difficulty = 2%(1+this.playWinRatio);
    
    this.leaderboard = [];
}

var levelAmount = 200;
var levels = new Array();
for (x=1; x <= levelAmount; x++) {
    levels[x] = new Level();
}



//Levels Creation
$(".levelList").css("height", $(window).height() - $(".levelList").offset().top);
$(window).resize(function(){
    $(".levelList").css("height", $(window).height() - $(".levelList").offset().top);
});
for(i=1; i <= levels.length-1; i++) {
    levels[i].ID = i;
    
    getRandomLetter = letter.charAt(Math.floor(Math.random() * letter.length));
    getRandomName = bosonName[Math.floor(Math.random() * bosonName.length)];
    levels[i].name = getRandomName+" "+getRandomLetter;
    
    levels[i].creator = player[Math.floor(Math.random() * player.length)];
    
    
    //=================================================//
    
    levels[i].plays = Math.ceil(Math.random() * 1000);
    levels[i].wins = Math.round(levels[i].plays * Math.random());
    
    levels[i].playWinRatio = levels[i].wins/levels[i].plays;
    
    if(levels[i].playWinRatio>0.5)
        levels[i].difficulty = 1%levels[i].playWinRatio; //0.5;
    else
        levels[i].difficulty = 2%(1+levels[i].playWinRatio);
    
    //=================================================//
    
    
    var maxScore = 100;
    for(place=1; place <= leaderboardSize;place++) {
        levels[i].leaderboard[place] = new Array();
        levels[i].leaderboard[place][0] = player[Math.floor(Math.random() * player.length)];
        levels[i].leaderboard[place][1] = (Math.random() * (maxScore - (100-place)) + (100-place)).toFixed(2);
        maxScore --;
    }
}

//Level list
function makeLevelList() {
    $(".levelList").html("");
    for(i=1; i <= levels.length-1; i++) {
        $(".levelList").append("<div class='level number"+i+"'><span class='levelName'></span></div>");
        $(".number"+i+" .levelName").text(levels[i].name);
        $(".number"+i).append("<span class='author'>By "+levels[i].creator+"</span>");

        difficultyColor = Math.round(levels[i].difficulty * (maxDifficultyColor - minDifficultyColor) + minDifficultyColor);
        rgbColor = "rgb("+difficultyColor+", 78, 106)";
        $(".number"+i).css("background-color", rgbColor);
    }
    
    levelClick();
}


//Level info
function levelClick() {
    $(".level").click(function(){
        levelNumber = $(this).index()+1;

        $(".level").removeClass("selected");
        $(this).addClass("selected");

        $(".menu.right").html("");
        $(".menu.right").append("<h1>"+levels[levelNumber].name+"</h1>");
        $(".menu.right").append("<span>By "+levels[levelNumber].creator+"</span>");

        $(".menu.right").append("<img src='img/Levels/level"+levelNumber+"-1.jpg' alt='level "+levelNumber+" Screenshot'/>");
        $(".menu.right img").error(function(){
            console.log("no image found");
            $(".menu.right img").remove();
            $(".menu.right").append("<img/>");
            $("img").insertAfter(".menu.right > span")
            .attr({
                src: "img/Levels/noScreenshot.png",
                alt: "no Screenshot available"
            });
        });

        $(".menu.right").append("<div class='leaderboards'></div>");
        $(".leaderboards").append("<ol></ol>");

        var maxScore = 100;
        for(i=1; i <= levels[levelNumber].leaderboard.length-1;i++) {
            $(".leaderboards ol").append("<li><span>"+levels[levelNumber].leaderboard[i][0]+"</span><div class='score'>"+levels[levelNumber].leaderboard[i][1]+"%</div></li>");
        }
    });
}


//Search System
var searchInput, levelName, authorName, diffRating, searchCut;
$(".levelSearch").bind("input", function(){
    searchInput = $(".levelSearch").val().toLowerCase();
    
    if(searchInput.indexOf("author=") >= 0 || searchInput.indexOf("creator=") >= 0) {
        searchCut = searchInput.split("=");
        
        for(i=1; i <= $(".level").size(); i++) {
            authorName = levels[i].creator.toLowerCase();
            authorName = authorName.substr(authorName.indexOf(' ')+1);
            
            if(authorName.indexOf(searchCut[1]) < 0) {
                $(".number"+i).css("display", "none");
            } else {
                $(".number"+i).css({
                    "display": "block",
                    "margin-top": "0"
                });
            }
        }
    }
    else if(searchInput.indexOf("diff") >= 0 || searchInput.indexOf("difficulty") >= 0) {
        if(searchInput.indexOf(">") >= 0) {
            searchCut = searchInput.split(">");
            
            for(i=1; i <= $(".level").size(); i++) {
                diffRating = levels[i].difficulty;
                
                if(searchCut[1] > diffRating) {
                    $(".number"+i).css("display", "none");
                } else {
                    $(".number"+i).css({
                        "display": "block",
                        "margin-top": "0"
                    });
                }
            }
        }
        else if(searchInput.indexOf("<") >= 0) {
            searchCut = searchInput.split("<");
            
            for(i=1; i <= $(".level").size(); i++) {
                diffRating = levels[i].difficulty;
                
                if(searchCut[1] < diffRating) {
                    $(".number"+i).css("display", "none");
                } else {
                    $(".number"+i).css({
                        "display": "block",
                        "margin-top": "0"
                    });
                }
            }
        }
    }
    else {
        for(i=1; i <= $(".level").size(); i++) {
            levelName = $(".number"+i+" .levelName")[0].innerHTML.toLowerCase();

            if (levelName.indexOf(searchInput) < 0) {
                $(".number"+i).css("display", "none");
            } else {
                $(".number"+i).css({
                    "display": "block",
                    "margin-top": "0"
                });
            }
        }
    }
    
    $(".levelList div:visible:first").css("margin-top", "40px");
});


//Sort System
var sortedLevels = [];
var higherValues;
$(".dropdown.sorting").change(function(){
    selectSorting();
});

var ascending;
$(".ascending").change(function(){
    if($(".ascending").is(':checked')) {
        ascending = 1;
    } else {
        ascending = 0;
    }
    selectSorting();
});

function selectSorting() {
    sortedLevels = [];
    switch($(".dropdown.sorting")[0].selectedIndex) {
        case 0:
            sortByDate();
            break;
        case 1:
            sortByAlphabetical();
            break;
        case 2:
            sortByDifficulty();
            break;
        default:
            sortByDate();
            break;
    }
}

function sortByDate() {
    sortedLevels[1] = levels[1];
    for(i=2; i <= levels.length-1;i++) {
        higherValues = 0;
        for(j=1; j <= sortedLevels.length-1;j++) {
            if (ascending == 1) {
                if(sortedLevels[j].ID < levels[i].ID){
                    higherValues++;
                }
            } else {
                if(sortedLevels[j].ID > levels[i].ID){
                    higherValues++;
                }
            }
        }
        sortedLevels.splice(i-higherValues, 0, levels[i]);
    }
    levels = sortedLevels;
    makeLevelList();
}

function sortByAlphabetical() {
    sortedLevels = levels;
    
    sortedLevels = _.sortBy(levels, "name");
    
    if (ascending == 1) { sortedLevels.reverse(); }
    
    for (var i = 1; i < sortedLevels.length; i++) {
        if (ascending == 1) { levels = sortedLevels; }
        else { levels[i] = sortedLevels[i-1]; }
    }
    
    makeLevelList();
}

function sortByDifficulty() {
    sortedLevels[1] = levels[1];
    for(i=2; i <= levels.length-1;i++) {
        higherValues = 0;
        for(j=1; j <= sortedLevels.length-1;j++) {
            if (ascending == 1) {
                if(sortedLevels[j].difficulty < levels[i].difficulty){
                    higherValues++;
                }
            } else {
                if(sortedLevels[j].difficulty > levels[i].difficulty){
                    higherValues++;
                }
            }
        }
        sortedLevels.splice(i-higherValues, 0, levels[i]);
    }
    levels = sortedLevels;
    makeLevelList();
}


sortByDate();