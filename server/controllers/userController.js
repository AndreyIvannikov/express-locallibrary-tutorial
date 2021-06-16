const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.createUser = [
  body("password").trim().isLength({ min: 1 }).escape(),
  body("username").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    console.log(req.body);
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(404).json({ title: "Данные не отправлены" });
    }
    const user = new User({
      password: req.body.password,
      username: req.body.username,
    });

    user.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ title: "пользователь создан" });
    });
  },
];

exports.login = async (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return next(err);
    }

    user.comparePassword(req.body.password, (error, isMatch) => {
      if (error) {
        return next(error);
      }
      console.log(isMatch);
    });
  });
};
