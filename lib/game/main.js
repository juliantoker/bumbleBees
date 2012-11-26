ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.bee',
	'game.entities.redBee',
	'game.entities.beeController',
	'game.entities.background',
	'game.entities.missile',
	'game.entities.missileDrone'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	//true when accepting player input	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.MOUSE1,'rally');
		ig.input.bind(ig.KEY.MOUSE2,'colorSelect');
		ig.input.bind(ig.KEY.MWHEEL_UP,'grow');
		ig.input.bind(ig.KEY.MWHEEL_DOWN,'shrink');
		ig.input.bind(ig.KEY.SPACE,'test');
		ig.input.initMouse();
		this.spawnEntity(EntityBackground,0,0,{});
		var beeController = this.spawnEntity(EntityBeeController,0,0,{});
		for(var i = 0; i < 6; i++) {
			var w = Math.random() * ig.system.width;
			var h = Math.random() * ig.system.height;
			var c;
			Math.random() < 0.3 ? c = 'yellow' : Math.random() < 0.5 ? c = 'blue' : c = 'red';
			beeController.makeBee(w,h,{col:'red'});
			//this.spawnEntity(EntityRedBee,w,h,{col:'red'});
		}
		this.spawnEntity(EntityMissileDrone,420,250,{});
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		// Add your own, additional update code here
		//if(ig.input.state('test')) {
		//	this.screen.x += 20;
		//	console.log(this.screen.x);
		//}
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
