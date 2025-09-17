import { useParams } from "react-router";
import { useGetBookByIdQuery } from "../redux/features/book/bookApi";
import { Spin, Typography, Tag, Button } from "antd";
import {
  BookOutlined,
  UserOutlined,
  CalendarOutlined,
  TagOutlined,
  ArrowLeftOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import RelatedBooks from "../components/RelatedBooks";
import { Link } from "react-router";
import { useEffect } from "react";

const { Title, Text } = Typography;

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetBookByIdQuery(id!, { skip: !id });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Spin size="large" className="mb-4" />
          <p className="text-gray-600 text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg max-w-md">
          <BookOutlined className="text-6xl text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600">Error loading book details</p>
        </div>
      </div>
    );
  }

  const book = data?.data;

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg max-w-md">
          <BookOutlined className="text-6xl text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Book not found
          </h3>
          <p className="text-gray-600">
            The book you're looking for doesn't exist
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 right-1/3 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full opacity-10 animate-pulse"></div>
          <div
            className="absolute top-1/2 left-12 w-24 h-24 bg-gradient-to-br from-red-200 to-pink-300 rounded-full opacity-15 animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
          <div className="absolute bottom-40 right-8 w-20 h-20 bg-gradient-to-br from-orange-200 to-amber-300 rotate-45 opacity-20"></div>

          {/* Floating book-like rectangles */}
          <div className="absolute top-32 left-1/4 w-10 h-16 bg-gradient-to-b from-blue-300 to-blue-400 rounded-sm opacity-15 transform rotate-12 animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-8 h-12 bg-gradient-to-b from-green-300 to-green-400 rounded-sm opacity-20 transform -rotate-6"></div>
          <div className="absolute top-3/4 right-16 w-6 h-10 bg-gradient-to-b from-purple-300 to-purple-400 rounded-sm opacity-25 transform rotate-45"></div>

          {/* Large background patterns */}
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-amber-100 via-orange-100 to-transparent rounded-full opacity-30 -mr-40 -mb-40"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-red-100 via-pink-100 to-transparent rounded-full opacity-20 -ml-32 -mt-32"></div>
        </div>

        <div className="relative container mx-auto px-6 py-12 z-10">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link to="/">
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                className="bg-white bg-opacity-70 backdrop-blur-sm border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300"
              >
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Main Book Details */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Book Cover */}
              <div className="relative z-20">
                <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 shadow-xl relative z-20">
                  <div className="relative overflow-hidden rounded-xl">
                    {book.image ? (
                      <img
                        alt={book.title}
                        src={book.image}
                        className="w-full h-[500px] object-fill transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-[500px] flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                        <BookOutlined className="text-8xl text-amber-600" />
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <Button
                      type="primary"
                      size="large"
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 border-none hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:scale-105"
                      icon={<HeartOutlined />}
                    >
                      Add to Favorites
                    </Button>
                    <Button
                      size="large"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 hover:scale-105"
                      icon={<ShareAltOutlined />}
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Book Information */}
              <div className="space-y-8 relative z-20">
                {/* Header */}
                <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <div className="mb-6">
                    <Title level={1} className="!mb-4 !text-gray-800">
                      {book.title}
                    </Title>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                  </div>

                  <div className="space-y-6">
                    {/* Author */}
                    <div className="flex items-center space-x-3">
                      <UserOutlined className="text-xl text-amber-600" />
                      <div>
                        <Text className="text-gray-500 text-sm block">
                          Author
                        </Text>
                        <Text className="text-lg font-semibold text-gray-800">
                          {book.author}
                        </Text>
                      </div>
                    </div>

                    {/* Genre */}
                    <div className="flex items-center space-x-3">
                      <TagOutlined className="text-xl text-orange-600" />
                      <div>
                        <Text className="text-gray-500 text-sm block">
                          Genre
                        </Text>
                        <Tag
                          color="orange"
                          className="mt-1 border-0 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-medium px-3 py-1 text-sm"
                        >
                          {book.genre}
                        </Tag>
                      </div>
                    </div>

                    {/* Publication Date */}
                    <div className="flex items-center space-x-3">
                      <CalendarOutlined className="text-xl text-red-600" />
                      <div>
                        <Text className="text-gray-500 text-sm block">
                          Published
                        </Text>
                        <Text className="text-lg font-semibold text-gray-800">
                          {new Date(book.publicationDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <Title
                    level={4}
                    className="!mb-4 !text-gray-800 flex items-center"
                  >
                    <BookOutlined className="mr-2 text-amber-600" />
                    Book Information
                  </Title>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                      <Text className="text-gray-600">
                        <Text strong>Added to collection: </Text>
                        {new Date(book.createdAt!).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Books */}
      <RelatedBooks genre={book.genre} currentBookId={book._id!} />
    </>
  );
}
