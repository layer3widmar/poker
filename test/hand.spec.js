const expect = require('chai').expect;

const HandFactory = require('../app/hand_factory');
const FiveDistinctRanks = require('../app/hands/five_distinct_ranks');
const FourOfaKind = require('../app/hands/four_ofa_kind');
const ThreeOfaKind = require('../app/hands/three_ofa_kind');
const FullHouse = require('../app/hands/full_house');
const Pair = require('../app/hands/pair');
const TwoPairs = require('../app/hands/two_pairs');

// NOTE: simple construction of all types of hands covered here, for simplicity
// - if this file size grows, probably break it into subtype-specific test files

describe('Poker Hand', function() {

  it('makes valid hi-card hand OK', function() {
    const hand_str = '2H 3D 5S 9C KD'.split(' ');
    const hand = HandFactory.make_hand(hand_str);
    expect(hand instanceof FiveDistinctRanks).to.true;
    expect(hand.is_straight).to.be.false;
    expect(hand.is_flush).to.be.false;
  });

  it('makes valid straight hand OK', function() {
    const hand_str = '8H 9D TS JC QD'.split(' ');
    const hand = HandFactory.make_hand(hand_str);
    expect(hand instanceof FiveDistinctRanks).to.true;
    expect(hand.is_straight).to.be.true;
    expect(hand.is_flush).to.be.false;
  });

  it('makes valid flush hand OK', function() {
    const hand_str = '3H 8H 9H JH QH'.split(' ');
    const hand = HandFactory.make_hand(hand_str);
    expect(hand instanceof FiveDistinctRanks).to.true;
    expect(hand.is_straight).to.be.false;
    expect(hand.is_flush).to.be.true;
  });

  it('makes valid straight flush hand OK', function() {
    const hand_str = 'TH JH 9H QH KH'.split(' ');
    const hand = HandFactory.make_hand(hand_str);
    expect(hand instanceof FiveDistinctRanks).to.true;
    expect(hand.is_straight).to.be.true;
    expect(hand.is_flush).to.be.true;
  });

  it('makes valid 3 of a kind hand OK', function() {
    const hand_str = '3S JH JD QD JC'.split(' ');
    const hand = HandFactory.make_hand(hand_str);
    expect(hand instanceof ThreeOfaKind).to.be.true;
  });

  it('makes valid 4 of a kind hand OK', function() {
    const hand_str = '6S 6H 6D QD 6C'.split(' ');
    const hand = HandFactory.make_hand(hand_str);
    expect(hand instanceof FourOfaKind).to.be.true;
  });

  it('makes valid full house hand OK', function() {
    const hand_str = '6S QH 6D QD 6C'.split(' ');
    const hand = HandFactory.make_hand(hand_str);
    expect(hand instanceof FullHouse).to.be.true;
  });

  it('makes valid pair hand OK', function() {
    const hand_str = '5S QH 3D QD 6C'.split(' ');
    const hand = HandFactory.make_hand(hand_str);
    expect(hand instanceof Pair).to.be.true;
  });

  it('makes valid two-pair hand OK', function() {
    const hand_str = '5S QH 5D QD 6C'.split(' ');
    const hand = HandFactory.make_hand(hand_str);
    expect(hand instanceof TwoPairs).to.be.true;
  });

});

