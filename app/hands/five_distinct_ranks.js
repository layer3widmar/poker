const Hand = require('../hand');

module.exports = class FiveDistinctRanks extends Hand {

  constructor(sorted_cards, is_flush) {
    super(sorted_cards); 

    this.is_flush = is_flush;

    // is a straight if 5 buckets and max numeric_rank is 4 more than min
    this.is_straight = (sorted_cards[sorted_cards.length-1].numeric_rank - sorted_cards[0].numeric_rank === 4);

    this.set_level();
  }

  // use the flags and hi card to set the level
  set_level() {
    let level,
        is_flush = this.is_flush,
        is_straight = this.is_straight;

    if( is_flush && is_straight ) { // rf or sf
      if( this.sorted_cards[this.sorted_cards.length-1].rank === 'A' ) { // rf
        level = 10;
      } else { // sf
        level = 9;
      }
    } else {
      if( !(is_flush || is_straight) ) { // hi-card
        level = 1;
      } else {
        if( is_flush ) { // flush 8-P
          level = 6;
        } else { // only thing left is straight
          level = 5;
        }
      }
    }
    
    this.level = level;
  }

  compare(other_hand) {
    let winner = this.compare_level(other_hand);

    // if same level; compare cards in descending order until a winner (or declare tie)
    if( !winner ) {
      winner = this.compare_maxtomin(other_hand);
    }

    return winner;
  }

}
