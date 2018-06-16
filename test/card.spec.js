const expect = require("chai").expect;

const Card = require("../app/card");

describe("Poker Card", function() {

  describe("Invalid Card", function() {

    it('handles empty string', function() {
      const expect_throw = function() { new Card(''); };
      expect(expect_throw).to.throw(RangeError);
    });

    it('handles invalid rank, valid suit', function() {
      const expect_throw = function() { new Card('1S'); };
      expect(expect_throw).to.throw(RangeError);
    });

    it('handles valid rank, invalid suit', function() {
      const expect_throw = function() { new Card('2X'); };
      expect(expect_throw).to.throw(RangeError);
    });

    it('handles valid rank and suit but with more characters', function() {
      const expect_throw = function() { new Card('2Cd'); };
      expect(expect_throw).to.throw(RangeError);
    });

  });

  describe("Valid Card", function() {

    // add other cards if/as bugs develop

    it('constructs AS (char-char)', function() {
      const card = new Card('AS');

      expect(card.rank).to.equal('A');
      expect(card.suit).to.equal('S');
    });

    it('constructs 3D (int-char)', function() {
      const card = new Card('3D');

      expect(card.rank).to.equal('3');
      expect(card.suit).to.equal('D');
    });

    it('handles wrong case for otherwise valid card', function() {
      const card = new Card('as');

      expect(card.rank).to.equal('A');
      expect(card.suit).to.equal('S');
    });

  });

});
