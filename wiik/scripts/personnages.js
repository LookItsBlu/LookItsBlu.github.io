$('#personnages ul li').click(function(){
    /* mise a jour de la couleur de la liste */
    $('#personnages ul li:nth-child(odd)').css('background-color', '#ddd');
    $('#personnages ul li:nth-child(even)').css('background-color', '#bbb');
    $(this).css('background-color', '#75A3FF');
    
    /* recuperation des informations du personnage */
    var CharInfo = window.CharacterList[$(this).index()];
    
    
    /* affichage des informations sur la page */
    
    //nom du personnage
    $('#name').html(CharInfo.name);
    
    //image du personnage
    $('#char-img .char').attr('src', CharInfo.img);
    
    //items du personnage
    $('#start_items').html('');
    for(var i=0; i < CharInfo.items.length;i++){
        if(CharInfo.items[i] == -1) {
            var BGPosY = 19;
            var BGPosX = Math.floor(Math.random() * 3) + 17;
        } else {
            var BGPosY = Math.floor(CharInfo.items[i]/20);
            var BGPosX = (CharInfo.items[i]%20)-1;
        }
        $('#start_items').append("<div class='items item"+i+"'></div>");
        $('.items.item'+i).css('background-position', BGPosX*-2+'vw '+BGPosY*-2+'vw');
    }
    
    //vie du personnage
    var type = '';
    $('#health').html('');
    for(var i=0; i < CharInfo.health.length;i++){
        if(CharInfo.health[i][0] == 0) { type = 'red' }
        if(CharInfo.health[i][0] == 1) { type = 'soul' }
        if(CharInfo.health[i][0] == 2) { type = 'evil' }
        if(CharInfo.health[i][0] == 3) { type = 'coin' }
        if(CharInfo.health[i][0] == -1) { type = 'unknown' }
        
        for(var j=0; j < CharInfo.health[i][1];j++){
            $('#health').append("<div class='heart "+type+"'></div>");
        }
    }
    
    //pickups du personnage
    $('.pickup').html('');
    for(var i=0; i <= CharInfo.pickups.length; i++){
        if(CharInfo.pickups[i] == -1) {
            $('.pickup:nth-child('+(i+1)+')').html('??');
        } else {
            $('.pickup:nth-child('+(i+1)+')').html(CharInfo.pickups[i]);
        }
    }
    
    //stats du personnage
    var linkBase = 'ressources/UI/stats bar/';
    var statsList = ['speed', 'tears', 'attack', 'range', 'tearspeed', 'luck']
    for(var i=0; i <= CharInfo.stats.length; i++){
        if(CharInfo.stats[i] == -1) {
            $('#stats .'+statsList[i]).attr('src', linkBase+'stats bar_'+(i%2)+'_unknown.png');
        } else {
            $('#stats .'+statsList[i]).attr(
                'src', linkBase+'stats bar_'+(i%2)+'_'+CharInfo.stats[i]+'.png'
            );
        }
    }
    
    //trinket et pillule/carte
    $('.general .trinket').remove();
    if(CharInfo.trinket != 0) {
        if(CharInfo.trinket == -1) {
            $('.general').append("<img class='trinket' src='ressources/UI/questionmark.png'/>");
        } else {
            $('.general').append("<img class='trinket' src='ressources/Trinkets/"+CharInfo.trinket+".png'/>");
        }
    }
    
    $('.cardpill').remove();
    $('.general').append("<div class='cardpill'></div>");
    if(CharInfo.cardpill[0] == 0) {
        console.log(CharInfo.cardpill);
        var BGPosY = Math.floor(Math.random() * 2);
        var BGPosX = Math.floor(Math.random() * 2);
        
        $('.cardpill').css('background-image', 'url(ressources/UI/cardspills.png)');
        $('.cardpill').css('background-position', BGPosX*-1.8+'vw '+BGPosY*-1.5+'vw');
    } else if(CharInfo.cardpill[0] == 1) {
        var BGPosY = (CharInfo.cardpill[1]%6);
        var BGPosX = Math.floor(CharInfo.cardpill[1]/6);
        
        $('.cardpill').css('background-image', 'url(ressources/UI/cardfronts.png)');
        $('.cardpill').css('background-position', BGPosX*1+'vw '+BGPosY*1+'vw');
    } else if (CharInfo.cardpill[0] == -1) {
        
        $('.cardpill').css('background-image', 'url(ressources/UI/questionmark.png)');
        $('.cardpill').css('background-size', '1.5vw');
    }
    
    //completion
    console.log(CharInfo.completion.length);
    $('#unlocks .reward').remove();
    for(var i=0; i < CharInfo.completion.length; i++){
        var src = "ressources/";
        if(CharInfo.completion[i][0] == 0) {
            src = src+"Items/"+CharInfo.completion[i][1]+".png";
        } else if(CharInfo.completion[i][0] == 1) {
            src = src+"Trinkets/"+CharInfo.completion[i][1]+".png";
        } else if(CharInfo.completion[i][0] == 2) {
            src = src+"Bebes/"+CharInfo.completion[i][1]+".png";
        } else if(CharInfo.completion[i][0] == 3) {
            src = src+"Personnages/"+CharInfo.completion[i][1]+".png";
        }
        
        
        if(CharInfo.completion[i][0] == 4) {
            $('#unlocks>div:nth-child('+(i+1)+')').append("<span class='reward'>"+CharInfo.completion[i][1]+"</span>");
        } else {
            $('#unlocks>div:nth-child('+(i+1)+')').append("<img class='reward' src='"+src+"'/>");
        }
    }
    
    //description
    $('#description div').css('display', 'none');
    $('.'+CharInfo.name.toLowerCase().replace(' ', '_')).css('display', 'block');
});

$('#personnages ul li:nth-child(1)').trigger('click');