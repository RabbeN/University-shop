define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'collections/items/ItemsCollection',
  'views/home/HomeView',
  'views/order/OrderView',
  'views/static/ContactView',
  'views/items/ItemsView',
  'views/items/ItemView',
  'views/errors/Error404View'
], function($, _, Backbone, Bootstrap, ItemsCollection, HomeView, OrderView, ContactView, ItemsView, ItemView, Error404View) {  
  var AppRouter = Backbone.Router.extend({
    routes: {
      '':                   'showHome',

      'phones':             'showItems',
      'phones?:params':     'showItems',
      'phones/:id':         'showItemDetail',

      'tablets':            'showItems',
      'tablets?:params':    'showItems',
      'tablets/:id':        'showItemDetail',

      'photos':             'showItems',
      'photos?:params':     'showItems',
      'photos/:id':         'showItemDetail',

      'players':            'showItems',
      'players?:params':    'showItems',
      'players/:id':        'showItemDetail',

      'order':              'showOrder',
      'contact':            'showContact',

      // Default
      '*undefined':         'show404'
    },
    _extractParameters: function(route, fragment) {
      var result = route.exec(fragment).slice(1);
      result.unshift(deparam(result[result.length-1]));
      return result.slice(0,-1);
    }
  });
  
  var initialize = function() {

    var that = this;

    function initializeItems() {
      that.phones = new ItemsCollection([], { type: "phones" });
      that.fetchingPhones = that.phones.fetch({
        success: function(items) {
          _.each(items.models, function(item) {
            var arrayLink = item.get("itemLink").split('/');
            item.id = arrayLink[arrayLink.length - 2];
          });
        }
      })

      that.tablets = new ItemsCollection([], { type: "tablets" });
      that.fetchingTablets = that.tablets.fetch({
        success: function(items) {
          _.each(items.models, function(item) {
            var arrayLink = item.get("itemLink").split('/');
            item.id = arrayLink[arrayLink.length - 2];
          });
        }
      })

      that.photos = new ItemsCollection([], { type: "photos" });
      that.fetchingPhotos = that.photos.fetch({
        success: function(items) {
          _.each(items.models, function(item) {
            var arrayLink = item.get("itemLink").split('/');
            item.id = arrayLink[arrayLink.length - 2];
          });
        }
      })

      that.players = new ItemsCollection([], { type: "players" });
      that.fetchingPlayers = that.players.fetch({
        success: function(items) {
          _.each(items.models, function(item) {
            var arrayLink = item.get("itemLink").split('/');
            item.id = arrayLink[arrayLink.length - 2];
          });
        }
      })
    };
    initializeItems();

    var app_router = new AppRouter;

    app_router.on('route:showItems', function(params) {
      var type = Backbone.history.fragment.split('?')[0];
      var items;
      var fetching;

      if (type == 'phones') {
        items = that.phones;
        fetching = that.fetchingPhones;
      } else if (type == 'tablets') {
        items = that.tablets;
        fetching = that.fetchingTablets;
      } else if (type == 'photos') {
        items = that.photos;
        fetching = that.fetchingPhotos;
      } else if (type == 'players') {
        items = that.players;
        fetching = that.fetchingPlayers;
      }

      fetching.done(function() {
        var itemsView = new ItemsView({ params: params, type: type, items: items });
        itemsView.render();
      })
    });

    app_router.on('route:showItemDetail', function(id) {
      var type = Backbone.history.fragment.split('/')[0];
      var itemId = Backbone.history.fragment.split('/')[1];
      var fetching;
      if (type == 'phones') {
        items = that.phones;
        fetching = that.fetchingPhones;
      } else if (type == 'tablets') {
        items = that.tablets;
        fetching = that.fetchingTablets;
      } else if (type == 'photos') {
        items = that.photos;
        fetching = that.fetchingPhotos;
      } else if (type == 'players') {
        items = that.players;
        fetching = that.fetchingPlayers;
      }

      fetching.done(function() {
        _.each(items.models, function(item) {
          if (itemId == item.id) {
            var itemView = new ItemView({ type: type, item: item });
            itemView.render();
          }
        });
      })
    });

    app_router.on('route:showOrder', function() {
      var orderView = new OrderView();
      orderView.render();
    });

    // Static pages
    app_router.on('route:showContact', function() {
      var contactView = new ContactView();
      contactView.render();
    });

    app_router.on('route:showHome', function(actions) {
      var homeView = new HomeView();
      homeView.render();
    });

    app_router.on('route:show404', function(actions) {
      var error404View = new Error404View();
      error404View.render();
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});

// simplified $.deparam analog
var deparam = function(paramString){
    var result = {};
    if( ! paramString){
        return result;
    }
    $.each(paramString.split('&'), function(index, value){
        if(value){
            var param = value.split('=');
            result[param[0]] = param[1];
        }
    });
    return result;
};
