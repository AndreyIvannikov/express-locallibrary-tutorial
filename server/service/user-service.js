const bcrypt = require("bcrypt");
const User = require("../models/user");
const ApiError = require("../exception/api-error");
const token = require("./token-service");

class UserService {
  async registration(email, password, name) {
    const candidate = await User.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с таким ${email}  уже есть`
      );
    }

    const user = await User.create({ email, name, password });

    const tokens = await token.genreteToken({
      id: user._id,
    });
    await token.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, name: user.name, email: user.email };
  }

  async login(password, email) {
    const candidate = await User.findOne({ email });
    if (!candidate) {
      throw ApiError.BadRequest(
        `Пользователь с таким email: ${email}  не найден`
      );
    }

    const isPassEquals = await bcrypt.compare(
      password,
      candidate.password
    );

    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    const tokens = await token.genreteToken({
      id: candidate._id,
    });
    await token.saveToken(candidate._id, tokens.refreshToken);

    return {
      ...tokens,
      name: candidate.name,
      email: candidate.email,
    };
  }

  async logout(refreshToken) {
    console.log(refreshToken);
    const removeToken = await token.logout(refreshToken);
    return removeToken;
  }
}

module.exports = new UserService();
