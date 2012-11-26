ig.module(
	'game.entities.laserSight'
).requires(
	'game.entities.enemy',
	'game.entities.laser'
).defines(function() {
	EntityLaserSight = EntityEnemy.extend({
		animSheet: new ig.AnimationSheet('media/laserSight.png',15,19),
		targetEntity: {},
		closeEnough: 0.1,
		angularSpeed: 0.5,
		setTarget: function(target) {
			this.targetEntity = target;
		},
		needToRotate: function() {
			var targetAngle = this.angleTo(this.targetEntity);
			var dTheta = this.currentAnim.angle - targetAngle;
			var angleCheck = Math.abs(dTheta) > this.closeEnough;
			var timeCheck = this.rotationTimer.delta() > 0;
			var result = angleCheck && timeCheck;
			return {delta: dTheta,answer: result};
		},
		rotate: function() {
			var a = this.angleTo(this.targetEntity);
			if(this.rotationTimer.delta() > 0) {
				this.currentAnim.angle = a + Math.PI/2;	
				this.rotationTimer.reset();
			}
		},
		makeLaser: function() {
			var newLaser = ig.game.spawnEntity(EntityLaser,this.pos.x,this.pos.y,{a:0.7});
			return newLaser;
		},
		updateLaser: function() {
			this.laser.currentAnim.angle = this.currentAnim.angle - Math.PI/2;
			this.laser.pos = this.pos;
			var d = this.distanceTo(this.targetEntity);
			this.laser.scaleBeam(d);
		},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.zIndex = 100;
			ig.game.sortEntitiesDeferred();
			this.addAnim('idle',1,[0]);
			this.rotationTimer = new ig.Timer(0.1);
			this.setTarget(settings.targ);
			this.laser = this.makeLaser();
		},
		update: function() {
			this.parent();
			this.rotate();
			this.updateLaser();
		}
	});
});