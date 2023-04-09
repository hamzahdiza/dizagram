const express = require("express");
const userController = require("../controllers/userController");
const router = express();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getAllUsers/:id", userController.getAllUsers);

module.exports = router;
