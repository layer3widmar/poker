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

    describe('Royal Flush', function() {

      it('shows Royal Flush ties Royal Flush', function() {
        const cards = 'AS QS TS KS JS KH JH QH TH AH';
        const actual = game.play(cards);
        const expected = 'Tie.';
        expect(actual).to.equal(expected);
      });

      it('shows Royal Flush beats Straight Flush', function() {
        const cards = 'AS QS TS KS JS 8H JH 9H TH 7H';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Four of a kind loses to Royal Flush', function() {
        const cards = '2C 2D 2H 2S AS AS QS TS KS JS';
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
     * Test straight flush compared to other hand levels (not already tested)
     */
    describe('Straight Flush', function() {

      it('shows 7-high Straight Flush ties a 7-high Straight Flush', function() {
        const cards = '7S 3S 4S 6S 5S 3H 4H 6H 5H 7H';
        const actual = game.play(cards);
        const expected = 'Tie.';
        expect(actual).to.equal(expected);
      });

      it('shows Four of a kind loses to Straight Flush', function() {
        const cards = 'KC KD KH KS AS 9S QS TS KS JS';
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
        const cards = '9S QS TS KS JS 8H JH JS TH JD';
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

  });

});

