define([
  'jquery',
  'underscore',
  'backbone',
  //'views/sidebar/SidebarView',
  'text!templates/static/contactTemplate.html'
], function($, _, Backbone, /*SidebarView,*/ contactTemplate){

  var ContactView = Backbone.View.extend({
    el: $("#page"),

    render: function(){
      this.$el.html(contactTemplate);
      // $('.menu li').removeClass('active');
      // $('.menu li a[href="#"]').parent().addClass('active');
      // this.$el.html(homeTemplate);

      // var sidebarView = new SidebarView();
      // sidebarView.render();
 
    }

  });

  return ContactView;
  
});
