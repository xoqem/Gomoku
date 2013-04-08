App.Player = Ember.Object.extend({
  ai: null, // even human players have an AI, so they can sim their turn
  icon: "",
  name: "",
  isHuman: false
});