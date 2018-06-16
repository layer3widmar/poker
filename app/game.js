const Player = require('./player');
const HandFactory = require('./hand_factory');
const Card = require('./card');

/*
 * A poker game.
 *
 * Main api is play().  
 */
class Game {

  constructor() {
    this.players = []; // keep order of players as added, to align up with dealt hand
  }

  add(player) {
    this.players.push(player);
    return this;
  }

  /**
   * Game play and winner determined here.
   * @card_str is expected to be 29-char string of space-separated 'cards'.
   * Each card is a 2-char string containing a rank code and a suit code.
   * If arg is not a string, or not the right length, this will throw a RangeError.
   */
  play(card_str) {

    if( !((typeof card_str === 'string' || card_str instanceof String) && card_str.length === 29) ) 
      throw RangeError('must provide a string containing 10 2-char cards, no spaces before or after');

    Card.check_duplicates = true;
    Card.reset_duplicate_check();

    let result;
    const cards = card_str.split(' ');

    try { // make sure duplicate check 

      // give player 1 the first 5 cards, player 2 the last 5 cards.
      const hand1 = HandFactory.make_hand(cards.slice(0,5)),
            hand2 = HandFactory.make_hand(cards.slice(5));

      this.players[0].deal(hand1);
      this.players[1].deal(hand2);

      const compare_result = Player.rank_hands(...this.players);

      if( compare_result ) { // will be truthy if not a tie, 1 if 1st player (Black) or -1 if 2nd player (White)
        const winner = compare_result > 0 ? this.players[0] : this.players[1];
        result = `${winner.name} wins.`;
      } else {
        result = 'Tie.';
      }

    } catch(e) {
      Card.reset_duplicate_check();
      throw e;
    } finally {
      Card.check_duplicates = false;
    }

    return result;
  }

}
module.exports = Game;


/**
 * Command-line entry point.
 */
if (typeof require != 'undefined' && require.main==module) {
  const arg = process.argv[2];
  const fs = require('fs');

  // setup game for play (and re-play)
  const player1 = new Player('Black'),
        player2 = new Player('White');

  const game = new Game();

  game.add(player1).add(player2);

  // either play 
  if( fs.existsSync(arg) ) {  // arg is a file, assume it has hand-sets to process (one hand-set (==game) per line)

    const file_contents = fs.readFileSync(arg, { encoding: 'utf-8' }),
      lines = file_contents.toString().split('\n');

    console.log(`# hands: ${lines.length-1}`);

    lines.forEach(line => line.length === 29 && console.log(game.play(line)));

  } else {                    // arg is not a file, assume it is a hand-set directly passed in
    console.log(game.play(arg));
  }

}
