const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  getBookById,
  editBook,
  deleteBook,
} = require("../controllers/bookController");

router.post("/book", addBook);
router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.patch("/books/:id", editBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
