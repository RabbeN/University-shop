define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, homeTemplate) {
  var HomeView = Backbone.View.extend({
    el: $("#page"),

    render: function() {
      $('nav[role="navigation"] li').removeClass('active');
      
      this.$el.html(homeTemplate);
    }
  });

  return HomeView;  
});