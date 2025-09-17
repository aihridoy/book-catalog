import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { Card, Spin, Typography, Button, Tag } from "antd";
import {
  BookOutlined,
  UserOutlined,
  EyeOutlined,
  HeartOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

const { Title } = Typography;
const { Meta } = Card;

interface RelatedBooksProps {
  genre: string;
  currentBookId: string;
}

export default function RelatedBooks({
  genre,
  currentBookId,
}: RelatedBooksProps) {
  const { data, isLoading } = useGetBooksQuery({});
  const books = data?.data || [];

  const related = books.filter(
    (book) => book.genre === genre && book._id !== currentBookId
  );

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Spin size="large" className="mb-4" />
            <p className="text-gray-600 text-lg">Loading related books...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!related.length) {
    return (
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-16">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-orange-200 rounded-full opacity-30"></div>
          <div className="absolute bottom-60 left-8 w-16 h-16 bg-red-200 rounded-full opacity-25"></div>
        </div>

        <div className="relative container mx-auto px-6">
          <div className="text-center">
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-12 shadow-lg max-w-md mx-auto">
              <BookOutlined className="text-6xl text-gray-400 mb-4" />
              <Title level={4} className="!mb-2 !text-gray-800">
                No Related Books
              </Title>
              <p className="text-gray-600">
                No other books found in the <strong>{genre}</strong> genre.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full opacity-15 animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-12 w-28 h-28 bg-gradient-to-br from-red-200 to-pink-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="absolute bottom-40 left-8 w-20 h-20 bg-gradient-to-br from-orange-200 to-amber-300 rotate-45 opacity-25"></div>
        <div
          className="absolute bottom-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>

        {/* Floating book-like rectangles */}
        <div className="absolute bottom-16 right-1/4 w-12 h-20 bg-gradient-to-b from-blue-300 to-blue-400 rounded-sm opacity-20 transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-24 left-16 w-10 h-16 bg-gradient-to-b from-green-300 to-green-400 rounded-sm opacity-25 transform -rotate-6"></div>
        <div
          className="absolute bottom-2/3 right-16 w-8 h-14 bg-gradient-to-b from-purple-300 to-purple-400 rounded-sm opacity-30 transform rotate-45 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Large background patterns */}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-amber-100 via-orange-100 to-transparent rounded-full opacity-40 -ml-40 -mb-40"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-l from-red-100 via-pink-100 to-transparent rounded-full opacity-30 -mr-32 -mb-32"></div>

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

      <div className="relative container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          {/* Header decorative background */}
          <div className="absolute inset-0 -top-8 -bottom-8">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute top-4 left-1/4 w-8 h-12 bg-blue-300 rounded-sm opacity-30 transform rotate-12"></div>
            <div className="absolute -top-2 right-1/3 w-6 h-10 bg-green-300 rounded-sm opacity-25 transform -rotate-6"></div>
            <div className="absolute top-4 left-3/4 w-5 h-8 bg-purple-300 rounded-sm opacity-20 transform rotate-45"></div>
          </div>

          <div className="relative z-10">
            <div className="mb-8">
              <Title
                level={2}
                className="!text-4xl lg:!text-5xl !font-bold !text-gray-800 !mb-6 !leading-tight"
              >
                More Books in
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent block relative">
                  {genre}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-60"></div>
                </span>
              </Title>
            </div>

            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover more captivating stories in the same genre.
              <br className="hidden md:block" />
              Each book offers a unique journey waiting to be explored.
            </p>

            {/* Stats */}
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50 inline-block">
              <div className="flex items-center space-x-4">
                <BookOutlined className="text-2xl text-amber-600" />
                <div>
                  <div className="text-2xl font-bold text-amber-600">
                    {related.length}
                  </div>
                  <div className="text-gray-600 font-medium">
                    Related Books Found
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.map((book) => (
            <Card
              key={book._id}
              className="h-full bg-white bg-opacity-80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl ease-in-out transform hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden group"
              cover={
                <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                  {book.image ? (
                    <img
                      alt={book.title}
                      src={book.image}
                      className="w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 transition-colors duration-500 group-hover:from-amber-200 group-hover:to-orange-200">
                      <BookOutlined className="text-4xl text-amber-600 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  )}
                </div>
              }
              bodyStyle={{ padding: "20px" }}
            >
              <Meta
                title={
                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                    {book.title}
                  </h3>
                }
                description={
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <UserOutlined className="mr-2 text-amber-600" />
                      <span className="text-sm font-medium">{book.author}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Tag
                        color="orange"
                        className="border-0 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-medium"
                      >
                        {book.genre}
                      </Tag>
                      <div className="flex items-center text-gray-500 text-xs">
                        <CalendarOutlined className="mr-1" />
                        {new Date(book.publicationDate).getFullYear()}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                      <Link to={`/book-details/${book._id}`}>
                        <Button
                          type="primary"
                          size="small"
                          className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 border-none hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:scale-105"
                          icon={<EyeOutlined />}
                        >
                          View
                        </Button>
                      </Link>
                      <Button
                        size="small"
                        className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 hover:scale-105"
                        icon={<HeartOutlined />}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
