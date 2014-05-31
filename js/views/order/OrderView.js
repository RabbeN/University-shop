define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/order/orderTemplate.html'
], function($, _, Backbone, /*SidebarView,*/ orderTemplate){

  var OrderView = Backbone.View.extend({
    el: $("#page"),

    render: function() {
      this.$el.html(orderTemplate);
      // $('.menu li').removeClass('active');
      // $('.menu li a[href="#"]').parent().addClass('active');
      // this.$el.html(homeTemplate);

      // var sidebarView = new SidebarView();
      // sidebarView.render();
 
    }

  });

  return OrderView;
  
});
