import {
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import { Link } from "react-router";
import type { MyBooksProps } from "../types";

export default function MyBooks({
  selectedGenre,
  setSelectedGenre,
  genres,
  isLoading,
  displayedBooks,
  handleEditBook,
  handleDeleteBook,
  isDeleting,
}: MyBooksProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8 text-center">
        <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          My Books
        </span>
      </h2>

      {/* Genre Filters */}
      <div className="mb-8 text-center">
        <p className="text-gray-600 mb-4 font-medium">Filter by Genre:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedGenre(null)}
            className={`cursor-pointer px-4 py-2 rounded-full text-gray-700 transition-all duration-300 border border-amber-200 hover:border-amber-400 hover:shadow-md transform hover:scale-105 ${
              !selectedGenre
                ? "bg-amber-100 text-amber-800 font-medium shadow-md scale-105"
                : "bg-white bg-opacity-80 backdrop-blur-sm hover:bg-opacity-90"
            }`}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`cursor-pointer px-4 py-2 rounded-full text-gray-700 transition-all duration-300 border border-amber-200 hover:border-amber-400 hover:shadow-md transform hover:scale-105 ${
                selectedGenre === genre
                  ? "bg-amber-100 text-amber-800 font-medium shadow-md scale-105"
                  : "bg-white bg-opacity-80 backdrop-blur-sm hover:bg-opacity-90"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Books Display */}
      {isLoading ? (
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg border border-white border-opacity-50">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600 mr-3"></div>
            <span className="text-gray-600 font-medium">
              Loading your books...
            </span>
          </div>
        </div>
      ) : displayedBooks.length === 0 ? (
        <div className="text-center">
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white border-opacity-50 max-w-md mx-auto">
            <BookOutlined className="text-6xl text-amber-400 mb-4" />
            <p className="text-gray-600 mb-4">
              No books{" "}
              {selectedGenre
                ? `found for "${selectedGenre}" genre`
                : "added yet"}
              .
            </p>
            <Link
              to="/add-book"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <BookOutlined className="mr-2" />
              Add your first book!
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50 hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : (
                    <BookOutlined className="text-white text-2xl" />
                  )}
                  <BookOutlined className="text-white text-2xl hidden" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-lg truncate mb-1 group-hover:text-amber-700 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Author:</span> {book.author}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Genre:</span>
                    <span className="ml-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      {book.genre}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Published:</span>{" "}
                    {book.publicationDate
                      ? new Date(book.publicationDate).getFullYear()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <Tooltip title="View Details" placement="top">
                  <Link
                    to={`/book-details/${book._id}`}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg transition-all duration-300 inline-flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110"
                  >
                    <EyeOutlined />
                  </Link>
                </Tooltip>

                <Tooltip title="Edit Book" placement="top">
                  <button
                    onClick={() => handleEditBook(book)}
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-3 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                  >
                    <EditOutlined />
                  </button>
                </Tooltip>

                <Popconfirm
                  title={
                    <div className="flex items-center gap-2">
                      <ExclamationCircleOutlined className="text-red-500 text-base sm:text-lg" />
                      <span className="font-semibold text-sm sm:text-base">
                        Delete "{book.title}"?
                      </span>
                    </div>
                  }
                  description={
                    <div className="max-w-[250px] sm:max-w-xs">
                      <p className="text-gray-600 mb-2 text-xs sm:text-sm">
                        Are you sure you want to permanently delete this book by{" "}
                        <strong>{book.author}</strong>?
                      </p>
                      <p className="text-red-500 text-xs sm:text-sm font-medium">
                        This action cannot be undone.
                      </p>
                    </div>
                  }
                  onConfirm={() => handleDeleteBook(book._id!)}
                  okText={
                    <span className="text-xs sm:text-sm">Yes, Delete</span>
                  }
                  cancelText={
                    <span className="text-xs sm:text-sm">Cancel</span>
                  }
                  okButtonProps={{
                    danger: true,
                    loading: isDeleting,
                    className:
                      "bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-1.5",
                  }}
                  cancelButtonProps={{
                    className:
                      "border-gray-300 hover:border-gray-400 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-1.5",
                  }}
                  placement="topRight"
                  overlayClassName="delete-popconfirm"
                  overlayStyle={{
                    maxWidth: "90vw",
                  }}
                >
                  <Tooltip title="Delete Book" placement="top">
                    <button
                      className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                      disabled={isDeleting}
                    >
                      <DeleteOutlined />
                    </button>
                  </Tooltip>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
