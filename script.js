const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const movesDisplay = document.getElementById("moves");
const restartButton = document.getElementById("restart-button");
const message = document.getElementById("message");

const symbols = ["🍎", "🍌", "🍇", "🍊", "🍎", "🍌", "🍇", "🍊"];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let moves = 0;
let lockBoard = false;

function shuffleCards() {
    cards = [...symbols].sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = "";

    cards.forEach((symbol, index) => {
        const card = document.createElement("div");

        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.textContent = "?";

        card.addEventListener("click", flipCard);

        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;

    if (this.classList.contains("flipped") ||
        this.classList.contains("matched")) {
        return;
    }

    this.classList.add("flipped");
    this.textContent = this.dataset.symbol;

    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;

        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;
        score += 10;
        scoreDisplay.textContent = score;

        flippedCards = [];

        if (matchedPairs === symbols.length / 2) {
            message.textContent = "🎉 Congratulations! You found all pairs!";
        }
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard.textContent = "?";
            secondCard.textContent = "?";

            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

function restartGame() {
    flippedCards = [];
    matchedPairs = 0;
    score = 0;
    moves = 0;
    lockBoard = false;

    scoreDisplay.textContent = score;
    movesDisplay.textContent = moves;
    message.textContent = "";

    shuffleCards();
    createBoard();
}

restartButton.addEventListener("click", restartGame);

restartGame();