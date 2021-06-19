const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token.js");

class Token {
  genreteToken(payload) {
    const accessToken = jwt.sign(payload, "secret-token", {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, "secret-token", {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({
      user: userId,
      refreshToken,
    });
    return token;
  }
}

module.exports = new Token();
