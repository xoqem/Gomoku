App.PossibleMove = Ember.Object.extend({
  point: null,
  runs: 0,
  blocks: 0

});

App.PossibleMove.reopen({
  getScore: function() {
    // TODO making the AI prefer runs over blocks makes it slightly more
    // aggressive (which seemed to play a better game), but it would be
    // nice to be able to tweak how much it waits each of these to make
    // it more or less agressive
    return (this.get('runs') * 2) + this.get('blocks');
  }
});
