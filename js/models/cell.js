define([
  'jquery',
  'ember'
], function($, Ember) {

  var Cell = Ember.Object.extend({
    point: null,
    player: null
  });

  return Cell;
});
