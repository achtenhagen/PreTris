var soundEnabled = true;
var vibrationEnabled = true;
var starsEnabled = true;
function SettingsAssistant() {
	
}

SettingsAssistant.prototype.setup = function() {
	try {
	this.controller.enableFullScreenMode(true);	
	this.cookie = new Mojo.Model.Cookie('settings')
	var cookieSettings = this.cookie.get();	
	soundEnabled = cookieSettings.sound;
	vibrationEnabled = cookieSettings.vibration;
	starsEnabled = cookieSettings.stars;
} catch (e) {
	soundEnabled = true;
	vibrationEnabled = true;
	starsEnabled = true;
}
	this.tattr = {
  			trueLabel:  'On' ,
  			trueValue:  '' ,
 			falseLabel:  'Off',
  			falseValue: '',
  			fieldName:  ''
  		}
		this.tModel = {
			value : soundEnabled, 
 			disabled: false		
		}
	this.tattr2 = {
  			trueLabel:  'On' ,
  			trueValue:  '' ,
 			falseLabel:  'Off',
  			falseValue: '',
  			fieldName:  ''
  		}
		this.tModel2 = {
			value: vibrationEnabled,
			disabled: false
		}
	this.controller.setupWidget('att-toggle', this.tattr,this.tModel );
	this.controller.setupWidget('att-toggle2', this.tattr2,this.tModel2);
	this.togglePressed = this.togglePressed.bindAsEventListener(this);
	this.togglePressed2 = this.togglePressed2.bindAsEventListener(this);
	Mojo.Event.listen(this.controller.get('att-toggle'),Mojo.Event.propertyChange,this.togglePressed);
	Mojo.Event.listen(this.controller.get('att-toggle2'),Mojo.Event.propertyChange,this.togglePressed2);

};
SettingsAssistant.prototype.showDialogBox = function(title, message){
		this.controller.showAlertDialog({
			onChoose: function(value){
			},
			title: title,
			message: message,
			choices: [{
				label: 'OK',
				value: 'OK',
				type: 'color'
			}]
		});
	}
SettingsAssistant.prototype.togglePressed = function(event){
	soundEnabled = event.value;
}
SettingsAssistant.prototype.togglePressed2 = function(event){
	vibrationEnabled = event.value;
}
SettingsAssistant.prototype.activate = function(event) {
};

SettingsAssistant.prototype.deactivate = function(event) {
	this.cookie = new Mojo.Model.Cookie('settings')
	  this.cookie.put({
		sound: soundEnabled,
		vibration: vibrationEnabled
	
	})
};

SettingsAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.get('att-toggle'),Mojo.Event.propertyChange,this.togglePressed);
	Mojo.Event.stopListening(this.controller.get('att-toggle2'),Mojo.Event.propertyChange,this.togglePressed2);
};
