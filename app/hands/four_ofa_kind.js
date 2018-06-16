const Hand = require('../hand');

class FourOfaKind extends Hand {

  constructor(sorted_cards, maxcount_rank) {
    super(sorted_cards); 
    this.maxcount_rank = maxcount_rank;
    this.level = 8;
  }

  compare(other_hand) {
    // if not same level, compare the rank of the 4-ofa-kind card only (since only one hand can have 4 of the same rank)
    return this.compare_maxcount_rank(other_hand);
  }

}

module.exports = FourOfaKind;
