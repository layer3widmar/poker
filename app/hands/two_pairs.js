const Hand = require('../hand');

class TwoPairs extends Hand {

  // @ranks_map - map of numeric_rank of each card to the count for that rank
  constructor(sorted_cards, ranks_map) {
    super(sorted_cards); 
    this.ranks_map = ranks_map;
    this.level = 3;
  }

  compare(other_hand) {
    let winner = this.compare_level(other_hand);

    if( !winner ) {
      // iterate in descending order, and quit at first pair winner.   If no pair winner, compare the remaining card.
      let single_card_rank;

      for( let i=this.sorted_cards.length-1; i>-1; i-- ) {
        const my_numeric_rank = this.sorted_cards[i].numeric_rank;

        if( this.ranks_map[my_numeric_rank] === 2 ) { 
          winner = my_numeric_rank - other_hand.sorted_cards[i].numeric_rank; 
          if(winner) break;
        } else { // single card is higher than at least one of the pairs; save it for later...
          single_card_rank = my_numeric_rank;
        }

        winner = this.sorted_cards[i].numeric_rank  - other_hand.sorted_cards[i].numeric_rank; 
      }

    }
    return winner;
  }

}

module.exports = TwoPairs;
