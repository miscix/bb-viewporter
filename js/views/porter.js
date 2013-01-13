define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/devices.html',
	'jqueryui'
], function($, _, Backbone, tpl){
	var View = Backbone.View.extend({
			tpl: _.template(tpl),
			events: {
				'click #overlay': function(){
					this.$overlay.hide();
				},
				'load': function(e){
					// $('iframe').load(function() {
						// this.style.height =
						// this.contentWindow.document.body.offsetHeight + 'px';
					// });
					console.log(e, this.el.contentWindow);

				}
			},
			initialize: function(){
				this.$el = $('#porter');
				// console.log(this.$el);
				this.el = this.$el.get(0);

				this.$iframe = this.$('iframe');
				this.iframe = this.$iframe.get(0);

				this.$overlay = this.$('#overlay');

				this.render();

			},
			render: function(){
				this.$el.resizable({ handles: "e, s, se" });	
				this.delegate();
			},
			delegate: function(){
				
			},
			load: function(url){
				this.iframe.src = url;
			},
			resize: function(width, height){
				// console.log(width, height);
				width = parseInt(width);
				height = parseInt(height);
				// this.trigger('resize', { width: width, height: height });

				this.$el
					.width(width + 15)
					.height(height);
			}
		});
	return View;
});