function updateChapter(chapterName) {
    $('.name').html(chapterName.replace('_', ' '));
    
    $('.chapterImg').attr('src', 'ressources/Stages/'+chapterName+'.png');
    
    $('#description div').css('display', 'none');
    $('.'+chapterName).css('display', 'block');
}

$('#content map area:nth-child(2)').trigger('click');