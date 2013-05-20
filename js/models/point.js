define([
  'jquery',
  'ember'
], function($, Ember) {

  var Point = Ember.Object.extend({
    x: 0,
    y: 0
  });

  Point.reopen({
    add: function(point) {
      return Point.create({
        x: this.x + point.x,
        y: this.y + point.y
      });
    },

    scale: function(value) {
      return Point.create({
        x: this.x * value,
        y: this.y * value
      });
    },

    clone: function() {
      return Point.create({
        x: this.x,
        y: this.y
      });
    },

    getKey: function() {
      return 'p_' + this.get('x') + '_' + this.get('y');
    }
  });

  return Point;
});
