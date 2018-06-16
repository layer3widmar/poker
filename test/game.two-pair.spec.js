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

  describe('Two Pair result', function() {

    describe('Two Pair v Two Pair', function() {

      it('shows Ace-Deuce beats King-Trey', function() {
        const cards = '2H 2D 5S AC AD KC 3H 3S 8C KH';
        const actual = game.play(cards);
        const expected = 'Black wins.';
        expect(actual).to.equal(expected);
      });

      it('shows Jack-Deuce (Ace) ties Jack-Deuce (Ace) ', function() {
        const cards = '2H 2D JS AC JD JC AH JS 2C 2H';
        const actual = game.play(cards);
        const expected = 'Tie.';
        expect(actual).to.equal(expected);
      });

    });

  });

});

