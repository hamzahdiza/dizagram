const User = require("../models/userModel");
const { hash } = require("../helpers/bcrypt");

class userController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const uniqueUsername = await User.findOne({ username });
      if (uniqueUsername) {
        return res.json({ msg: "Username already exists", status: false });
      }

      const uniqueEmail = await User.findOne({ email });
      if (uniqueEmail) {
        return res.json({ msg: "Email already exists", status: false });
      }

      const passwordHash = await hash(password);
      const user = await User.create({
        email,
        username,
        password: passwordHash,
      });
      console.log(user, "llll");
      delete user.password;
      return res.json({ status: true, user });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
