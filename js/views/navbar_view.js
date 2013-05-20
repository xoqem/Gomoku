define([
  'jquery',
  'ember',
  'text!templates/navbar.hbs'
], function($, Ember, navbarTemplate) {

  Ember.TEMPLATES.navbarTemplate = Ember.Handlebars.compile(navbarTemplate);

  var NavbarView = Ember.View.extend({
    templateName: 'navbarTemplate'
  });

  return NavbarView;
});
