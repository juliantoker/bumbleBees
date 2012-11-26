ig.module(
	'game.entities.laser'
).requires(
	'impact.entity'
).defines(function() {
	EntityLaser = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/laser.png',1040,2),
		offset: {x:-10,y:-8},
		scaleBeam: function(targetDistance) {
			this.animSheet.width = targetDistance;
		},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.zIndex = 99;
			this.addAnim('idle',1,[0]);
			this.currentAnim.pivot.x = 0;
			this.currentAnim.angle = settings.a;
			this.currentAnim.alpha = 0.5;
			this.test = new ig.Timer(0.025);
		},
		update: function() {
			this.parent();
			if(this.test.delta() > 0) {
				this.currentAnim.alpha = this.currentAnim.alpha > 0.25 ? this.currentAnim.alpha = 0.25 :
				this.currentAnim.alpha = 1.0;
			}
		}
	});
});