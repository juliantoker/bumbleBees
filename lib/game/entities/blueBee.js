ig.module(
	'game.entities.blueBee'
).requires(
	'game.entities.bee'
).defines(function() {
	EntityBlueBee = EntityBee.extend({
		init: function(x,y,settings) {
			this.parent(x,y,settings);
		},
		update: function() {
			this.parent();
		}
	});
});