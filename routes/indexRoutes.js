const express = require("express");
const indexRoutes = express.Router();
const app = express();


indexRoutes.get("/", function (req, res) {
    res.render("index", req.sessions);
});


module.exports = indexRoutes;