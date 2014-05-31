define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/items/itemTemplate.html'
], function($, _, Backbone, itemTemplate){

  var ItemView = Backbone.View.extend({
    el: $("#page"),

    initialize: function() {
      this.item = this.options.item;
      this.type = this.options.type;
    },

    render: function() {
      // $('nav[role="navigation"] li').removeClass('active');
      // $('nav[role="navigation"] li a[href="' + window.location.hash + '"]').parent().addClass('active');

      var data = {
        type: this.type,
        item: this.item,
        _: _
      };
      
      var compiledTemplate = _.template( itemTemplate, data );
      this.$el.html( compiledTemplate );
    },
  });

  return ItemView;
});
