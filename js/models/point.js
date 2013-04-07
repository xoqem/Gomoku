App.Point = Ember.Object.extend({
  x: 0,
  y: 0
});

App.Point.reopen({
  add: function(point) {
    return App.Point.create({
      x: this.x + point.x,
      y: this.y + point.y
    });
  },

  scale: function(value) {
    return App.Point.create({
      x: this.x * value,
      y: this.y * value
    });
  },

  clone: function() {
    return App.Point.create({
      x: this.x,
      y: this.y
    });
  }
});