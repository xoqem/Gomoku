define([
  'jquery',
  'ember',
  'text!templates/status.hbs'
], function($, Ember, statusTemplate) {

  Ember.TEMPLATES.statusTemplate = Ember.Handlebars.compile(statusTemplate);

  var StatusView = Ember.View.extend({
    templateName: 'statusTemplate'
  });

  return StatusView;
});
