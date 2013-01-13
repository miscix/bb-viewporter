define([
	'jquery',
	'underscore',
	'backbone',
	'views/screen',
	'views/porter',
	'json!data/devices.json'
], function($, _, Backbone, Screen, Porter, devices){
	var App = function(){
		var self = { };

		self.view	= new Screen(self);
		// self.porter	= new Porter(self);

		self.initialize = function(){
			self.view.render(devices);
		};

		return self;
	};
	return App;
});
