const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  getBookById,
  editBook,
  deleteBook,
  getBooksByGenre,
} = require("../controllers/bookController");

router.post("/book", addBook);
router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.get("/books/genre/:genre", getBooksByGenre);
router.patch("/books/:id", editBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
