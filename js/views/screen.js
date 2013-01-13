define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/devices.html',
	'text!templates/ruller.html',
	'scroll'
], function($, _, Backbone, devicesTpl, rullerTpl){
	var View = Backbone.View.extend({
			devicesTpl: _.template(devicesTpl),
			rullerTpl: _.template(rullerTpl),
			events: {
				'click #devices a.resize': function(e){
					e.preventDefault();

					var $a = $(e.target).closest('a'),
						width = $a.data('width'),
						height = $a.data('height');

					this.resize(width, height);
				},
				'click #rotate': function(e){
					e.preventDefault();

					var width = this.$inputWidth.val(),
						height = this.$inputHeight.val();

					this.$inputWidth.val(height);
					this.$inputHeight.val(width);

					this.resize(height, width);
				},
				'mouseover #porter': function(){
					if (this.dragging) {
						return false;
					}
					this.$overlay.hide();
					this.$backdrop.show();
				},
				'mouseout #porter': function(){
					console.log(this.dragging);
					this.$overlay.show();
					this.$backdrop.hide();
				},
				'submit #form-url': function(e){
					e.preventDefault();

					this.iframe.src = this.$url.val();
				},
				'change #dimensions input': function(e){
					e.preventDefault();

					var width = this.$inputWidth.val(),
						height = this.$inputHeight.val();
					app.porter.resize(width, height);
				}
			},
			initialize: function(){

			},
			render: function(devices){
				var devicesMarkup = this.devicesTpl(devices);
				this.$('#devices').html(devicesMarkup);

				var rullerMarkup = this.rullerTpl();
				this.$('#ruller').html(rullerMarkup);

				this.$porter.resizable({ 
					handles: 'e, s, se',
					minWidth: 320,
					minHeight: 320
				});

				this.delegate();
			},
			resize: function(width, height){
				var width = parseInt(width, 10),
					height = parseInt(height, 10);

				this.$porter.animate({
					width: width + 15,
					height: height + 15
				}, 'normal');

				this.trigger('resize', width, height);
			},
			delegate: function(){
				var self = this;
				this.$porter.on('resize', function(e, ui){
					var size = ui.size;
					self.trigger('resize', size.width, size.height);
				});

				this.$porter.on('resizestart', function(e, ui){
					self.dragging = true;
					self.$overlay.show();
					self.$backdrop.hide();
				});

				this.$porter.on('resizestop', function(e, ui){
					self.dragging = false;
					self.$overlay.hide();
					self.$backdrop.show();
				});				

				this.on('resize', function(width, height){
					this.$inputWidth.val(width);
					this.$inputHeight.val(height);
				});
			}
		});
	return View;
});