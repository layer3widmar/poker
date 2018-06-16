/*
 * A poker player.  
 *
 * Has a name, can be dealt a hand, and has a static 'rank_hands' method used to rank hands between two players.
 *
 * Can be safely re-used.
 */
module.exports = class Player {

  constructor(name) {
    this.name = name;
  }

  // deal to this player this hand
  deal(hand) {
    this.hand = hand;
  }

  // rank players by comparing their hands
  static rank_hands(a,b) {
    return a.hand.compare(b.hand);
  }

  toString() {
    return this.name;
  }

}
