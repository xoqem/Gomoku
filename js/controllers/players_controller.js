App.playersController = Ember.ArrayController.extend({
  content: null,
  playerIndex: NaN,
  player: function() {
    var index = this.get('playerIndex');
    if (isNaN(index)) return null;
    return this.objectAt(index);
  }.property('playerIndex'),

  initialize: function() {
    // create the players
    var players = [
      App.Player.create({
        icon: "images/cell-blue.png",
        name: "Blue",
        isHuman: true
      }),
      App.Player.create({
        icon: "images/cell-red.png",
        name: "Red",
        isHuman: false
      })
    ];

    this.set('content', players);
    this.set('playerIndex', 0);
  },

  nextPlayer: function() {
    var index = this.get('playerIndex');
    index++;
    if (index >= this.get('length')) index = 0;
    this.set('playerIndex', index);
  }
}).create();
