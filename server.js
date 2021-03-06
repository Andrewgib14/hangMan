const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const sessionConfig = require("./sessionConfig");
const indexRoutes = require("./routes/indexRoutes");
const wordRoutes = require("./routes/wordRoutes");
const newgameRoutes = require("./routes/newgameRoutes");

const app = express();

const port = process.env.PORT || 8000;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

app.use("/word", wordRoutes);
app.use("/newgame", newgameRoutes);
app.use("/", indexRoutes);

app.listen(port, function () {
    console.log(`Port is running on port ${port}`);
});