const { body, validationResult } = require("express-validator");
const User = require("../service/user-service");

exports.createUser = [
  body("password").trim().isLength({ min: 1 }).escape(),
  body("email").trim().isLength({ min: 1 }).escape(),
  body("name").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res
          .status(404)
          .json({ title: "Данные не отправлены" });
      }
      const newUser = await User.registration(email, password, name);
      res.cookie("refreshToken", newUser.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(200).json({
        newUser,
      });
    } catch (error) {
      next(error);
    }
  },
];

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(password, email);
    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  console.log(req.cookies);
  try {
    const { refreshToken } = req.cookies;
    const userLogout = await User.logout(refreshToken);
    res.status(200).json({
      userLogout,
    });
  } catch (error) {
    next(error);
  }
};
