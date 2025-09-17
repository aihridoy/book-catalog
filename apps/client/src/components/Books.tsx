import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { Spin, Row, Col } from "antd";
import { BookOutlined, UserOutlined, HeartOutlined } from "@ant-design/icons";
import { useAppSelector } from "../redux/hook";
import BookCard from "./BookCard";

export default function Books() {
  const {
    data: booksResponse,
    isLoading,
    error,
  } = useGetBooksQuery({}, { refetchOnMountOrArgChange: true });
  const books = booksResponse?.data || [];
  const { user } = useAppSelector((state) => state.user);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Spin size="large" className="mb-4" />
          <p className="text-gray-600 text-lg">Loading your books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg">
          <BookOutlined className="text-6xl text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600">
            Error loading books: {error.toString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-1/4 w-36 h-36 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full opacity-15 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-12 w-28 h-28 bg-gradient-to-br from-red-200 to-pink-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="absolute bottom-40 left-8 w-20 h-20 bg-gradient-to-br from-orange-200 to-amber-300 rotate-45 opacity-25"></div>
        <div
          className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>

        {/* Floating book-like rectangles */}
        <div className="absolute top-16 right-1/4 w-12 h-20 bg-gradient-to-b from-blue-300 to-blue-400 rounded-sm opacity-20 transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-24 right-16 w-10 h-16 bg-gradient-to-b from-green-300 to-green-400 rounded-sm opacity-25 transform -rotate-6"></div>
        <div
          className="absolute top-2/3 left-16 w-8 h-14 bg-gradient-to-b from-purple-300 to-purple-400 rounded-sm opacity-30 transform rotate-45 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Large background patterns */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-amber-100 via-orange-100 to-transparent rounded-full opacity-40 -mr-40 -mb-40"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-red-100 via-pink-100 to-transparent rounded-full opacity-30 -ml-32 -mt-32"></div>

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          {/* Header decorative background */}
          <div className="absolute inset-0 -top-8 -bottom-8">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute top-4 left-1/4 w-8 h-12 bg-blue-300 rounded-sm opacity-30 transform rotate-12"></div>
            <div className="absolute -top-2 right-1/3 w-6 h-10 bg-green-300 rounded-sm opacity-25 transform -rotate-6"></div>
            <div className="absolute top-4 left-3/4 w-5 h-8 bg-purple-300 rounded-sm opacity-20 transform rotate-45"></div>
          </div>

          <div className="relative z-10">
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                Explore Our
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent block relative">
                  Book Universe
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-60"></div>
                </span>
              </h1>
            </div>

            <p className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Dive into our carefully curated collection of literary treasures.
              <br className="hidden md:block" />
              Every book tells a story, every page holds an adventure.
            </p>

            {/* Enhanced stats with icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50 transform hover:scale-105 transition-all duration-300">
                <BookOutlined className="text-3xl text-amber-600 mb-3" />
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  {books.length}
                </div>
                <div className="text-gray-600 font-medium">Books Available</div>
              </div>
              <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50 transform hover:scale-105 transition-all duration-300">
                <UserOutlined className="text-3xl text-orange-600 mb-3" />
                <div className="text-4xl font-bold text-orange-600 mb-2">∞</div>
                <div className="text-gray-600 font-medium">
                  Stories to Discover
                </div>
              </div>
              <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50 transform hover:scale-105 transition-all duration-300">
                <HeartOutlined className="text-3xl text-red-600 mb-3" />
                <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
                <div className="text-gray-600 font-medium">
                  Pure Reading Joy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-12 shadow-lg max-w-md mx-auto">
              <BookOutlined className="text-6xl text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No books found
              </h3>
              <p className="text-gray-600">
                Check back later for new additions to our collection!
              </p>
            </div>
          </div>
        ) : (
          <Row gutter={[24, 24]} className="relative">
            {books.map((book) => (
              <Col key={book._id} xs={24} sm={12} md={8} lg={6}>
                <BookCard book={book} user={user} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
