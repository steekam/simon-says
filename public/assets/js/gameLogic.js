const GAME_COLORS = ["blue", "green", "yellow", "red"];
let INPUT_MODE = 'TOUCH_MODE';

// Utilities
/**
 * Sleep for set milliseconds
 * @param {int} ms 
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Add hidden class from element
 * @param {*} element 
 */
function hideElement(element) {
  if (!element.classList.contains('hidden')) {
    element.classList.add('hidden')
  }
}

/**
 * Remove hidden class from element
 * @param {*} element 
 */
function showElement(element) {
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden')
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

/**
 * Display counter in element
 * @param {*} element 
 * @param {number} countTo 
 * @param {boolean} forward Default: true
 */
async function counter(element, countTo, forward = true) {
  return new Promise(async resolve => {
    let count = forward ? 1 : countTo;
    const condtion = () => forward ? count <= countTo : count > 0;
    const next = () => forward ? count++ : count--;

    for (count; condtion(); next()) {
      element.innerHTML = count;
      await sleep(800);
    }
    resolve();
  });
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
async function giveNextSequence() {
  const { currentLeveL } = game;
  const sequence = [];

  for (let index = 0; index < currentLeveL.sequenceLength; index++) {
    sequence.push(GAME_COLORS[getRandomIntInclusive(0, 3)])
  }

  game.currentGeneratedSequence = sequence;

  await renderSequence(sequence);

  return sequence;
}

/**
 * Display the sequence generated
 * @param {List} sequence
 */
async function renderSequence(sequence) {
  return new Promise(async resolve => {
    const counterEl = document.querySelector('.counter');
    const promptEl = document.querySelector('.play-prompt');
    const inputPromptEl = document.querySelector('.input-prompt');

    // check if sequence-display is visible
    hideAllSequenceElements();

    hideElement(inputPromptEl);
    hideElement(promptEl);
    showElement(counterEl);

    // display counter
    await counter(counterEl.firstElementChild, 3, false);

    hideElement(counterEl);

    for (let index = 0; index < sequence.length; index++) {
      const activeEl = document.querySelector(`.sequence-display > div.${sequence[index]}`)

      activeEl.classList.add('active');

      await sleep(900);

      activeEl.classList.remove('active');
      await sleep(400);
    }
    sequenceHasDisplayed();
    resolve();
  })

}


function hideAllSequenceElements() {
  const sequenceElements = document.querySelector('.sequence-display').children;
  Array.from(sequenceElements)
    .forEach(el => {
      el.classList.remove('active');
    })
}

/**
 * Shows information prior to user inputing their sequence
 */
function sequenceHasDisplayed() {
  const inputPromptEl = document.querySelector('.input-prompt');
  showElement(inputPromptEl);
}

/**
 * Log color user has selected
 * @param {String} color 
 */
function buttonSelected(color) {
  console.log(`Selected ${color}`);
  game.currentInputSequence.push(color);

  if (game.currentInputSequence.length === game.currentLeveL.sequenceLength) {
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
