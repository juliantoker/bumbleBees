ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.bee',
	'game.entities.beeController'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	//true when accepting player input
	gameActive: true,	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.MOUSE1,'rally');
		ig.input.bind(ig.KEY.MOUSE2,'colorSelect');
		ig.input.bind(ig.KEY.MWHEEL_UP,'grow');
		ig.input.bind(ig.KEY.MWHEEL_DOWN,'grow');
		ig.input.bind(ig.KEY.SPACE,'test');
		ig.input.initMouse();
		var beeController = this.spawnEntity(BeeController,0,0,{});
		for(var i = 0; i < 8; i++) {
			var w = Math.random() * ig.system.width;
			var h = Math.random() * ig.system.height;
			var c;
			Math.random() < 0.3 ? c = 'yellow' : Math.random() < 0.5 ? c = 'blue' : c = 'red';
			beeController.makeBee(w,h,{col:c});
			//this.spawnEntity(EntityBee,w,h,{col:"yellow"});
		}
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 520, 540, 2 );

});
