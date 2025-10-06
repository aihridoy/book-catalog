const express = require("express");
const router = express.Router();
const {
  addUser,
  getUserByEmail,
  login,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/auth");

router.post("/user", addUser);
router.post("/login", login);
router.get("/user/:email", getUserByEmail);

router.post("/favorites", authMiddleware, addToFavorites);
router.delete("/favorites/:bookId", authMiddleware, removeFromFavorites);
router.get("/favorites", authMiddleware, getFavorites);

module.exports = router;
