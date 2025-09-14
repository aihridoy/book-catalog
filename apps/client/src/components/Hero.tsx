import { Button, Input } from "antd";
import {
  SearchOutlined,
  BookOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Search } = Input;

export default function Hero() {
  const handleSearch = (value) => {
    console.log("Searching for:", value);
    // Implement search functionality
  };

  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-red-200 rounded-full opacity-25"></div>

        {/* Book spine decorations */}
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-amber-100 to-transparent opacity-40">
          <div className="h-full flex flex-col justify-evenly px-2">
            <div className="h-8 bg-red-300 rounded-sm opacity-60"></div>
            <div className="h-12 bg-blue-300 rounded-sm opacity-60"></div>
            <div className="h-6 bg-green-300 rounded-sm opacity-60"></div>
            <div className="h-10 bg-purple-300 rounded-sm opacity-60"></div>
            <div className="h-8 bg-yellow-300 rounded-sm opacity-60"></div>
            <div className="h-14 bg-pink-300 rounded-sm opacity-60"></div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <div className="mb-6">
            <BookOutlined className="text-6xl text-amber-600 mb-4 animate-pulse" />
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-4 leading-tight">
              Discover Your Next
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent block">
                Great Read
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore thousands of books, create your personal library, and
            connect with fellow book lovers. Your literary journey starts here.
          </p>

          {/* Search bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <Search
              placeholder="Search for books, authors, or genres..."
              size="large"
              className="shadow-lg"
              onSearch={handleSearch}
              enterButton={
                <Button
                  type="primary"
                  className="bg-amber-600 border-amber-600 hover:bg-amber-700 hover:border-amber-700 h-full px-8"
                >
                  <SearchOutlined /> Find Books
                </Button>
              }
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-amber-600 to-orange-600 border-none hover:from-amber-700 hover:to-orange-700 shadow-lg h-12 px-8 text-lg font-semibold"
            >
              <BookOutlined /> Browse Catalog
            </Button>
            <Button
              size="large"
              className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 h-12 px-8 text-lg font-semibold"
            >
              <HeartOutlined /> Create Wishlist
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50">
              <div className="text-3xl font-bold text-amber-600 mb-2">50K+</div>
              <div className="text-gray-600 font-medium">Books Available</div>
            </div>
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                15K+
              </div>
              <div className="text-gray-600 font-medium">Happy Readers</div>
            </div>
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50">
              <div className="text-3xl font-bold text-red-600 mb-2">4.9</div>
              <div className="text-gray-600 font-medium flex items-center justify-center gap-1">
                <StarOutlined className="text-yellow-500" />
                Average Rating
              </div>
            </div>
          </div>

          {/* Featured genres */}
          <div className="mt-12">
            <p className="text-gray-600 mb-4 font-medium">Popular Genres:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Fiction",
                "Mystery",
                "Romance",
                "Sci-Fi",
                "Biography",
                "Self-Help",
              ].map((genre) => (
                <span
                  key={genre}
                  className="bg-white bg-opacity-80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 hover:bg-amber-100 transition-colors cursor-pointer border border-amber-200 hover:border-amber-400"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
