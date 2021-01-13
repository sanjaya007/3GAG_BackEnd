const express = require("express");
const router = express.Router();
const handlers = require("../handlers/users");

router.get("/", handlers.getUsers);
router.post("/users", handlers.addUsers);

module.exports = router;
