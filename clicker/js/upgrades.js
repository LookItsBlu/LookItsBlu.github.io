//Upgrades
class UpgradeClass {
    constructor(upgradeName, upgradeDescription, upgradeRequirement, upgradeEffect){
        this.upgradeName = upgradeName;
        this.upgradeNameNoSpace = upgradeName.replace(/ /g, '');
        this.upgradeDescription = upgradeDescription;

        this.upgradeRequirement = upgradeRequirement;
        this.upgradeEffect = upgradeEffect;

        this.upgradeActivated = false;

        this.createUI();
    }

    createUI() {
		document.querySelector('.upgradeAvailable').insertAdjacentHTML(
			'beforeend',
			upgradeBlueprint.replace(/@NAME@/g, this.upgradeName).replace(/@NOSPACE@/g, this.upgradeNameNoSpace).replace(/@DESC@/g, this.upgradeDescription)
		);

        document.querySelector('.' + this.upgradeNameNoSpace + ' .requirement').innerHTML = '-' + this.upgradeRequirement[1] + ' ' + this.upgradeRequirement[0];

		var tempUpgradeName = this.upgradeName;
		document.querySelector('.' + this.upgradeNameNoSpace + ' .unlockUpgrade').addEventListener('click',
		function(){
			activateUpgrade(tempUpgradeName);
		}, false);

		this.lockButton();
	}

    unlockButton() {
		document.querySelector('.' + this.upgradeNameNoSpace + ' .unlockUpgrade').disabled = false;
	}

	lockButton() {
		document.querySelector('.' + this.upgradeNameNoSpace + ' .unlockUpgrade').disabled = true;
	}

    activate() {
        this.upgradeActivated = true;
        document.querySelector('.' + this.upgradeNameNoSpace + ' .unlockUpgrade').remove();
        document.querySelector('.upgradeBought').appendChild(
            document.querySelector('.' + this.upgradeNameNoSpace)
        );
    }
}

function activateUpgrade(wantedUpgradeName) {
    for (var i=0; i<upgrades.length; i++) {
        if(upgrades[i].upgradeName == wantedUpgradeName) {
            upgrades[i].activate();
            if(upgradeFunction[i].onPurchase != undefined) {
                upgradeFunction[i].onPurchase();
            }
        }
    }
}


//ressources UI blueprint
//use @NAME@ to use the ressource name
//use @NOSPACE@ to use the ressource name without space
//@DESC@ to add the description
var upgradeBlueprint =
"<div class='upgrade @NOSPACE@'>\n"                             +
"	<span class='requirement'></span>\n"                        +
"	<span class='title'>@NAME@</span>\n"                        +
"	<span class='description'>@DESC@</span>\n"	       		    +
"	<button class='unlockUpgrade'>Unlock</button>\n"	        +
"</div>"														;


//Create upgrades
// Exemple:
// var love = new UpgradeClass(
//      'Love',                                         -- Title
//      'Love is in the air!',                          -- Description
//      ['Group', 1],                                   -- Requirement
//      function(){                                     -- Effect
//          this.onTick = function(){                   -- this.onTick: called every tick
//              getRessource('Man').currentStock++;
//          }
//
//          this.onPurchase = function(){               -- this.onPurchase: called when upgrade is bought
//              getRessource('Man').currentStock+=1000;
//          }
//      }
//  );

var love = new UpgradeClass(
    'Love',
    '+1 Man every 1.5 second as long as 1 group is available',
    ['Group', 1],
    function(){
        var currTimer = 0;

        this.onTick = function(){
            if(getRessource('Group').currentStock >= 1) {
                currTimer++;
                if(currTimer==150) {
                    getRessource('Man').currentStock++;
                    currTimer=0;
                }
            } else {
                currTimer = 0;
            }
        }
    }
);

var easyTown = new UpgradeClass(
    'Easy Towns™',
    'With "Easy Towns™", Towns now cost only 3 groups to create!',
    ['City', 1],
    function(){
        this.onPurchase = function(){
            getRessource('Town').requirement[1] = 3;
            getRessource('Town').updateRequirement();
        }
    }
);

var upgrades = [
	love,
    easyTown
];



var upgradeFunction = [];
for (var i=0; i<upgrades.length; i++) {
    upgradeFunction[i] = new upgrades[i].upgradeEffect;
}
