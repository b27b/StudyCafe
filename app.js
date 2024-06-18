const express = require("express");
const mongoose = require("mongoose");
const Cafe = require("./models/cafe");

mongoose.connect("mongodb://localhost:27017/study-cafe", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const app = express();
const path = require("path");
const { title } = require("process");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makecafe", async (req, res) => {
  const cafe = new Cafe({ title: "TeaOne", description : 'kind owners' });
  await cafe.save();
  res.send(cafe)
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
