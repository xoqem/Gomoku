define([
  'jquery',
  'ember',
  'models/possible_move'
], function($, Ember, PossibleMove) {

  var PossibleMovesMap = Ember.Object.extend({
    possibleMoves: null // Ember.Map - keyed by point
  });

  PossibleMovesMap.reopen({
    init: function() {
      this.set('possibleMoves', Ember.Map.create({}));
    },

    contains: function(point) {
      var possibleMoves = this.get('possibleMoves');
      var key = point.getKey();
      return possibleMoves.has(key);
    },

    getPossibleMove: function(point) {
      var possibleMoves = this.get('possibleMoves');
      var key = point.getKey();
      if (!possibleMoves.has(key)) {
        possibleMoves.set(key, PossibleMove.create({point: point}));
      }

      return possibleMoves.get(key);
    },

    getBestPossibleMove: function(point) {
      var score;
      var bestScore = 0;
      var bestPossibleMoves = []; // array of moves with equal highest scores
      this.get('possibleMoves').forEach(function(key, possibleMove) {
        if (possibleMove.score == bestScore) {
          bestPossibleMoves.push(possibleMove);
        } if (possibleMove.score > bestScore) {
          bestScore = possibleMove.score;
          bestPossibleMoves = [possibleMove];
        }
      });

      if (bestPossibleMoves.length > 0) {
        // pick a random move from our equal best possible moves
        var index = Math.floor(Math.random() * bestPossibleMoves.length);
        return bestPossibleMoves[index];
      }

      return null;
    }
  });

  return PossibleMovesMap;
});
