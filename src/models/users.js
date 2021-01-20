const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
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

//generate token and store in database
userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id },
      "htmlcssjavascriptnodejsreactjspython"
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const UserModel = new mongoose.model("user", userSchema);

module.exports = UserModel;
