const express = require("express");
const newgameRoutes = express.Router();
const fs = require("fs");

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toUpperCase().split("\n");



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

newgameRoutes.get("/", function (req, res) {
    let randomWord = words[getRandomInt(0, words.length - 1)];
    console.log(randomWord);
    let wordGame = {};
    wordGame.word = randomWord;
    wordGame.display = [];
    wordGame.incorrectGuesses = [];
    wordGame.correctGuesses = [];
    wordGame.turns = 8;
    for (let i = 0; i < wordGame.word.length; i++) {
        wordGame.display.push("_");
    }
    console.log("turns = ", wordGame.turns);
    req.session.wordGame = wordGame;
    return res.render("game", wordGame);
});



module.exports = newgameRoutes;