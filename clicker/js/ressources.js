//Ressources
class RessourceClass {

	constructor(ressourceName, totalStock, productionSpeed, requirement) {
		this.ressourceName		= ressourceName;
		this.nameNoSpace		= ressourceName.replace(/ /g, '');
		this.totalStock			= totalStock;
		this.productionSpeed	= productionSpeed;
		this.requirement		= null || requirement;

		this.currentStock		= 0;
		this.productionProgress	= 0;
		this.isUnlocked			= false;
		this.wasUnlocked		= false;
		this.isCreating 		= false;

		this.createUI();
	}

	changeProductionSpeed () {
		productionSpeed
	}

	calculateProgress() {
		return (this.productionProgress / this.productionSpeed) * 100;
	}

	createUI() {
		var ressourceContainer = document.getElementsByClassName('ressourceList')[0];
		ressourceContainer.insertAdjacentHTML(
			'beforeend',
			UIblueprint.replace(/@NAME@/g, this.ressourceName).replace(/@NOSPACE@/g, this.nameNoSpace)
		);

		var tempRessourceName = this.ressourceName;
		document.querySelector('.' + this.nameNoSpace + ' .createRessource').addEventListener('click',
		function(){
			startCreating(tempRessourceName);
		}, false);

        this.updateRequirement();

		this.lockUI();
	}

	updateUI() {
		if (this.wasUnlocked != this.isUnlocked) {
			if(this.isUnlocked) {
				this.unlockUI();
			} else {
				this.lockUI();
			}
			this.wasUnlocked = this.isUnlocked;
		}

		document.querySelector('.' + this.nameNoSpace + ' .quantity').innerHTML = this.currentStock;
		document.querySelector('.' + this.nameNoSpace + ' .progressInner').style.width = this.calculateProgress() + '%';
	}

    updateRequirement() {
        if(this.requirement != null) {
			document.querySelector('.' + this.nameNoSpace + ' .requirement').innerHTML = '-' + this.requirement[1] + ' ' + this.requirement[0];
		}
    }

	unlockUI() {
		document.querySelector('.' + this.nameNoSpace + ' .createRessource').disabled = false;
	}

	lockUI() {
		document.querySelector('.' + this.nameNoSpace + ' .createRessource').disabled = true;
	}
}


//Functions
function getRessource(wantedRessource) {
	for (var i=0; i<ressources.length; i++) {
		if (ressources[i].ressourceName == wantedRessource) {
			return ressources[i];
		}
	}
}

function startCreating(ressourceName) {
	getRessource(ressourceName).isCreating = true;

	if(getRessource(ressourceName).requirement != undefined) {
		getRessource(getRessource(ressourceName).requirement[0]).currentStock -= getRessource(ressourceName).requirement[1];
	}
}


//ressources UI blueprint
//use @NAME@ to use the ressource name
//use @NOSPACE@ to use the ressource name without space
var UIblueprint =
"<div class='ressource @NOSPACE@'>\n"							+
"	<span class='requirement'></span>\n"						+
"	<span class='title'>@NAME@</span>\n"						+
"	<span class='quantityWrapper'>"								+
"		quantity : <span class='quantity'></span>"				+
"	</span>\n"													+
"	<div class='progressOuter'>\n"								+
"		<div class='progressInner'>\n"							+
"		</div>\n"												+
"	</div>\n"													+
"	<button class='createRessource'>Create a @NAME@</button>\n"	+
"</div>"														;


//Create ressources
var man			=	new RessourceClass('Man'			, 9999999999999	, 2										);
var group		=	new RessourceClass('Group'			, 9999999999999	, 50		, ['Man'			, 5]	);
var town		=	new RessourceClass('Town'			, 9999999999999	, 100		, ['Group'			, 5]	);
var city		=	new RessourceClass('City'			, 9999999999999	, 500		, ['Town'			, 5]	);
var country		=	new RessourceClass('Country'		, 9999999999999	, 1000		, ['City'			, 5]	);
var continent	=	new RessourceClass('Continent'		, 9999999999999	, 3000		, ['Country'		, 5]	);
var world		=	new RessourceClass('World'			, 9999999999999	, 6000		, ['Continent'		, 5]	);
var solarSystem	=	new RessourceClass('Solar System'	, 9999999999999	, 30000		, ['World'			, 5]	);
var galaxy		=	new RessourceClass('Galaxy'			, 9999999999999	, 60000		, ['Solar System'	, 5]	);
var galaxyGroup	=	new RessourceClass('Galaxy Group'	, 9999999999999	, 180000	, ['Galaxy'			, 5]	);

var ressources = [
	man,
	group,
	town,
	city,
	country,
	continent,
	world,
	solarSystem,
	galaxy,
	galaxyGroup
];
