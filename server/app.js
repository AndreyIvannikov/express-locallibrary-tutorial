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

const start = async () => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

app.use(logger("dev"));
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use("/users", users);
app.use("/catalog", catalogRouter);

app.use((err, req, res, next) => {
  const isNotFound = ~err.message.indexOf("not found");
  const isCastError = ~err.message.indexOf("Cast to ObjectId failed");
  if (err.message && (isNotFound || isCastError)) {
    return next();
  }

  res.status(500).json({ error: err.stack });
});

app.use((req, res) => {
  res.sendStatus(404);
});

start();
module.exports = app;
