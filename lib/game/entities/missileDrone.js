ig.module(
	'game.entities.missileDrone'
).requires(
	'game.entities.enemy',
	'game.entities.missile',
	'game.entities.laserSight',
	'game.entities.bee'
).defines(function() {
	EntityMissileDrone = EntityEnemy.extend({
		sightOffset: {x:10,y:27},
		missileOffset: {x:6,y:7},
		droneSpeed: {x:1,y:1},
		controlSpeed: {x:2,y:2},
		closeEnough: 60,
		launchBegun: false,
		firing: false,
		finalOpenFrame: 6,
		animSheet: new ig.AnimationSheet('media/sprite_missile_drone.png',34,53),
		setDroneTarget: function() {
			this.targetEntity = ig.game.getEntitiesByType(EntityBee).random();
		},
		setSightTarget: function() {
			this.sight.setTarget(this.targetEntity);
		},
		makeLaserSight: function() {
			newSight = ig.game.spawnEntity(EntityLaserSight,this.pos.x,
				this.pos.y,{targ:this.targetEntity});
			return newSight;
		},
		fireMissile: function() {
			var msx = this.pos.x + this.missileOffset.x;
			var msy = this.pos.y + this.missileOffset.y;
			ig.game.spawnEntity(EntityMissile,msx,msy);
		},
		resetAfterFiring: function() {
			this.currentAnim.frameTime = 0.5;
			this.currentAnim = this.anims.close.rewind();
			this.launchBegun = false;
			this.firing = false;
			this.coolDownTimer.set(20);
			this.setDroneTarget();
			this.setSightTarget();
		},
		move: function() {
			s = this.droneSpeed.y;
			this.pos.y < this.controlPoint.y ? this.pos.y += s :
				this.pos.y -= s;
			this.moveSight();
			
		},
		moveSight: function() {
			this.sight.pos = {x:this.pos.x + this.sightOffset.x,
				y:this.pos.y + this.sightOffset.y};
		},
		moveCP: function() {
			for(key in this.controlPoint) {
				s = this.controlSpeed[key];
				tp = this.targetEntity.pos;
				this.controlPoint[key] < tp[key] ? this.controlPoint[key] += s :
					this.controlPoint[key] -= s;
			}
		},
		atDest: function() {
			var d = Math.abs(this.pos.y - this.controlPoint.y) < this.closeEnough ? true : false;
			return d;
		},
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			//define animations
			this.addAnim('idle',1,[0]);
			this.addAnim('open',0.2,[0,1,2,3,4,5,6],true);
			this.addAnim('close',0.2,[0,1,2,3,4,5,6].reverse(),true);
			this.addAnim('firing',0.5,[6,7]);
			this.currentAnim = this.anims.idle.rewind();
			this.setDroneTarget();
			this.sight = this.makeLaserSight();
			this.setSightTarget();
			this.controlPoint = {x:this.pos.x,y:this.targetEntity.pos.y};
			this.coolDownTimer = new ig.Timer(0.5);
		},
		update: function() {
			this.parent();
			var at = this.atDest();
			if(!at) {this.move();}
			if(at && this.coolDownTimer.delta() > 0 && !this.launchBegun) {
				this.currentAnim = this.anims.open.rewind();
				this.launchBegun = true;
				console.log("one");
			}
			if(this.launchBegun && !this.firing && this.currentAnim.loopCount > 0) {
				if(!this.firing) {this.currentAnim = this.anims.firing.rewind();}
				this.firing = true;
				console.log("on");
				this.coolDownTimer.set(20);
			}
			if(this.firing && this.currentAnim.loopCount > 0) {
				this.currentAnim.frameTime -= 0.0125;
				console.log("oe");
			}
			else if(this.currentAnim.frameTime < 0.01) {
				this.fireMissile();
				this.resetAfterFiring();
				console.log(this.firing);
			}
			if(this.coolDownTimer.delta() > 0 && this.firing && this.launchBegun) {
				
				this.coolDownTimer.reset();
				console.log("oasdfsadfne");
			}
			this.moveCP();
		}
	});
});