if (localStorage.getItem("Equipes")){
	var Equipes = JSON.parse(localStorage["Equipes"]);
	var nbEquipes = Equipes.length;
} else {
	var Equipes = new Array();
	var nbEquipes = 0;
}

showTeams();





$("#teamName").keydown(function (event){
	if (event.which == 13){
		Equipes.push([]);
		
		if ($("#teamName").val() == ""){
			Equipes[nbEquipes].push("L'équipe sans nom");
		} else {
			Equipes[nbEquipes].push($("#teamName").val());
		}
		Equipes[nbEquipes].push(false);
		
		nbEquipes++;
		
		$("#teamName").val("");
		
		localStorage["Equipes"] = JSON.stringify(Equipes);
		showTeams();
	}
});

function showTeams(){
	$("#teamList").html("");
	$("#teamList").append("<ul></ul>");
	for (i=0; i < Equipes.length; i++){
		if (Equipes[i][1] == true){
			$("#teamList ul").append("<li class='disqualified'><span>"+Equipes[i][0]+"</span><div class='disqualify'></div><div class='remove'></div></li>");
		} else {
			$("#teamList ul").append("<li><span>"+Equipes[i][0]+"</span><div class='disqualify'></div><div class='remove'></div></li>");
		}
	}
	
	setClicks();
}

function setClicks(){
	$(".disqualify").click(function(){
		if (Equipes[$(this).parent().index()][1] == false){
			$(this).parent().addClass("disqualified");
			Equipes[$(this).parent().index()][1] = true;
			localStorage["Equipes"] = JSON.stringify(Equipes);
		} else {
			$(this).parent().removeClass("disqualified");
			Equipes[$(this).parent().index()][1] = false;
			localStorage["Equipes"] = JSON.stringify(Equipes);
		}
	});

	$(".remove").click(function(){
		Equipes.splice($(this).parent().index(), 1);
		
		localStorage["Equipes"] = JSON.stringify(Equipes);
		nbEquipes--;
		
		showTeams();
	});
	
	$("#teamList ul li span").dblclick(function(){
		var previousName = $(this).text();
		var TeamID = $(this).parent().index();
		console.log(TeamID);
		$(this).html("<input id='changeTeamName' placeholder=\"nom d\'équipe\">");
		$("#changeTeamName").val(previousName);
		$("#changeTeamName").focus();
		
		$("#changeTeamName").focusout(function(){
			if ($("#changeTeamName").val() == ""){
				Equipes[TeamID][0] = previousName;
			} else {
				Equipes[TeamID][0] = $("#changeTeamName").val();
			}
			
			localStorage["Equipes"] = JSON.stringify(Equipes);
			
			showTeams();
		});
	});
}

$("#clearTeams").click(function(){
	var confirmDelete = window.confirm("voulez-vous effacer toute les équipes?");
	
	if (confirmDelete == true){
		Equipes = [];
		nbEquipes = 0;
		localStorage["Equipes"] = "";
		
		showTeams();
	}
});