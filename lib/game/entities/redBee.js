ig.module(
	'game.entities.redBee'
).requires(
	'game.entities.bee',
	'game.entities.redBullet'
).defines(function() {
	EntityRedBee = EntityBee.extend({
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.zIndex = 99;
			this.bulletTimer = new ig.Timer(1);
		},
		update: function() {
			this.parent();
			if(this.bulletTimer.delta() > 0) {
				var bx = this.pos.x + this.size.x/2;
				var by = this.pos.y + this.size.y/2;
				ig.game.spawnEntity(EntityRedBullet,bx,by,{});
				this.bulletTimer.reset();
			}
		},

	});
});