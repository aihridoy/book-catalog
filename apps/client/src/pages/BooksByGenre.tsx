import { Link, useParams } from "react-router";
import { useGetBooksByGenreQuery } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import { BookOutlined } from "@ant-design/icons";
import BookCard from "../components/BookCard";
import { Col, Row, Spin } from "antd";
import { useEffect } from "react";

export default function BooksByGenre() {
  const { genre } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetBooksByGenreQuery(genre || "");

  const books = data?.data || [];

  const displayGenre = genre
    ? genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase()
    : "Books";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOutlined className="text-6xl text-amber-600 animate-pulse" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {displayGenre} Books
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of {displayGenre} books. Discover new
            favorites and add them to your library.
          </p>
        </div>

        {/* Books Section */}
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="mt-5 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
              <div className="text-center">
                <Spin size="large" className="mb-4" />
                <p className="text-gray-600 text-lg">Loading your books...</p>
              </div>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center text-gray-600">
              No {displayGenre} books found.{" "}
              {user && (
                <Link
                  to="/add-book"
                  className="text-amber-600 hover:text-amber-800 underline"
                >
                  Add a {displayGenre} book!
                </Link>
              )}
            </div>
          ) : (
            <Row gutter={[24, 24]} className="relative">
              {books.map((book) => (
                <Col key={book._id} xs={24} sm={12} md={8} lg={6}>
                  <BookCard key={book._id} book={book} user={user} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}
