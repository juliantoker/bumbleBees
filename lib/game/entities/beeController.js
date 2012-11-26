ig.module(
	"game.entities.beeController"
).requires(
	"impact.entity",
	"game.entities.bee",
	'game.entities.redBee',
	'game.entities.blueBee',
	'game.entities.yellowBee'
).defines(function() {
	EntityBeeController = ig.Entity.extend({
		allBeeGroup: [],
		yellowBeeGroup: [],
		blueBeeGroup: [],
		redBeeGroup: [],
		activeColor: 0,
		colorMatrix: [],
		maxBees: 12,
		scaleFactor: 10,
		minSwarmDim: 5,
		maxSwarmDim: 200,
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
			} else if(bee.col == 'red') {
				this.redBeeGroup.push(bee);
			}
			this.updateColorMatrix();
		},
		makeBee: function(x,y,settings) {
			var bee;
			if(settings.col == 'yellow') {
				bee = ig.game.spawnEntity(EntityYellowBee,x,y,settings);
			} if(settings.col == 'blue') {
				bee = ig.game.spawnEntity(EntityBlueBee,x,y,settings);
			} else if(settings.col == 'red') {
				bee = ig.game.spawnEntity(EntityRedBee,x,y,settings);
			}
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
		growGroup: function(beeGroup) {
			for(i = 0; i < beeGroup.length; i++) {
				if(beeGroup[i].swarmDims.y < this.maxSwarmDim){
					beeGroup[i].swarmDims.y += this.scaleFactor;
					beeGroup[i].setDest();
				}
			}
		},
		shrinkGroup: function(beeGroup) {
			for(i = 0; i < beeGroup.length; i++) {
				if(beeGroup[i].swarmDims.y > this.minSwarmDim) {
					beeGroup[i].swarmDims.y -= this.scaleFactor;
					beeGroup[i].setDest();
				}
			}
		},
		init: function(x,y,settings) {
			this.parent(x,y,settings);			
		},
		update: function() {
			if(ig.input.state("colorSelect") && this.colorSelectCooldown.delta() > 0) {
				this.colorSelectCooldown.reset();
				this.selectGroup(this.activeColor);
			}
			if(ig.input.state("grow")) {
				this.growGroup(this.colorMatrix[this.activeColor]);
			} else if(ig.input.state("shrink")) {
				this.shrinkGroup(this.colorMatrix[this.activeColor]);
			}
		}
	});
});