DashboardAssistant = Class.create({
	initialize: function(title) { 
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		//this.messageText = messageText;
		this.when = "Date: " + month + "/" + day + "/" + year;
		this.t = title;
	},

	setup: function() {
		this.updateDisplay()
		this.controller.listen("achTap", Mojo.Event.tap, this.viewAchievements.bind(this));
	},
	
	viewAchievements: function(){
		this.controller.stageController.pushScene("dashboard-achievement",this.t);
	},
	
	update: function(title) {	
		this.t = title;
		this.updateDisplay()
	},
	
	updateDisplay: function() {
		var props = { 
			when: this.when
		};
		var messageText = Mojo.View.render({object: props, template: 'dashboard/dashboard-message'});
		var messageDiv = this.controller.get('dashboard-text');
		Element.update(messageDiv, messageText);
	},
	

});

