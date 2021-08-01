let playerMove = {};
let computerMove = {};

const possibleMoves = {
    rock: {
        move: 'rock',
        strength: 'scissors',
        weakness: 'paper',
        image: './assets/images/rock.png',
        alt: 'Rock'
    },
    paper: {
        move: 'paper',
        strength: 'rock',
        weakness: 'scissors',
        image: './assets/images/paper.png',
        alt: 'Paper'
    },
    scissors: {
        move: 'scissors',
        strength: 'paper',
        weakness: 'rock',
        image: './assets/images/scissors.png',
        alt: 'Scissors'
    }
}

function getWinner(player1, player2) {
    if (player1.strength === player2.move) {
        return 1;
    } else if (player1.weakness === player2.move) {
        return -1;
    } else {
        return 0;
    }
}

function updatePlayerMove(chosenMove) {
    playerMove = possibleMoves[chosenMove];
}

function getComputerMove() {
    let options = Object.keys(possibleMoves);
    let randomIndex = Math.floor(Math.random() * options.length);
    let computerChoice = options[randomIndex];
    return possibleMoves[computerChoice];
}

const playerNameInput = document.querySelector('#player-name-input');
const playerNameDisplay = document.querySelector('#player-name-display');
const computerNameDisplay = document.querySelector('#computer-name-display');
let playerName = '';

function displayPlayerName(event) {
    if(event.target.validity.valid) {
        playerName = event.target.value;
    }

    if (playerName.length > 0) {
        playerNameDisplay.innerText = capitaliseWord(playerName);
    } else {
        playerNameDisplay.innerText = 'You'
    }
}

playerNameInput.addEventListener('change', displayPlayerName);

const gameDisplay = document.querySelector('#move-choice');
const resultsDisplay = document.querySelector('#game-results');
const playerMoveDisplay = document.querySelector('#player-move');
const computerMoveDisplay = document.querySelector('#computer-move');

function displayWinner(outcome) {
    if (outcome === 1) {
        playerNameDisplay.classList.add('winner');
    } else if (outcome === 0) {
        playerNameDisplay.classList.add('draw');
        computerNameDisplay.classList.add('draw');
    } else {
        computerNameDisplay.classList.add('winner');
    }

    gameDisplay.style.display = 'none';
    resultsDisplay.style.display = 'grid';
}

const startNewGameButton = document.querySelector('#play-again');

function newGame() {
    playerNameDisplay.classList.remove('winner', 'draw');
    computerNameDisplay.classList.remove('winner', 'draw');
    resultsDisplay.style.display = 'none';
    gameDisplay.style.display = 'grid';
}

startNewGameButton.addEventListener('click', newGame);

function capitaliseWord(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
}

function displayChosenMoves() {
    playerMoveDisplay.src = playerMove.image;
    playerMoveDisplay.alt = playerMove.alt;
    computerMoveDisplay.src = computerMove.image;
    computerMove.alt = computerMove.alt;
}

let numGames = 0;
let numWins = 0;
let numLosses = 0;
let numDraws = 0;

function updateScore(outcome) {
    numGames++;
    if (outcome === 1) {
        numWins++;
    } else if (outcome === 0) {
        numDraws++;
    } else {
        numLosses++;
    }
}

let gamesPlayedDisplay = document.querySelector('#games-played');
let gamesWonDisplay = document.querySelector('#games-won');
let gamesLostDisplay = document.querySelector('#games-lost');
let gamesDrawnDisplay = document.querySelector('#games-drawn');

function displayScore() {
    gamesPlayedDisplay.innerText = numGames;
    gamesWonDisplay.innerText = numWins;
    gamesLostDisplay.innerText = numLosses;
    gamesDrawnDisplay.innerText = numDraws;
}

function playGame(event) {
    computerMove = getComputerMove();
    updatePlayerMove(event.target.value);
    console.log(playerMove);
    let result = getWinner(playerMove, computerMove);
    displayChosenMoves();
    updateScore(result);
    displayWinner(result);
    displayScore();
}

const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorsButton = document.querySelector('#scissors');

rockButton.addEventListener('click', playGame);
paperButton.addEventListener('click', playGame);
scissorsButton.addEventListener('click', playGame);