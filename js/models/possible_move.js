App.PossibleMove = Ember.Object.extend({
  point: null,
  runs: 0,
  blocks: 0

});

App.PossibleMove.reopen({
  getScore: function() {
    return this.get('runs') + this.get('blocks');
  }
});
