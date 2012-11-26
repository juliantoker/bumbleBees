ig.module(
	'game.entities.redBullet'
).requires(
	'impact.entity'
).defines(function() {
	EntityRedBullet = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/sprite_red_bullet.png',10,10),
		maxVel: {x:400,y:100},
		vel: {x:400,y:0},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',0.1,[0,1,2]);
			this.deathTimer = new ig.Timer(10);
		},
		update: function() {
			this.parent();
			if(this.deathTimer.delta() > 0) {this.kill();}
		}
	});
});