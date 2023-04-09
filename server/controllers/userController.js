const User = require("../models/userModel");
const { hash, comparePass } = require("../helpers/bcrypt");

class userController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const uniqueUsername = await User.findOne({ username });
      if (uniqueUsername) {
        throw { name: "username-already-exists" };
      }

      const uniqueEmail = await User.findOne({ email });
      if (uniqueEmail) {
        throw { name: "email-already-exists" };
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
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        throw { name: "invalid-login" };
      }
      const isPasswordValid = await comparePass(password, user.password);

      if (!isPasswordValid) {
        throw { name: "invalid-login" };
      }
      delete user.password;
      return res.json({ status: true, user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const currentUserId = req.params.id;
      const dataUsers = await User.find({ _id: { $ne: currentUserId } }).select(["_id", "email", "username", "avatarImage"]);
      res.status(200).json(dataUsers);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = userController;
