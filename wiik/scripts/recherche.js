var searchInput, levelName;
$("#recherche").bind("input", function(){
    searchInput = $("#recherche").val().toLowerCase();
    
    for(var i=2; i <= $("#items tr").size(); i++) {
        levelName = $("#items tr:nth-child("+i+") td:nth-child(2)")[0].innerHTML.toLowerCase();

        if (levelName.indexOf(searchInput) < 0) {
            $("#items tr:nth-child("+i+") td:nth-child(2)").parent().css("display", "none");
        } else {
            $("#items tr:nth-child("+i+") td:nth-child(2)").parent().css("display", "table-row");
        }
    }
});