const express = require("express");
const wordRoutes = express.Router();
const fs = require("fs");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toUpperCase().split("\n");
const session = require("express-session");





wordRoutes.post("/guess", (req, res) => {
    let wordGame = req.session.wordGame;
    let guessLetter = req.body.letterGuess.toUpperCase()
    let randomWord = req.session.wordGame.word;

    if (letterAlreadyGuessed(wordGame, guessLetter)) {
        saveGame(req, wordGame, "Already guessed");

    }
    else if (letterNotFound(wordGame, guessLetter)) {
        wordGame.incorrectGuesses.push(guessLetter);
        wordGame.turns -= 1
        saveGame(req, wordGame, "WRONG");

    } else {
        for (i = 0; i < wordGame.word.length; i++) {
            if (wordGame.word.charAt(i) === guessLetter) {
                wordGame.display[i] = guessLetter;
                console.log("this is the array: ", wordGame.display);
            }
        }

        let locationOfLetter = randomWord.indexOf(guessLetter)
        if (randomWord.includes(guessLetter) == true) {
            wordGame.display.splice(locationOfLetter, 1, guessLetter);
            saveGame(req, wordGame, "Correct!");
        }
    };
    if (wordGame.display.join('') == randomWord) {
        saveGame(req, wordGame, "You Win!");
    }
    if (wordGame.turns < 1) {
        saveGame(req, wordGame, `You Loose! The word was ${randomWord}`);
    }

    return res.render("game", wordGame);
});



function saveGame(req, wordGame, message) {
    wordGame.message = message;
    req.session.wordGame = wordGame;
}
function letterNotFound(wordGame, guessLetter) {
    return wordGame.word.indexOf(guessLetter) < 0;
}
function letterAlreadyGuessed(wordGame, guessLetter) {
    return (wordGame.incorrectGuesses.indexOf(guessLetter) > -1 ||
        wordGame.correctGuesses.indexOf(guessLetter) < -1)
}

module.exports = wordRoutes;