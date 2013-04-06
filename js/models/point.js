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

  clone: function() {
    return App.Point.create({
      x: this.x,
      y: this.y
    });
  }
});