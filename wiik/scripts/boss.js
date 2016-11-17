var Name = [
    "blastocyst", 
    "blightedovum", 
    "chad", 
    "chub", 
    "daddylonglegs", 
    "darkone", 
    "dingle", 
    "fistula", 
    "gemini", 
    "gish", 
    "gurdy", 
    "gurdyjr", 
    "gurglings", 
    "larryjr", 
    "loki", 
    "lokii", 
    "megagurdy", 
    "maskofinfamy", 
    "megafatty", 
    "megamaw", 
    "monstro", 
    "monstro2", 
    "peep", 
    "pin", 
    "polycephalus", 
    "scolex", 
    "steven", 
    "teratoma", 
    "darkone2", 
    "bloat", 
    "fatty2", 
    "carrionqueen", 
    "dukeofflies", 
    "thefallen", 
    "megamaw2", 
    "thehaunt", 
    "thehollow", 
    "thehusk", 
    "thewretched", 
    "triachnid", 
    "widow",
    
    "mom",
    "momsheart",
    "itlives",
    "hush",
    "satan",
    "thelamb",
    "isaac",
    "bluebaby",
    "megasatan",
    "ultragreed",
    
    "famine",
    "pestilence",
    "war",
    "death",
    "conquest",
    "headlesshorseman"
];


$('#listes ul li').click(function(){
    /* mise a jour de la couleur de la liste */
    $('#listes ul li:nth-child(odd)').css('background-color', '#ddd');
    $('#listes ul li:nth-child(even)').css('background-color', '#bbb');
    $(this).css('background-color', '#75A3FF');
    
    /* recuperation des informations du personnage */
    var bossName;
    if($(this).parent().parent().attr('id') == "Boss_principaux") {
        bossName = Name[$(this).index()];
    } else if($(this).parent().parent().attr('id') == "Boss_finaux") {
        bossName = Name[$('#Boss_principaux ul li').length+$(this).index()];
    } else if($(this).parent().parent().attr('id') == "Les_chevaliers") {
        bossName = Name[$('#Boss_principaux ul li').length+$('#Boss_finaux ul li').length+$(this).index()];
    }
    
    
    //affiche le nom du boss
    $('#name').html($(this).text());
    
    //image du boss
    $('#bossimg').html("<img src='ressources/Bosses/"+bossName+".png' />");
    
    //description du boss
    $('#description>div').css('display', 'none');
    $('.'+bossName).css('display', 'block');
});

$('#Boss_principaux ul li:nth-child(1)').trigger('click');