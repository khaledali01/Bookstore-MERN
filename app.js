const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// App
const app = express();

// Database
mongoose
  .connect(process.env.DATABASE, {
    family: 4
  })
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Server is working");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
