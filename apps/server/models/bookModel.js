const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
