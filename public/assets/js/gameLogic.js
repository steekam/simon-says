const GAME_COLORS = ["blue", "green", "yellow", "red"];
let INPUT_MODE = 'TOUCH_MODE';

// Utilities
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

/**
 * Changes input mode between touch and tilt
 * @param {String} mode 
 */
function changeMode(mode = 'TOUCH_MODE') {
  MODE = mode;
}

/**
 * Shows on correct input of user sequence
 */
function showSuccess() {
  // todo
  game.successStreak += 1;

  // todo: check if we have reached next level streak

  console.log("success");
}

/**
 * Shows on wrong input of user sequence
 */
function showFailure() {
  // todo
  game.failureStreak += 1;

  // todo: check if we have reached reset streak

  console.log("failure")
}

/**
 * Show a pop up message on the bottom of the screen
 * @param {String} message 
 */
function displayToastMessage(message) {
  // todo
  
}

const Level = {
  data: {},

  init() {
    this.data = {
      id: 1,
      sequenceLength: 4,
      successToAdvance: 2,
      failureToReset: 2
    };

    return this;
  },

  getNext() {
    this.data.id += 1;
    this.data.sequenceLength += 1;
    this.data.successToAdvance += 1;
  },

  getPrevious() {
    if (this.data.id > 1) {
      this.data.id -= 1;
      this.data.sequenceLength -= 1;
      this.data.successToAdvance -= 1;
    }
  },

  reset: () => this.init()
}

function newGame() {
  window.game = {
    currentLeveL: Level.init().data,
    currentGeneratedSequence: [],
    currentInputSequence: [],
    successStreak: 0,
    failureStreak: 0
  };
}

/**
 * Called when user fails to make a decision after
 * 2 seconds
 */
function userChoiceTimeOut() {
  // todo
}

/**
 * Random sequence of colors to display
 * @returns list
 */
function giveNextSequence() {
  const { currentLeveL } = game;

  // todo: missing checks

  const sequence = [];
  for (let index = 0; index < currentLeveL.sequenceLength; index++) {
    sequence.push(GAME_COLORS[getRandomIntInclusive(0, 3)])
  }
  return sequence;
}

/**
 * Shows information prior to user inputing their sequence
 */
function sequenceHasDisplayed() {
  // TODO:
}

/**
 * Log color user has selected
 * @param {String} color 
 */
function buttonSelected(color) {
  console.log(`Selected ${color}`);
  game.currentInputSequence.push(color);

  if (game.currentInputSequence.length === game.currentLeveL.sequenceLength){
    disableInput();
    validateSequence();
    
    // reset input
    game.currentInputSequence = [];
  }

}


function disableInput() {
  // TODO: 
  console.log("Input disabled");
}

function validateSequence() {
  console.log("Validating sequence");

  if (game.currentInputSequence === game.currentGeneratedSequence) {
    showSuccess();
  } else {
    showFailure();
  }
}
