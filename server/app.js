const express = require("express");
const path = require("path");
const cors = require("cors");
const EventEmitter = require("events");
const compression = require("compression");
const helmet = require("helmet");

const logger = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const catalogRouter = require("./routes/catalog");
const errorMiddleware = require("./middlewares/error-middleware");

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
    mongoose.set("useCreateIndex", true);
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
app.use("/users", auth);
app.use("/catalog", catalogRouter);
app.use(errorMiddleware);

start();
module.exports = app;
