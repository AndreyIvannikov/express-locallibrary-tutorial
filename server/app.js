const express = require("express");
const path = require("path");
const cors = require("cors");
// const favicon = require('serve-favicon');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const users = require("./routes/users");
const catalogRouter = require("./routes/catalog");
const index = require("./routes/index");

const app = express();

const mongoDB = "mongodb://localhost:27017/test";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use(logger("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index);
app.use("/users", users);
app.use("/catalog", catalogRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
