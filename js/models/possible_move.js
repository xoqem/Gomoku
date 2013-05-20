define([
  'jquery',
  'ember'
], function($, Ember) {

  var PossibleMove = Ember.Object.extend({
    point: null,
    score: 0
  });

  return PossibleMove;
});
