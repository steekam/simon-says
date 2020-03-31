document.addEventListener("DOMContentLoaded", function () {
  // start game
  newGame();

  // generate initial sequence 
  // todo: on play
  game.currentGeneratedSequence = giveNextSequence();

  // Assume user has started playing
  buttonSelected("blue");
  buttonSelected("blue");
  buttonSelected("blue");
  buttonSelected("blue");

  buttonSelected("blue");
  buttonSelected("blue");
  buttonSelected("blue");
  buttonSelected("blue");

  console.log(game);
});