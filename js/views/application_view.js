define([
  'jquery',
  'ember',
  'controllers/application_controller',
  'text!templates/application.hbs'
], function($, Ember, ApplicationController, applicationTemplate) {

  Ember.TEMPLATES.applicationTemplate = Ember.Handlebars.compile(applicationTemplate);

  var ApplicationView = Ember.View.extend({
    controller: ApplicationController.create(),
    templateName: 'applicationTemplate'
  });

  return ApplicationView;
});
