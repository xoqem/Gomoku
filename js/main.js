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
      text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min',
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1-rc2/jquery.min',
    handlebars: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.min',
    ember: '//cdnjs.cloudflare.com/ajax/libs/ember.js/1.5.1/ember.min'
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
