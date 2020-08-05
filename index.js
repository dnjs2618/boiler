const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const config = require("./config/key");
require("dotenv").config();

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
