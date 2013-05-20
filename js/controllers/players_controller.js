define([
  'jquery',
  'ember',
  'models/ai',
  'models/player'
], function($, Ember, Ai, Player) {

  var PlayersController = Ember.ArrayController.extend({
    boardController: null,

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
        Player.create({
          ai: Ai.create({
            boardController: this.boardController,
            playersController: this
          }),
          icon: "images/cell-blue.png",
          name: "Blue",
          isHuman: true
        }),
        Player.create({
          ai: Ai.create({
            boardController: this.boardController,
            playersController: this
          }),
          icon: "images/cell-yellow.png",
          name: "Yellow",
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
  });

  return PlayersController;
});
