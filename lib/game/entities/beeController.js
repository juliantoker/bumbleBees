ig.module(
	"game.entities.beeController"
).requires(
	"impact.entity",
	"game.entities.bee"
).defines(function() {
	BeeController = ig.Entity.extend({
		allBeeGroup: [],
		yellowBeeGroup: [],
		blueBeeGroup: [],
		redBeeGroup: [],
		activeColor: 0,
		colorMatrix: [],
		maxBees: 12,
		//timer for neater printing of debug statements in the update method. remove later
		testTimer: new ig.Timer(5),
		colorSelectCooldown: new ig.Timer(1),
		updateColorMatrix: function() {
			this.colorMatrix = [];
			this.colorMatrix.push(this.allBeeGroup);
			this.colorMatrix.push(this.yellowBeeGroup);
			this.colorMatrix.push(this.blueBeeGroup);
			this.colorMatrix.push(this.redBeeGroup);
		},
		setBeeGroup: function(bee) {
			this.allBeeGroup.push(bee);
			if(bee.col == "yellow") {
				this.yellowBeeGroup.push(bee);
			}else if(bee.col == "blue") {
				this.blueBeeGroup.push(bee);
			} else {
				this.redBeeGroup.push(bee);
			}
			this.updateColorMatrix();
		},
		makeBee: function(x,y,settings) {
			var bee = ig.game.spawnEntity(EntityBee,x,y,settings);
			this.setBeeGroup(bee);
		},
		activateAll: function() {
			for(i = 0; i < this.allBeeGroup.length; i++) {
				this.allBeeGroup[i].activate();
			}
		},
		deactivateAll: function() {
			for(i = 0; i < this.allBeeGroup.length; i++) {
				this.allBeeGroup[i].deactivate();
			}
		},
		toggleActiveColor: function(activeCol) {
			var ac = this.activeColor < 3 ? this.activeColor + 1 : 0;
			return ac;
		},
		selectGroup: function(activeCol) {
			this.deactivateAll();
			this.activeColor = this.toggleActiveColor(this.activeColor);
			var activeGroup = this.colorMatrix[this.activeColor];
			for(var i = 0; i < activeGroup.length; i++) {
				activeGroup[i].activate();
			}
		},
		init: function(x,y,settings) {
			this.parent(x,y,settings);			
		},
		update: function() {
			if(ig.input.state("colorSelect") && this.colorSelectCooldown.delta() > 0) {
				this.colorSelectCooldown.reset();
				this.selectGroup(this.activeColor);
				console.log(this.activeColor);
			}
		}
	});
});