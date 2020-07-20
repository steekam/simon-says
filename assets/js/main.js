document.addEventListener("DOMContentLoaded", function () {
    // Initialise app
    window.root = document.querySelector('#app');

    let game = newGame();
    let level = { ...initialLevel() };
    game.successLeftToAdvance = level.successToAdvance;

    window.state = createState({
        game,
        level,
        renderingSequence: false,
        firstGame: true,
        highlightedColor: null,
    });
    refreshDom();

    // disable inputs initially
    disableInputControls();

    // Listen for orientation changes
    window.addEventListener("deviceorientation", tiltMode, true);

    callChoiceTimeout();
});