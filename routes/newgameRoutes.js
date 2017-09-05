const express = require("express");
const newgameRoutes = express.Router();
const fs = require("fs");

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toUpperCase().split("\n");



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

newgameRoutes.get("/", function (req, res) {

})