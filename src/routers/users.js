const express = require("express");
const router = express.Router();
const handlers = require("../handlers/users");

// post
router.post("/users", handlers.addUsers);
router.post("/users/auth", handlers.authUsers);

// get
router.get("/", handlers.getUsers);

module.exports = router;
