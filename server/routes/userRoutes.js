const express = require("express");
const userController = require("../controllers/userController");
const router = express();

router.post("/register", userController.register);

module.exports = router;
