ig.module(
	'game.entities.background'
).requires(
	'impact.entity'
).defines(function() {
	EntityBackground = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/bg.jpg',1040,1080),
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle',1,[0]);
		},
		update: function() {
			this.parent();
		}
	});
});