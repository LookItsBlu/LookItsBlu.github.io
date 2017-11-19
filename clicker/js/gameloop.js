//Create timer

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

class GameClass {

	constructor(tickDuration) {
		this.tickDuration		= tickDuration || 25;
		this.running			= false;
		this.lastTickDuration	= 20;
		this.computedDuration	= 20;
	}

	//*****************
	//    GAME LOOP
	//*****************
	tick() {

		//------------
		// UPGRADES
		//------------

		for (var i=0; i<upgrades.length; i++) {
			var thisUpgrade = upgrades[i];

            if(thisUpgrade.upgradeActivated) {
                if(upgradeFunction[i].onTick != undefined) {
                    upgradeFunction[i].onTick();
                }
            } else {
                if(getRessource(thisUpgrade.upgradeRequirement[0]).currentStock >= thisUpgrade.upgradeRequirement[1]) {
                    thisUpgrade.unlockButton();
                } else {
                    thisUpgrade.lockButton();
                }
            }
		}


		//------------
		// RESSOURCES
		//------------

		for (var i=0; i<ressources.length; i++) {
			var thisRessource = ressources[i];


			//increment the currentStock of the ressource if the productionProgress value has reached the productionSpeed value and reset state
			//otherwise, check if the ressource is being produced and increment the productionProgress value if so
			if (thisRessource.isCreating) {
				thisRessource.productionProgress++;
				//override the lock to prevent wasted ressources
				thisRessource.lockUI();

				if (thisRessource.productionProgress >= thisRessource.productionSpeed) {
					thisRessource.currentStock++;
					thisRessource.productionProgress = 0;
					thisRessource.isCreating = false;
					//stop override if there is still ressources left, otherwise turn the override into a permanent state
					if(thisRessource.requirement != undefined && getRessource(thisRessource.requirement[0]).currentStock < thisRessource.requirement[1] ) {
						thisRessource.isUnlocked == false;
					}
					else {
						thisRessource.unlockUI();
					}
		        }
		    }
			else {

				//check if ressource is unlocked, and unlock if the requirement is met OR if no requirements are needed

				if (thisRessource.isUnlocked == false) {
					if(thisRessource.requirement == undefined) {
						thisRessource.isUnlocked = true;
					} else {
						if(getRessource(thisRessource.requirement[0]).currentStock == thisRessource.requirement[1] ) {
							thisRessource.isUnlocked = true;
						}
					}
				}
				else if (thisRessource.isUnlocked == true && thisRessource.requirement != undefined) {
					if(getRessource(thisRessource.requirement[0]).currentStock < thisRessource.requirement[1] ) {
				        thisRessource.isUnlocked = false;
					}
				}

			}


			//update this ressource's UI
			thisRessource.updateUI();
		}
	}

	start() {
		this.running = !this.running;
		var self = this;
		var go = async function() {
			while (self.running) {
				await sleep(self.computedDuration);
				var start = window.performance.now();
				self.tick();
				self.computedDuration = self.tickDuration - (window.performance.now() - start);
			}
		}
		go();
	}

}

//Launch timer
new GameClass(10).start();
