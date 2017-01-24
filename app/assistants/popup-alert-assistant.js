PopupAlertAssistant = function() {
}

PopupAlertAssistant.prototype.setup = function() {
	var f = this.doClose.bind(this);
	this.controller.get('popup_dialog_view').addEventListener(Mojo.Event.tap, f);
	this.controller.get('popup_dialog_dismiss').addEventListener(Mojo.Event.tap, f);
}

PopupAlertAssistant.prototype.doClose = function(event) {
	this.controller.window.close();
}
 
//to call a popup use this:
/*
 * var pushPopupScene = function(stageController) {
			stageController.pushScene('popup-alert')
		}
		Mojo.Controller.appController.createStageWithCallback({
			lightweight: true,
			name: "popup-alert",
			htmlFileName: "notification",
			height: 250},
		pushPopupScene, 'popupalert');
 */