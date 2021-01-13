const UserModel = require("../models/users");

const addUsers = async (req, res) => {
  try {
    const user = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await user.save();
    responder(res, 201, null, "success", result);
  } catch (error) {
    responder(res, 400, null, "error", "Something Went Wrong !!");
  }
};

const getUsers = async (req, res) => {
  try {
    res.send("Coming Soon !!");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  addUsers: addUsers,
  getUsers: getUsers,
};
