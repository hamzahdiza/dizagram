// const { ObjectId } = require("mongodb");
// const { getDatabase } = require("../config/mongoConnection");

// const getCollections = () => {
//   const db = getDatabase();
//   const users = db.collection("Users");
//   return users;
// };

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("user", userSchema, "Users");
