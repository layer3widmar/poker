const expect = require('chai').expect;

const Game = require('../app/game');
const Player = require('../app/player');

describe('Poker Game', function() {
  
  let player1, player2;
  let game;

  beforeEach(function() {

    player1 = new Player('Black');
    player2 = new Player('White');

    game = new Game();

    game.add(player1).add(player2);

  });

  describe('Comparing hand levels', function() {

    /** 
     * Test Royal Flush compared to other hand levels
     *
     * NOTE: 
     *   Once a level comparison is tested, it is not repeated later on.
     *   Meaning, if Royal Flush is tested vs. Straight Flush, 
     *     Straight Flush is not then tested against Royal Flush.
     *
     */
    describe('Royal Flush', function() {

     it('shows Royal Flush beats Straight Flush', function() {
        const cards = 'AS QS TS KS JS 8H JH 9H TH 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Four of a kind loses to Royal Flush', function() {
        const cards = '2C 2D 2H 2S AC AS QS TS KS JS';
        const actual = game.play(cards);
        const expected = 'White wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Full House loses to Royal Flush', function() {
        const cards = '2C AD AH 2S AC AS QS TS KS JS';
        const actual = game.play(cards);
        const expected = 'White wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Royal Flush beats Flush', function() {
        const cards = 'AS QS TS KS JS 8H JH 2H TH 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Royal Flush beats Straight', function() {
        const cards = 'AS QS TS KS JS 8S JH 9H TD 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Royal Flush beats Three of a kind', function() {
        const cards = 'AS QS TS KS JS 8H JH 8S TH 8D';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Royal Flush beats Two Pair', function() {
        const cards = 'AS QS TS KS JS 8H JH 8S TH TD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Royal Flush beats a Pair', function() {
        const cards = 'AS QS TS KS JS 8H JH 8S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Royal Flush beats Ace high', function() {
        const cards = 'AS QS TS KS JS 8H JH 3S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

    });

    /** 
     * Test Straight Flush compared to other hand levels (not already tested)
     */
    describe('Straight Flush', function() {

     it('shows Four of a kind loses to Straight Flush', function() {
        const cards = '3C 3D 3H 3S AS 9S QS TS KS JS';
        const actual = game.play(cards);
        const expected = 'White wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Full House loses to Straight Flush', function() {
        const cards = '2C 2D AH 2S AC 8S QS TS 9S JS';
        const actual = game.play(cards);
        const expected = 'White wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Straight Flush beats Flush', function() {
        const cards = '9S QS TS KS JS 8H 3H 2H TH 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Straight Flush beats Straight', function() {
        const cards = '9S QS TS KS JS 8S 6H 9H TD 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Straight Flush beats Three of a kind', function() {
        const cards = '9S QS TS KS JS 8H 3H 3S TH 3D';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Straight Flush beats Two Pair', function() {
        const cards = '9S QS TS KS JS 8H AH AS TH TD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Straight Flush beats a Pair', function() {
        const cards = '9S QS TS KS JS AH JH 8S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Straight Flush beats Ace high', function() {
        const cards = '9S QS TS KS JS 8H JH 3S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

    });

    /** 
     * Test Four of a Kind compared to other hand levels (not already tested)
     */
    describe('Four of a Kind', function() {

      it('shows Full House loses to Four of a Kind', function() {
        const cards = '2C 2D AH 2S AC 8S 8C 2H 8H 8D';
        const actual = game.play(cards);
        const expected = 'White wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Four of a Kind beats Flush', function() {
        const cards = '8S 8C 2C 8H 8D 4H 3H 2H TH 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Four of a Kind beats Straight', function() {
        const cards = '8S 8C 2H 8H 8D 3D 6H 5H 4D 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Four of a Kind beats Three of a kind', function() {
        const cards = '8S 8C 2H 8H 8D 3H JH JS TH JD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Four of a Kind beats Two Pair', function() {
        const cards = '8S 8C 2H 8H 8D 3H AH AS TH TD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Four of a Kind beats a Pair', function() {
        const cards = '8S 8C 2H 8H 8D AH JH 2S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Four of a Kind beats Ace high', function() {
        const cards = '8S 8C 2H 8H 8D 9H JH 3S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

    });

    /** 
     * Test Full House compared to other hand levels (not already tested)
     */
    describe('Full House', function() {

      it('shows Full House beats Flush', function() {
        const cards = '8S 2C 2D 8H 8D 4H 3H 2H TH 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Full House beats Straight', function() {
        const cards = '8S 2C 2H 8H 8D 3S 6H 5H 4D 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Full House beats Three of a kind', function() {
        const cards = '8S 2C 2H 8H 8D 3H JH JS TH JD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Full House beats Two Pair', function() {
        const cards = '8S 2C 2H 8H 8D 3H AH AS TH TD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Full House beats a Pair', function() {
        const cards = '8S 2C 2H 8H 8D AH JH 3S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Full House beats Ace high', function() {
        const cards = '8S 2C 2H 8H 8D 4H JH 3S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

    });

    /** 
     * Test Flush compared to other hand levels (not already tested)
     */
    describe('Flush', function() {

      it('shows Flush beats Straight', function() {
        const cards = '6C JC 8C 2C AC 8S 6H 9H TD 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Flush beats Three of a kind', function() {
        const cards = '6C JC 8C 2C AC 8H JH JS TH JD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Flush beats Two Pair', function() {
        const cards = '6C JC 8C 2C AC 8H AH AS TH TD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Flush beats a Pair', function() {
        const cards = '6C JC 8C 2C AC AH JH 8S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Flush beats Ace high', function() {
        const cards = '6C JC 8C 2C AC 8H JH 3S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

    });

    /** 
     * Test Straight compared to other hand levels (not already tested)
     */
    describe('Straight', function() {

      it('shows Straight beats Three of a kind', function() {
        const cards = '2D 4H 5H 3C 6H 8H JH JS TH JD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Straight beats Two Pair', function() {
        const cards = '2D 4H 5H 3C 6H 8H AH AS TH TD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Straight beats a Pair', function() {
        const cards = '2D 4H 5H 3C 6H AH JH 8S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Straight beats Ace high', function() {
        const cards = '2D 4H 5H 3C 6H 8H JH 3S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

    });

    /** 
     * Test Three of a Kind compared to other hand levels (not already tested)
     */
    describe('Three of a Kind', function() {

      it('shows Three of a Kind beats Two Pair', function() {
        const cards = '4H 2H 8D 4C 4S 8H AH AS TH TD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Three of a Kind beats a Pair', function() {
        const cards = '4H 2H 8D 4C 4S AH JH 8S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Three of a Kind beats Ace high', function() {
        const cards = '4H 2H 8D 4C 4S 8H JH 3S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

    });

    /** 
     * Test Two Pair compared to other hand levels (not already tested)
     */
    describe('Two Pair', function() {

      it('shows Two Pair beats a Pair', function() {
        const cards = '4H 2H 8D 4C 8H AH JH 8S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Two Pair beats Ace high', function() {
        const cards = '4H 2H 8D 4C 8H 5H JH 3S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

    });

    /** 
     * Test Pair compared to other hand levels (not already tested)
     */
    describe('Pair', function() {

      it('shows Pair beats Ace high', function() {
        const cards = '4H 2H 8D 4C 9H 8H JH 3S TH AD';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

    });

  });

});
