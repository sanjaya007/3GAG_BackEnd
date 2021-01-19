const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 10,
  },

  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 10,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
});

//middleware
userSchema.pre("save", async function (next) {
  const salt_round = 10;
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, salt_round);
      next();
    }
  } catch (error) {
    console.log(error);
  }
});

const UserModel = new mongoose.model("user", userSchema);

module.exports = UserModel;
