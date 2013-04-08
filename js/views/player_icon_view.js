App.PlayerIconView = Ember.View.extend({
  tagName: 'img',
  attributeBindings: ['src'],

  src: function () {
    var player = this.get('content');
    return player ? player.icon : 'images/cell.png';
  }.property('content')
});