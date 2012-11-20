ig.module(
	"game.entities.bee"
).requires(
	"impact.entity"
).defines(function() {
	EntityBee = ig.Entity.extend({
		//define variables
		speed: {x:1,y:1},
		dest: {x:0,y:0},
		atDestination: false,
		swarmDims: {x:50,y:50},
		swarmCord: {x:0,y:0},
		closeEnough: 1,
		//load animation sheet
		animSheet: new ig.AnimationSheet("media/sprite_bee.png",32,32),
		setDest: function() {
			//sets the bee's destination in swarm coordinates
			this.dest.x = (Math.random() < 0.5 ? -1:1) * (Math.random() * this.swarmDims.x);
			this.dest.y = (Math.random() < 0.5 ? -1:1) * (Math.random() * this.swarmDims.y);
			this.atDestination = false;

		},
		getScreenCords: function(swCords) {
			var mx = ig.input.mouse.x;
			var my = ig.input.mouse.y;
			return {x:mx + swCords.x,y:my + swCords.y};
		},
		getSwarmCords: function(scCords) {
			var mx = ig.input.mouse.x;
			var my = ig.input.mouse.y;
			return {x:-mx + scCords.x,y:-my + scCords.y};
		},
		move: function() {
			for(key in this.swarmCord) {
				var s = this.speed[key];
				this.swarmCord[key] < this.dest[key] ? this.swarmCord[key] += s : this.swarmCord[key] -= s;
			}
		},
		atDest: function() {
			var xCheck = Math.abs(this.swarmCord.x - this.dest.x) < this.closeEnough ? true:false;
			var yCheck = Math.abs(this.swarmCord.y - this.dest.y) < this.closeEnough ? true:false;
			this.atDestination = xCheck && yCheck;

			return this.atDestination;

		},
		init: function(xi,yi,settings) {
			this.parent(xi,yi,settings);
			//add idle animation
			var initialPosition = {x:xi,y:yi};
			this.addAnim("idle",0.1,[0,1,2,3]);
			this.swarmCord = this.getSwarmCords(initialPosition);
			this.setDest();
		},
		update: function() {
			this.parent();
			//this.setDest();
			this.move();
			if (this.atDest()) {this.setDest(); console.log("HEHEH");}			
			this.pos = this.getScreenCords(this.swarmCord);


		},

	});
});