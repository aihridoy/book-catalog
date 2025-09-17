import {
  BookOutlined,
  CalendarOutlined,
  EyeOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Tag } from "antd";
import { Link } from "react-router";
import type { IBook, IUser } from "../types";
const { Meta } = Card;

export default function BookCard({
  book,
  user,
}: {
  book: IBook;
  user: IUser | null;
}) {
  return (
    <div>
      <Card
        className="h-full bg-white bg-opacity-80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl ease-in-out transform hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden group"
        cover={
          <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200">
            {book.image ? (
              <img
                alt={book.title}
                src={book.image}
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 transition-colors duration-500 group-hover:from-amber-200 group-hover:to-orange-200">
                <BookOutlined className="text-4xl text-amber-600 transition-transform duration-500 group-hover:scale-110" />
              </div>
            )}
            {book.userId === user?._id && (
              <div className="absolute top-3 right-3 transition-transform duration-300 group-hover:scale-110">
                <Tag color="success" className="border-0 shadow-sm">
                  Yours
                </Tag>
              </div>
            )}
            {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500"></div> */}
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
                <Link to={`/book-details/${book?._id}`}>
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
    </div>
  );
}
