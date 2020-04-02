const GAME_COLORS = ["blue", "green", "yellow", "red"];
let INPUT_MODE = 'TOUCH_MODE';

/**
 * Shows on correct input of user sequence
 */
async function showSuccess() {
    let { game, level } = state;
    game.successStreak += 1;

    //reset failure
    game.failureStreak = 0;

    //update success streak left to advance
    game.successLeftToAdvance--;

    if (game.successStreak == level.successToAdvance) {
        let newLevel = getNextLevel();
        state.level = {...newLevel};

        // reset success streak
        game.successStreak = 0;

        // reset streak left to advance
        game.successLeftToAdvance = newLevel.successToAdvance;
    }

    state.game = game;

    let successModal = document.querySelector('.success');
    showElement(successModal);
    await sleep(1000);
    hideElement(successModal);
}

/**
 * Shows on wrong input of user sequence
 */
async function showFailure() {
    let { game, level } = state;
    game.failureStreak += 1;

    // reset success streak
    game.successStreak = 0;
    
    if (game.failureStreak == level.failureToReset) {
        level = {...initialLevel()};
    } else if(level.id !== 1) {
        level = {...getPreviousLevel()};
    }
    
    // reset success left to advance
    game.successLeftToAdvance = level.successToAdvance;

    state.level = level;
    state.game = game;

    let failureModal = document.querySelector('.failure');
    showElement(failureModal);
    await sleep(1000);
    hideElement(failureModal);
}

function newGame() {
    disableInputControls();
    return {
        currentGeneratedSequence: [],
        currentInputSequence: [],
        entriesLeft: 0,
        successLeftToAdvance: 0,
        successStreak: 0,
        failureStreak: 0
    };
}

/**
 * Random sequence of colors to display
 * @returns list
 */
function giveNextSequence() {
    if (!state.renderingSequence) {
        const currentLeveL = state.level;

        const sequence = [];

        for (let index = 0; index < currentLeveL.sequenceLength; index++) {
            sequence.push(GAME_COLORS[getRandomIntInclusive(0, 3)])
        }

        state.game.currentGeneratedSequence = sequence;

        renderSequence(sequence);

        return sequence;
    }
}

/**
 * Display the sequence generated
 * @param {List} sequence
 */
async function renderSequence(sequence) {
    state.renderingSequence = true;

    const promptEl = document.querySelector('.play-prompt');
    const inputPromptEl = document.querySelector('.input-prompt');

    hideElement(inputPromptEl);
    hideElement(promptEl);

    if (state.firstGame) {
        const counterEl = document.querySelector('.counter');
        showElement(counterEl);

        // display counter
        await counter(counterEl.firstElementChild, 3, false);
        hideElement(counterEl);
        state.firstGame = false;
    }

    showElement(document.querySelector('.sequence-display'));

    for (let index = 0; index < sequence.length; index++) {
        const activeEl = document.querySelector(`.sequence-display > div.${sequence[index]}`);

        activeEl.classList.add('active');

        await sleep(900);

        activeEl.classList.remove('active');
        await sleep(400);
    }
    sequenceHasDisplayed();
}

/**
 * Shows information prior to user inputing their sequence
 */
function sequenceHasDisplayed() {
    state.renderingSequence = false;

    // set entriesLeft
    let { game, level } = state;
    game.entriesLeft = level.sequenceLength;
    state.game = game;

    hideElement(document.querySelector('.sequence-display'));
    showElement(document.querySelector('.input-prompt'));
    enableInputControls();
}

/**
 * Log color user has selected
 * @param {String} color 
 */
function buttonSelected(color) {
    let { game, level } = state;
    game.currentInputSequence.push(color);

    // update entries left
    game.entriesLeft--;

    if (game.currentInputSequence.length === level.sequenceLength) {
        disableInputControls();
        validateSequence();

        // reset input
        game.currentInputSequence = [];
    }
    state.game = game;
}

function validateSequence() {
    let { currentInputSequence, currentGeneratedSequence } = state.game;

    if (JSON.stringify(currentInputSequence) == JSON.stringify(currentGeneratedSequence)) {
        showSuccess();
    } else {
        showFailure();
    }

    // show play prompt
    hideElement(document.querySelector('.input-prompt'))
    showElement(document.querySelector('.play-prompt'))
}


/**
 * Changes input mode between touch and tilt
 * @param {String} mode 
 */
function changeMode(mode = 'TOUCH_MODE') {
    MODE = mode;
}

/**
 * Called when user fails to make a decision after
 * 2 seconds
 */
function userChoiceTimeOut() {
    // todo
}

/**
 * Show a pop up message on the bottom of the screen
 * @param {String} message 
 */
function displayToastMessage(message) {
    // todo: might even remove
}
