/**
 * Represents a playing card. 
 * 
 * A card has a rank code and a suit code, and a numerical sequence value used for internal comparisons.
 * 
 * A card is constructed out of a two-character sequence that combines these two codes, rank first.
 *
 * valid ranks: 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A
 * valid suits: C, D, H, S
 *
 * ASSUMPTIONS:
 *  case matters.   wrong case will be rejected as invalid.
 */
class Card {

  // @ranksuit is concatenation of rank char and suit char
  constructor(ranksuit) {

    const re_match = /^([2-9TJQKA])([CDHS])$/i.exec(ranksuit);

    if( !(re_match && re_match.length == 3) ) 
      throw RangeError(`ranksuit must be 2-char combination of rank and suit; it is ${ranksuit}`);

    [,this.rank,this.suit] = re_match;

    this.rank = this.rank.toUpperCase();
    this.suit = this.suit.toUpperCase();

    this.numeric_rank = Card.get_rank_num(this.rank);

    if (Card.check_duplicates)
      Card.ensure_no_duplicates(this);
  }

  /* return numeric rank based on rank string
   * NOTE: lowest num is lowest rank */
  static get_rank_num(rank_str) {
    return Number.isInteger(+rank_str) && parseInt(rank_str) || Card.translate_rank(rank_str);
  }

  // only called for non-integer ranks
  static translate_rank(rank_str) {
    switch(rank_str) {
      case 'T': 
        return 10;
      case 'J': 
        return 11;
      case 'Q': 
        return 12;
      case 'K': 
        return 13;
      case 'A': 
        return 14;
    }
  }

  /**
   * Ensure no duplicate cards.
   */
  static ensure_no_duplicates(card) {

    // create map of unique cards, or reset it if already full (from prior run).
    if( !Card.uniques ) {
      Card.reset_duplicate_check();
    }

    const key = card.toString();
    if( Card.uniques[key] ) throw "Duplicate card found.  Not a valid poker game!";

    Card.uniques[key] = true;
  }

  static reset_duplicate_check() {
    Card.uniques = Object.create(null);
  }

  toString() {
    return `${this.rank}${this.suit} (${this.numeric_rank})`;
  }

}
module.exports = Card;

if (typeof require != 'undefined' && require.main==module) {
    console.log(new Card(process.argv[2]));
}
