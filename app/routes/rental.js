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
      var rental_deletions = rental.get('review').map(function(review){
        return review.destroyRecord();
      });
      Ember.RSVP.all(rental_deletions).then(function(){
        return rental.destroyRecord();
      });
      this.transitionTo('index');
    },
    saveReview(params) {
      var rental = params.rental;
      var newReview = this.store.createRecord('review', params);
      rental.get('review').addObject(newReview);
      newReview.save().then(function(){
        return rental.save();
      });
    },
    destroyReview(review){
      review.destroyRecord();
    }
  }
});
