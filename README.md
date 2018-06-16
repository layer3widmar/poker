# poker

## This is a two-player poker app simulation.   

Given two poker hands, it declares the winner (or a tie if that is the case).   
First player is 'Black', second player is 'White'.   

Each card in a hand is designated by a 2-letter code.  
First character is rank code (2-9,T,JQKA) and the second is suit code (S,D,H,C).  
The letters are case insensitive.

## Install:
### prerequisites:

. node (version 10.4.1)
. npm (version 6.1)


### installation steps:

clone this repo:
```
git clone https://github.com/layer3widmar/poker.git
```

install dependencies:
```
npm i
```

## Two ways to play: 

1.
node app/game.js *[[filepath]]*
  (where *[[filepath]]* is a path to a file containing pairs of hands, one set of pairs per line.)
  
2.
node app/game.js *[[pair of hands]]*

example *[[pair of hands]]* input:
```
2H 3D 5S 9C KD 2C TH 4S 8C AH
```

corresponding output:
```
White wins.
```


## TEST:

to test, run:
```
npm test
```
