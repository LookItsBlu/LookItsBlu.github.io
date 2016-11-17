function displayName() {
    var selected = $(this).index();
    
    $('#name>span').css('display', 'none');
    $('#name>span:nth-child('+(selected+1)+')').css('display', 'block');
}


$('#icons a').hover(displayName);
$('#icons a').on('focus', displayName);
$('#menu').mouseleave(function() { $('#name>span').css('display', 'none'); });