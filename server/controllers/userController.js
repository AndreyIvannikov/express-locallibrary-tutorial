const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const token = require("./tokenContoller");
const ApiError = require("../exception/api-error");

exports.createUser = [
  body("password").trim().isLength({ min: 1 }).escape(),
  body("email").trim().isLength({ min: 1 }).escape(),
  body("name").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        throw ApiError.BadRequest(
          `Пользователь с таким ${email}  уже есть`
        );
      }

      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res
          .status(404)
          .json({ title: "Данные не отправлены" });
      }

      const user = await User.create({
        password,
        email,
        name,
      });

      const tokens = await token.genreteToken({
        id: user._id,
      });
      await token.saveToken(user._id, tokens.refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json({
        email,
        name,
        ...tokens,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
];

exports.login = async (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return next(err);
    }

    user.comparePassword(req.body.password, (error, isMatch) => {
      if (error) {
        return next(error);
      }
    });
  });
};
