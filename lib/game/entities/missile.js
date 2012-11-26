ig.module(
	'game.entities.missile'
).requires(
	'game.entities.enemy'
).defines(function() {
	EntityMissile = EntityEnemy.extend({
		dim: {x:11,y:26},
		animSheet: new ig.AnimationSheet('media/smallRocket.png',11,26),
		timer: new ig.Timer(0.33),
		maxVel: {x:900,y:500},
		accel: {x:90,y:10},
		vel: {x:-180,y:0},
		launchFinished: false,
		init: function(x,y,settings) {
			//call parent's init()
			this.parent(x,y,settings);
			//specify animations
			this.addAnim('idle',0.1,[0,1]);
			this.addAnim('launch',1,[2]);
			this.currentAnim = this.anims.launch;
			//initialize size and angle
			this.size = this.dim;
			this.currentAnim.angle = - Math.PI/2;
		},
		update: function() {
			//call parent's update()
			this.parent();
			//kill missile when it leaves the screen
			if(this.pos.x < -this.size.x) {
				this.kill();
			}
			//initiate launch when criteria are met
			if(!this.launchFinished && this.vel.x >= -70) {
				this.accel = {x:-300,y:0};
				this.vel.y = 0;
				this.currentAnim = this.anims.idle;
				this.currentAnim.angle = - Math.PI/2;
				this.launchFinished = true;
			}	
		}
	});
});