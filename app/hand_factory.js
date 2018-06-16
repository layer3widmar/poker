const Card = require('./card');
const FiveDistinctRanks = require('./hands/five_distinct_ranks');
const FourOfaKind = require('./hands/four_ofa_kind');
const FullHouse = require('./hands/full_house');
const Pair = require('./hands/pair');
const ThreeOfaKind = require('./hands/three_ofa_kind');
const TwoPairs = require('./hands/two_pairs');

/*
 * Constructs appopriate hand type with make_hand(), with supporting methods.
 */
module.exports = class HandFactory {

   // determine hand properties and return instance of corresponding hand type 
   // @card_strings is a space-delimited string of card codes (rank code, suit code)
   static make_hand(card_strings) {

    // turn strings to objects
    const cards = card_strings.map(card_str => new Card(card_str));

    // break hand into properties
    const ranks_map = HandFactory.make_ranks_map();
    let is_flush = true,    // start true, switch false at 1st sign of falseness
        sorted_cards = [];

    // determine high card and flush-ness
    cards.forEach(card => {
      ranks_map[card.numeric_rank] = ++ranks_map[card.numeric_rank];
      sorted_cards = HandFactory.add_to_sorted(sorted_cards, card);
      is_flush = is_flush && card.suit === sorted_cards[0].suit;
    });

    /* if not a flush, or straight, then the # of entries and max value tells the whole story
     * (if 5 entries, check for straight)
     *
     * # entries.(level) (max value)
     * 5.10 (NA) - rf: tie - is_straight is_flush, hi-card is A
     * 5.9 (NA) - sf: compare high cards - is_straight is_flush
     * 5.6 (NA) - flush: compare cards in order - !is_straight is_flush
     * 5.5 (NA) - straight: compare high cards - is_straight !is_flush
     * 5.1 (NA) - Hi card: compare each of the cards, in order - !is_straight !is_flush
     * 
     * 4.2 (NA)- Pair: compare pair, then remaining cards in order (keep cards in rank order!)
     * 
     * 3.4 (3) - 3 ok:  compare rank of set, then remaining cards in order
     * 3.3 (2) - Two pairs: compare pair 1, then pair 2, then remaining card
     * 
     * 2.8 (4) - 4 ok:  compare rank of set, then remaining card
     * 2.7 (3) - full house: compare rank of set, then rank of pair
     */
    const entries = Object.entries(ranks_map);
    let hand,                 // the hand subtype instance to return
        maxcount_ranknum = 1, // the rank that had the highest count (default to bogus rank)
        max_count = 0;        // the highest count

    for( const [k,v] of entries ) {
      if( max_count < v ) {
        max_count = v;
        maxcount_ranknum = +k;
      }
    }

    switch( entries.length ) {
      case 4: // must be pair
        hand = new Pair(sorted_cards, maxcount_ranknum);
        break;
      case 5:
        hand = new FiveDistinctRanks(sorted_cards, is_flush);
        break;
      default: // 3 or 2 buckets - first find max

        if( entries.length === 3 ) {
          if( max_count === 3 ) {
            hand = new ThreeOfaKind(sorted_cards, maxcount_ranknum);
          } else {
            hand = new TwoPairs(sorted_cards, ranks_map);
          }
        } else {
          if( max_count === 3 ) {
            hand = new FullHouse(sorted_cards, maxcount_ranknum);
          } else {
            hand = new FourOfaKind(sorted_cards, maxcount_ranknum);
          }
        }
    }

    return hand;
  }

  // produces a 'pure map' object where absent properties return 0 (for easy increment)
  static make_ranks_map() {
    const handler = {
      get: function(obj, prop) {
          return prop in obj ? obj[prop] : 0;
      }
    };
    const ranks_map = new Proxy(Object.create(null), handler);
    return ranks_map;
  }

  // assumes @list is already numeric_rank-sorted array of cards, and card is the value to be added.
  // since list. is <= 5, perf not critical
  static add_to_sorted(list, card) {
    if( !list.length ) {
      list.push(card); 
      return list; 
    }

    let i = 0;
    for( ; i<list.length; ) {
      if( list[i].numeric_rank > card.numeric_rank ) break;
      i++;
    }
    list.splice(i, 0, card);
    return list;
  }

}
