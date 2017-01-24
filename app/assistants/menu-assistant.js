function MenuAssistant() {	
this.stop = false;
this.tickerInfo = $('tickerMessage');
var newsEnabled = true;
}

MenuAssistant.prototype.setup = function() {
	this.controller.enableFullScreenMode(true);
	this.appMenuModel = {
		visible: true,
		items: [{
			label: $L('About Supernova'),
			command: 'about'
		}
		]
	};
		try {
	this.cookie = new Mojo.Model.Cookie('settings')
	var cookieSettings = this.cookie.get();	
	newsEnabled = cookieSettings.news;
} catch (e) {
	newsEnabled = true;
}	
	if (newsEnabled == true)
	{
		this.stop = false;
		var message = 'Welcome back to Supernova......[Alpha Build 12/17/2010 : ' + Mojo.Environment.DeviceInfo.serialNumber + ']';
		this.doAnimation(message,3); //speedLevel goes from 1(slowest) to 7(fastest)
	}
	this.controller.setupWidget('newGame', {}, {buttonLabel: 'Start Game'});
	this.controller.setupWidget('help', {}, {buttonLabel: 'Tutorial'});
	this.controller.setupWidget('settings', {}, {buttonLabel: 'Settings'});
	this.controller.setupWidget('exitGame', {}, {buttonLabel: 'Exit Game'});
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, this.appMenuModel);
	this.controller.get('vendor').update("Copyright 2010 " + Mojo.appInfo.vendor + ", Inc.");
	this.controller.get('label').update("Version: " + Mojo.appInfo.version);
	Mojo.Event.listen(this.controller.get('newGame'), Mojo.Event.tap, this.newGame.bind(this));
	Mojo.Event.listen(this.controller.get('highScores'), Mojo.Event.tap, this.highScores.bind(this));
	Mojo.Event.listen(this.controller.get('help'), Mojo.Event.tap, this.help.bind(this));
	Mojo.Event.listen(this.controller.get('settings'), Mojo.Event.tap, this.settings.bind(this));	
	Mojo.Event.listen(this.controller.get('exitGame'), Mojo.Event.tap, this.exitGame.bind(this));
};
MenuAssistant.prototype.doAnimation = function(message, speedLevel) {
	
	this.tickerInfo.update(message);
	
	//adjust the speed level to an Animation class related factor 
	switch (speedLevel)
	{
		case 1: speedLevel = 10; break;
		case 2: speedLevel = 2; break;
		case 3: speedLevel = 1; break;
		case 4: speedLevel = .75; break;
		case 5: speedLevel = .5; break;
		case 6: speedLevel = .25; break;
		case 7: speedLevel = .1; break;
		default: speedLevel = 1; break;
	}
	
	/* This is the size to grow the div to(must grow to show all the text & 
	 * seems we can't just initially set it to a large value since it messes with
	 * the scene layout(although perhaps there's a css tag to handle this - if
	 * so then the width growing animations can be disposed of))
	*/
	//Note - these value computations are hacky - they seem to work in general, but
	//       a more formal algorithm or solid testing of various string lengths is recommended.
	
	//how wide to grow the div	
    toWidth = message.length*10;
	//duration for growing the width.
	widthGrowDuration = speedLevel*message.length/100;
	//how far to move the div to the left.
	toLeft = -(message.length*10);  
	//duration for moving the div to the left.
	leftShrinkDuration = speedLevel*message.length/10; 
	
	//Call this function to start circling the message around.
	this.doCircularTicker(toWidth,widthGrowDuration,toLeft,leftShrinkDuration);
}

MenuAssistant.prototype.doCircularTicker = function (toWidth,widthGrowDuration,toLeft,leftShrinkDuration)
{
	var that = this;
	//reset the message's left & width properties so that it's back offscreen to the right
	this.tickerInfo.setStyle({'left': "300px"});
	this.tickerInfo.setStyle({'width': "0px"});
	
	//grow the width property so that it gets big enough to display the full message
    Mojo.Animation.animateStyle(this.tickerInfo, 'width', 'linear', {
                from: 0,
                to: toWidth,
                duration: widthGrowDuration});                   
				                                
	//decrease the left property so that the message appears to be moving to the left &
	//call us again when the ticker message has gone off the left side of the screen
    Mojo.Animation.animateStyle(this.tickerInfo, 'left', 'linear', {
                from: 300,
                to: toLeft,
                duration: leftShrinkDuration,
					onComplete: function(){
					if (!that.stop) {
						that.doCircularTicker(toWidth, widthGrowDuration, toLeft, leftShrinkDuration);
					}
				}
	});      
}
MenuAssistant.prototype.handleCommand = function(event){
	this.controller = Mojo.Controller.stageController.activeScene();
	if (event.type == Mojo.Event.command) {
		switch (event.command) {
			case 'about':
				this.controller.showAlertDialog({
					title: $L("Supernova - V" + Mojo.appInfo.version),
					message: $L("Copyright 2010, Maurice Achtenhagen"),
					choices: [{
						label: $L('Close'),
						value: "refresh",
						type: 'affirmative'
					}]
				});
				break;
		}
	}
};
MenuAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

MenuAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

MenuAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.get('newGame'), Mojo.Event.tap, this.newGame.bind(this));
	Mojo.Event.stopListening(this.controller.get('highScores'), Mojo.Event.tap, this.highScores.bind(this));
	Mojo.Event.stopListening(this.controller.get('help'), Mojo.Event.tap, this.help.bind(this));
	Mojo.Event.stopListening(this.controller.get('settings'), Mojo.Event.tap, this.settings.bind(this));
	Mojo.Event.stopListening(this.controller.get('exitGame'), Mojo.Event.tap, this.settings.bind(this));	
};
MenuAssistant.prototype.newGame = function(){
	this.controller.stageController.pushScene("main");
};
MenuAssistant.prototype.help = function(){
	this.controller.stageController.pushScene("tutorial");
};
MenuAssistant.prototype.highScores = function(){
	this.controller.stageController.pushScene("highscores");
};
MenuAssistant.prototype.settings = function(){
	this.controller.stageController.pushScene("settings");
};
MenuAssistant.prototype.exitGame = function(){
	this.controller.window.close();
}
