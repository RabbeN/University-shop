define([
  'jquery',
  'underscore',
  'backbone',
  'models/item/ItemModel'
], function($, _, Backbone, ItemModel) {
  var ItemsCollection = Backbone.Collection.extend({
  	initialize: function(models, options) {
  		this.type = options.type;
  	},
    url: function() {
    	return '/json/' + this.type + '.json';
    },
    model: ItemModel
  });
 
  return ItemsCollection;
});
