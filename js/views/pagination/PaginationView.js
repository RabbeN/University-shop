define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/pagination/paginationTemplate.html'
], function($, _, Backbone, paginationTemplate){

  var PaginationView = Backbone.View.extend({
    el: $(".paging"),

    initialize: function() {
      this.currentPage = this.options.currentPage;
      this.totalPages = this.options.totalPages;
      this.type = this.options.type;
      this.filter = this.options.filter;
    },

    render: function(){
      var data = {
        currentPage: this.currentPage,
        totalPages: this.totalPages,
        type: this.type,
        filter: this.filter
      };

      var compiledTemplate = _.template( paginationTemplate, data );
    
      $(".paging").append(compiledTemplate);
    },
  });

  return PaginationView;
  
});
