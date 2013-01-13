define([
	'jquery',
	'underscore',
	'backbone',
	'scroll'
], function($, _, Backbone){
	var View = Backbone.View.extend({
			events: {
				'change #font-name': function(e){
					var $name = this.$('#font-name'),
						name = $.trim($name.val());
					if (name = '') {
						$name.val(this.model.get('fontname'));
					} else {
						this.model.set('fontname', name);
					}
				},
				'click #generate-font:not(.disabled)': function(e){
					this.model.save();
					return false;
				}
			},
			initialize: function(model){
				this.model = model;

				this.render();
				this.delegate();
			},
			render: function(){
				var data = this.model.toJSON();
				
				this.$el = $('#last-font');

				var $glyphs = this.$('#last-glyphs'),
					glyphsHeight = $glyphs.height();
				$glyphs.slimScroll({ height: glyphsHeight });
			},
			delegate: function(){
				var self = this;

				this.model.glyphs.on('add remove', function(){
					if (this.length) {
						self.$('#generate-font').removeClass('disabled');
					} else {
						self.$('#generate-font').addClass('disabled');
					}
				});
			}
		});
	return View;
});