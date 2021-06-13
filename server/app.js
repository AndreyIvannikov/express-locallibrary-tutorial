const express = require("express");
const path = require("path");
const cors = require("cors");
const EventEmitter = require("events");
const compression = require("compression");
const helmet = require("helmet");

const logger = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const users = require("./routes/users");
const catalogRouter = require("./routes/catalog");
const index = require("./routes/index");

const app = express();

const devDbUrl = `mongodb+srv://andreyIvannikov:2431524315@cluster0.e0sn2.mongodb.net/myBase?retryWrites=true&w=majority`;
const mongoDB = process.env.MONGODB_URI || devDbUrl;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
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
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index);
app.use(express.json());
app.use("/users", users);
app.use("/catalog", catalogRouter);

// app.use((err, req, res, next) => {
//   res.status(500).send("Something broke!");
// });

app.use((err, req, res, next) => {
  set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send('sa')
  if (res.headersSent) {
    return next(err);
  }
  console.log(24315);
  res.status(500).json({ error: err.stack });
});

app.use((req, res) => {
  res.sendStatus(404);
});
module.exports = app;
