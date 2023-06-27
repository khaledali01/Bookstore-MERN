const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();
const authRoutes = require("./routes/auth");

// App
const app = express();

// Database
mongoose
  .connect(process.env.DATABASE, {
    family: 4,
  })
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(err));

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// Routes Middleware
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
