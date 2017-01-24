this.Achievements;
var currentTime = new Date();
var month = currentTime.getMonth() + 1;
var day = currentTime.getDate();
var year = currentTime.getFullYear();
var achievement = "";
function DashboardAchievementAssistant(a) {
	achievement = a;
}

DashboardAchievementAssistant.prototype.setup = function() {
		this.Achievements = [];
		this.Achievements[0] = 
        {
            title: $L(achievement),
			total: $L("Game Progress: " + Math.round(((1/10)*100),1) + "%"),
			state: $L("images/achievement_40x40.png")
        }
		this.controller.setupWidget("wordList",
         {
            itemTemplate:"dashboard-achievement/listitem", 
            listTemplate:"dashboard-achievement/listcontainer", 
            swipeToDelete:false, 
            renderLimit: 40,
            reorderable:false
        },
    	this.ListModel = {items: this.Achievements});     
   		this.controller.modelChanged(this.ListModel); 	
};

DashboardAchievementAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

DashboardAchievementAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

DashboardAchievementAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
