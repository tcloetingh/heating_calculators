const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const pubDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../views/partials");

// Set up static directory to serve
app.use(express.static(pubDirectoryPath));

// Set up handlebars engine
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/calculate", (req, res) => {
  res.render("calculate");
});

app.get("/learn", (req, res) => {
  res.render("learn");
});

app.listen(port, () => {
  console.log("server running on port" + port);
});
