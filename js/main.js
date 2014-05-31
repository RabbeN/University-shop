// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',

    templates: '../templates',
    
    // Plugins
    bootstrap: 'libs/plugins/bootstrap-min',
    paginator: 'libs/plugins/backbone.paginator-min',
    text: 'libs/plugins/text'
  },

  shim: {
    bootstrap: [ 'jquery' ],
    paginator: {
      deps: ['backbone'],
      exports: 'Backbone.Paginator'
    }
  }

});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
