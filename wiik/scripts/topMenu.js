function displayName() {
    var selected = $(this).index();
    
    $('#categories>span').css('display', 'none');
    $('#categories>span:nth-child('+(selected+1)+')').css('display', 'block');
}


$('#icons a').hover(displayName);
$('#icons a').on('focus', displayName);
$('#topMenu').mouseleave(function() { $('#categories>span').css('display', 'none'); });


var openState = 0;
$('.openClose').click(function() {
    if(openState==0) {
        $('#topMenu').css('top', '0');
    } else {
        $('#topMenu').css('top', '-101px');
    }
    openState = !openState;
});