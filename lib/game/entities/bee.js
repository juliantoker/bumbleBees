ig.module(
	"game.entities.bee"
).requires(
	"impact.entity"
).defines(function() {
	EntityBee = ig.Entity.extend({
		//define variables
		beeSpeed: {x:1,y:1},
		controlSpeed: {x:2,y:2},
		dest: {x:0,y:0},
		atDestination: false,
		swarmDims: {x:50,y:50},
		swarmCord: {x:0,y:0},
		//define the control point
		cp: {pos:{x:0,y:0},vel:{x:0,y:0}},
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
			var mx = this.cp.pos.x;
			var my = this.cp.pos.y;
			return {x:mx + swCords.x,y:my + swCords.y};
		},
		getSwarmCords: function(scCords) {
			var mx = this.cp.pos.x;
			var my = this.cp.pos.y;
			return {x:-mx + scCords.x,y:-my + scCords.y};
		},
		move: function() {
			for(key in this.swarmCord) {
				var s = this.beeSpeed[key];
				this.swarmCord[key] < this.dest[key] ? this.swarmCord[key] += s : this.swarmCord[key] -= s;
			}
		},
		atDest: function() {
			var xCheck = Math.abs(this.swarmCord.x - this.dest.x) < this.closeEnough ? true:false;
			var yCheck = Math.abs(this.swarmCord.y - this.dest.y) < this.closeEnough ? true:false;
			this.atDestination = xCheck && yCheck;

			return this.atDestination;

		},
		moveControlPoint: function() {
			//capture mouse input in "m"
			m = ig.input.mouse;
			for(key in this.cp.pos) {
				s = this.cp.vel[key];
				this.cp.pos[key] < m[key] ? this.cp.pos[key] += s : this.cp.pos[key] -= s;
			}
		},
		init: function(xi,yi,settings) {
			this.parent(xi,yi,settings);
			//add idle animations
			var initialPosition = {x:xi,y:yi};
			this.addAnim("idleYellow",0.1,[0,1,2,3]);
			this.addAnim("idleBlue",0.1,[4,5,6,7]);
			this.addAnim("idleRed",0.1,[8,9,10,11]);
			Math.random() < 0.33 ? this.currentAnim = this.anims.idleYellow : 
			Math.random() < 0.5 ? this.currentAnim = this.anims.idleBlue : 
			this.currentAnim = this.anims.idleRed; 
			this.swarmCord = this.getSwarmCords(initialPosition);
			this.cp.vel = {x:this.controlSpeed.x,y:this.controlSpeed.y};
			this.setDest();
		},
		update: function() {
			this.parent();
			this.moveControlPoint();
			this.move();
			if (this.atDest()) {this.setDest();}			
			this.pos = this.getScreenCords(this.swarmCord);
		},

	});
});