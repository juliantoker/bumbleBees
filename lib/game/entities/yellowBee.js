ig.module(
	'game.entities.yellowBee'
).requires(
	'game.entities.bee'
).defines(function() {
	EntityYellowBee = EntityBee.extend({
		init: function(x,y,settings) {
			this.parent(x,y,settings);
		},
		update: function() {
			this.parent();
		}
	});
});