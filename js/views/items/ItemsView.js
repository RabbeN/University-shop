define([
  'jquery',
  'underscore',
  'backbone',
  'views/pagination/PaginationView',
  'text!templates/items/itemsTemplate.html',
  'text!templates/items/itemsListTemplate.html'
], function($, _, Backbone, PaginationView, itemsTemplate, itemsListTemplate){

  var ItemsView = Backbone.View.extend({
    el: $("#page"),

    initialize: function() {
      this.currentPage = _.isUndefined(this.options.params ) || _.isUndefined(this.options.params.page ) ? 1 : this.options.params.page;
      if (!_.isUndefined(this.options.params ) && !_.isUndefined(this.options.params.page )) {
        delete this.options.params.page;
      }
      this.filterParams = {};
      this.filterParamsOld = _.isUndefined(this.options.params) ? {} : this.options.params;
      that = this;
      _.each(this.filterParamsOld, function(value, key) {
        if (value != '') {
          that.filterParams[key] = value;
        }
      });
      this.type = this.options.type;
      this.items = this.options.items.models;
    },

    events: {
      "click a#btn-filter": "filterData"
    },

    filterData: function(event) {
      $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                if (this.value != '') {
                  o[this.name].push(this.value);
                }   
            } else {
              if (this.value != '') {
                if (this.value == 'on') {
                  o[this.name] = "yes";
                } else {
                  o[this.name] = this.value;
                }
              }
            }
        });
        return o;
      };

      var form = $('#form-filter').serializeObject();
      var param = $.param(form);
      if (param != '' || Backbone.history.fragment.split('?').length > 1) {
        if (param != '') param = "?" + param;
        Backbone.history.navigate('#/' + this.type + param, false);
      }
      return false;
    },

    render: function() {
      $('nav[role="navigation"] li').removeClass('active');
      $('nav[role="navigation"] li a[href="' + window.location.hash + '"]').parent().addClass('active');

      var data = {
        type: this.type,
        _: _
      };
      var compiledTemplate = _.template( itemsTemplate, data );
      this.$el.html( compiledTemplate );

      var itemsPerPage = 15;
      var currentPage = this.currentPage;
      var filterItems = this.items;
      _.each(this.filterParams, function(value, key) {
        filterItems = _.filter(filterItems, function(item) {
          if (key == 'price_start') {
            var exist = !(_.isUndefined(item.get("price").min));
            return exist && parseInt(item.get("price").min) >= value;
          } else if (key == 'price_end') {
            var exist = !(_.isUndefined(item.get("price").min));
            return exist && parseInt(item.get("price").min) <= value;
          } else {
            var exist = !(_.isUndefined(item.get("techInfo")[key]));
            return exist && item.get("techInfo")[key].value == value;
        }
        });
        if (value == 'yes') {
          $('#form-filter [name=' + key + ']').prop("checked", true);
        } else {
          $('#form-filter [name=' + key + ']').val(that.filterParamsOld[key]);
        }
       });
      var totalPages = filterItems.length / itemsPerPage;
      filterItems = filterItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      var data = {
        items: filterItems,
        type: this.type,
        _: _
      };
      
      var compiledTemplate = _.template( itemsListTemplate, data );
      $("#items").html( compiledTemplate );

      var filter = $.param(this.filterParams);
      if (filter != '') filter += '&';
      var paginationView = new PaginationView({ currentPage: currentPage, totalPages: totalPages, type: this.type, filter:filter }); 
      paginationView.render();
    }
  });

  return ItemsView;
});
