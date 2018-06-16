const Hand = require('../hand');

class Pair extends Hand {

  constructor(sorted_cards, maxcount_rank) {
    super(sorted_cards); 
    this.maxcount_rank = maxcount_rank;
    this.level = 2;
  }

  compare(other_hand) {
    // if not same level, first compare the rank of the pair... 
    let winner = this.compare_maxcount_rank(other_hand);
    if(!winner) { // if still tied, walk down from max rank to min rank (ok to 
      winner = this.compare_maxtomin(other_hand);
    }
    return winner;
  }

}

module.exports = Pair;

