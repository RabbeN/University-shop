define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/errors/404Template.html'
], function($, _, Backbone, Template) {
  var Error404View = Backbone.View.extend({
    el: $("#page"),

    render: function() {
      $('nav[role="navigation"] li').removeClass('active');
      
      this.$el.html(Template);
    }
  });

  return Error404View;  
});