import { Link } from "react-router";
import {
  useGetBooksQuery,
  useGetBooksByGenreQuery,
} from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import { BookOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function Profile() {
  const { user } = useAppSelector((state) => state.user);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Fetch all books
  const { data: allBooksData, isLoading: isAllBooksLoading } = useGetBooksQuery(
    {}
  );
  const allBooks = allBooksData?.data || [];
  const myBooks = allBooks.filter((book) => book?.userId === user?._id);

  // Fetch books by genre (only if a genre is selected)
  const { data: genreBooksData, isLoading: isGenreBooksLoading } =
    useGetBooksByGenreQuery(
      selectedGenre || "",
      { skip: !selectedGenre } // Skip query if no genre is selected
    );
  const genreBooks =
    genreBooksData?.data?.filter((book) => book?.userId === user?._id) || [];

  // Get unique genres from myBooks
  const genres = [...new Set(myBooks.map((book) => book.genre))];

  // Determine which books to display
  const displayedBooks = selectedGenre ? genreBooks : myBooks;
  const isLoading = selectedGenre ? isGenreBooksLoading : isAllBooksLoading;

  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 min-h-screen overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-red-200 rounded-full opacity-25"></div>
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-amber-100 to-transparent opacity-40">
          <div className="h-full flex flex-col justify-evenly px-2">
            <div className="h-8 bg-red-300 rounded-sm opacity-60"></div>
            <div className="h-12 bg-blue-300 rounded-sm opacity-60"></div>
            <div className="h-6 bg-green-300 rounded-sm opacity-60"></div>
            <div className="h-10 bg-purple-300 rounded-sm opacity-60"></div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-16 lg:py-24">
        {/* User Profile Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white border-opacity-50">
            <div className="flex justify-center mb-4">
              <UserOutlined className="text-6xl text-amber-600 animate-pulse" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
              {user?.username?.split(" ")[0] || "User"}
            </h1>
            <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
              <MailOutlined className="text-amber-600" />
              {user?.email || "No email provided"}
            </p>
            <p className="text-gray-500 mt-2">
              Joined:{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* My Books Section */}
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
                className={`px-4 py-2 rounded-full text-gray-700 transition-colors border border-amber-200 hover:border-amber-400 ${
                  !selectedGenre
                    ? "bg-amber-100 text-amber-800 font-medium"
                    : "bg-white bg-opacity-80 backdrop-blur-sm"
                }`}
              >
                All
              </button>
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-full text-gray-700 transition-colors border border-amber-200 hover:border-amber-400 ${
                    selectedGenre === genre
                      ? "bg-amber-100 text-amber-800 font-medium"
                      : "bg-white bg-opacity-80 backdrop-blur-sm"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Books Display */}
          {isLoading ? (
            <div className="text-center text-gray-600">Loading books...</div>
          ) : displayedBooks.length === 0 ? (
            <div className="text-center text-gray-600">
              No books{" "}
              {selectedGenre ? `found for ${selectedGenre}` : "added yet"}.{" "}
              <Link
                to="/add-book"
                className="text-amber-600 hover:text-amber-800 underline"
              >
                Add your first book!
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedBooks.map((book) => (
                <Link
                  key={book._id}
                  to={`/book-details/${book._id}`}
                  className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      {book.image ? (
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <BookOutlined className="text-white text-2xl" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-lg truncate mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Author:</span>{" "}
                        {book.author}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Genre:</span> {book.genre}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Published:</span>{" "}
                        {book.publicationDate
                          ? new Date(book.publicationDate).getFullYear()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
