require.config({
  config: {
    text: {
      onXhr: function (xhr, url) {
        xhr.overrideMimeType('text/plain; charset=utf8');
      }
    }
  },
  paths: {
    templates : '../templates',
    text: '../libs/text.min',
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min',
    handlebars: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.2.1/handlebars.min',
    ember: '//cdnjs.cloudflare.com/ajax/libs/ember.js/1.2.0/ember.min'
  },
  shim: {
    'ember': {
      deps: ['handlebars', 'jquery'],
      exports: 'Ember'
    }
  }
});

require([
  'gomoku'
], function(GomokuApp) {
  Gomoku = GomokuApp.create();
});
