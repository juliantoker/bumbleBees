ig.module(
	'game.entities.enemy'
).requires(
	'impact.entity'
).defines(function() {
	EntityEnemy = ig.Entity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		init: function(x,y,settings) {
			this.parent(x,y,settings);
		},
		update: function() {
			this.parent();
		}
	});
});