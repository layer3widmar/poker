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

  describe('High Card result', function() {
    it('shows Ace-high beats King-high', function() {
      const cards = '2H 3D 5S 9C KD 2C 3H 4S 8C AH';
      const actual = game.play(cards);
      const expected = 'White wins.';
      expect(actual).to.equal(expected);
    });
  });

  describe('Full House result', function() {
    it('shows Full House beats a Flush', function() {
      const cards = '2H 4S 4C 2D 4H 2S 8S AS QS 3S';
      const actual = game.play(cards);
      const expected = 'Black wins.';
      expect(actual).to.equal(expected);
    });
  });

  describe('Highest two cards result', function() {
    it('shows King-9 beats King-8', function() {
      const cards = '2H 3D 5S 9C KD 2C 3H 4S 8C KH';
      const actual = game.play(cards);
      const expected = 'Black wins.';
      expect(actual).to.equal(expected);
    });
  });

  describe('Tie result', function() {
    it('shows unsuited K-9-5-3-2 ties unsuited K-9-5-3-2', function() {
      const cards = '2H 3D 5S 9C KD 2D 3H 5C 9S KH';
      const actual = game.play(cards);
      const expected = 'Tie.';
      expect(actual).to.equal(expected);
    });
  });

});

