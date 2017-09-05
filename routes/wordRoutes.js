const express = require("express");
const wordRoutes = express.Router();
const fs = require("fs");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toUpperCase().split("\n");
const session = require("express-session");


wordRoutes.post("/guess", function (req, res) {

})