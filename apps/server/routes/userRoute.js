const express = require("express");
const router = express.Router();
const {
  addUser,
  getUserByEmail,
  login,
} = require("../controllers/userController");

router.post("/user", addUser);
router.post("/login", login);
router.get("/user/:email", getUserByEmail);

module.exports = router;
