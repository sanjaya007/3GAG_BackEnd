const UserModel = require("../models/users");
const responder = require("./messageResponder");
const validation = require("./validation");
const bcrypt = require("bcryptjs");

// Add users
const addUsers = async (req, res) => {
  try {
    const rawBody = req.body;
    const body = validation.trimmedBody(rawBody);

    if (
      validation.isAllEmpty(
        body.firstname,
        body.lastname,
        body.email,
        body.password
      )
    ) {
      responder(res, 200, "error", null, "All fields are required !");
      return false;
    }

    for (key in body) {
      if (body[key] === "") {
        responder(res, 200, "error", key, `${key} is required !`);
        return false;
      }
    }

    if (!validation.isAlphabetOnly(body.firstname)) {
      responder(res, 200, "error", "firstname", "Only alphabets are allowed !");
      return false;
    }

    if (!validation.isAlphabetOnly(body.lastname)) {
      responder(res, 200, "error", "lastname", "Only alphabets are allowed !");
      return false;
    }

    if (!validation.isLengthValid(body.firstname)) {
      responder(
        res,
        401,
        "error",
        "firstname",
        "Letters must be upto 2 to 10 characters !"
      );
      return false;
    }

    if (!validation.isLengthValid(body.lastname)) {
      responder(
        res,
        401,
        "error",
        "lastname",
        "Letters must be upto 2 to 10 characters !"
      );
      return false;
    }

    if (!validation.isValidMail(body.email)) {
      responder(res, 200, "error", "email", "Invalid email !");
      return false;
    }

    if (!validation.isValidPassword(body.password)) {
      responder(
        res,
        200,
        "error",
        "password",
        "Password must contain at least one lowercase, uppercase, number and special characters of 8-15 length !"
      );
      return false;
    }

    const isAlreadyExist = await UserModel.findOne({ email: body.email });
    if (isAlreadyExist) {
      responder(res, 200, "error", "email", "Email is already in use ! ");
      return false;
    }

    const user = new UserModel(body);

    const result = await user.save();
    responder(res, 200, "succcess", null, "Registration Successfull !!");
  } catch (error) {
    responder(res, 200, "error", null, `Something Went Wrong !`);
  }
};

// get users
const getUsers = async (req, res) => {
  try {
    res.send("Coming Soon !!");
  } catch (error) {
    res.send("Get error");
  }
};

//login
const authUsers = async (req, res) => {
  try {
    const rawBody = req.body;
    const body = validation.trimmedBody(rawBody);

    for (key in body) {
      if (body[key] === "") {
        responder(res, 200, "error", key, `${key} is required !`);
        return false;
      }
    }

    const email = body.email;
    const password = body.password;

    const userDetails = await UserModel.findOne({ email });

    if (userDetails) {
      const db_password = userDetails.password;
      const isMatch = await bcrypt.compare(password, db_password);

      if (isMatch) {
        const token = await userDetails.generateToken();
        console.log(token);

        res.cookie("3GAG_JWT", token, {
          expires: new Date(Date.now() + 31556952000),
          httpOnly: false,
        });

        responder(res, 200, "success", null, "Login Successfully !");
      } else {
        responder(res, 200, "error", null, "Email or Password is incorrect !");
        return false;
      }
    } else {
      responder(res, 200, "error", null, "Email or Password is incorrect !");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addUsers: addUsers,
  getUsers: getUsers,
  authUsers: authUsers,
};
