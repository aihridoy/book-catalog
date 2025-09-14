const { Book } = require("../models/bookModel");

exports.addBook = async (req, res) => {
  try {
    const { image, title, author, genre, publicationDate } = req.body;
    if (!image || !title || !author || !genre || !publicationDate) {
      return res
        .status(400)
        .send({ status: false, error: "All fields are required" });
    }
    const book = new Book({ image, title, author, genre, publicationDate });
    const savedBook = await book.save();
    res.status(201).send({ status: true, data: savedBook });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { search, genre, year } = req.query;
    let query = {};

    // Search by title, author, or genre
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by genre
    if (genre) {
      query.genre = { $regex: genre, $options: "i" };
    }

    // Filter by publication year
    if (year) {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31);
      query.publicationDate = { $gte: start, $lte: end };
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.send({ status: true, data: books });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ status: false, error: "Book not found" });
    }
    res.send({ status: true, data: book });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

exports.editBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).send({ status: false, error: "Book not found" });
    }
    res.send({ status: true, data: book });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send({ status: false, error: "Book not found" });
    }
    res.send({ status: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};
