import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('rental', params.rental_id);
  },
  actions: {
    updateRental(rental, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          rental.set(key, params[key]);
        }
      });
      rental.save();
    },
    destroyRental(rental) {
      rental.destroyRecord();
      this.transitionTo('index');
    },
    saveReview(params) {
    var newReview = this.store.createRecord('review', params);
    newReview.save();
    this.transitionTo('index');
    }
  }
});
