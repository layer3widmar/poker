// const HandFactory = require('./hand_factory');
// import {HandFactory} from './hand_factory';

/**
 * A hand is a set of 5 cards.
 */
module.exports = class Hand {

 constructor(sorted_cards) {
    this.sorted_cards = sorted_cards;
    this.level = -1; // will be overwritten by each subtype.  Placed here to expose if subclass forgot to set, & as documentation.
  }

  // return 1 if this hand's hi card is higher than the other hand's hi card, 0 if they're the same, and -1 otherwise.
  compare(other_hand) {
    throw "subclasses must override this with their own compare";
  }

  // return 1 if this hand's hi card is higher than the other hand's hi card, 0 if they're the same, and -1 otherwise.
  compare_level(other_hand) {
    return (this.level - other_hand.level);
  }

  // compares ranks of the highest-multiple rank in the hands - 
  // NOTE: this is the most common comparison, so it got pulled up into hand
  compare_maxcount_rank(other_hand) {
    let winner = this.compare_level(other_hand);

    if( !winner ) { 
      winner = this.maxcount_rank - other_hand.maxcount_rank;
    }

    return winner;
  }

  // return 1 if this hand's hi card is higher than the other hand's hi card, 0 if they're the same, and -1 otherwise.
  compare_maxtomin(other_hand) {
    let winner; 
    for( let i=this.sorted_cards.length-1; i>-1; i-- ) { 
      winner = this.sorted_cards[i].numeric_rank - other_hand.sorted_cards[i].numeric_rank; 
      if(winner) break; // keep going if no winner 
    }
    return winner;
  }

  toString() {
    return this.sorted_cards.toString();
  }

}
