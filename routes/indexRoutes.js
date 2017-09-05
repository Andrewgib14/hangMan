const express = require("express");
const indexRoutes = express.Router();
const app = express();


indexRoutes.get("/", (req, res) => {
    res.render("home", req.sessions);
});


module.exports = indexRoutes;