import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { Card, Spin, Typography } from "antd";

const { Title } = Typography;

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

  // filter by same genre & exclude current book
  const related = books.filter(
    (book) => book.genre === genre && book._id !== currentBookId
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Spin size="large" />
      </div>
    );
  }

  if (!related.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        No related books found.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      <Title level={4} className="mb-4 text-center">
        Related Books in {genre}
      </Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {related.map((book) => (
          <Card
            key={book._id}
            cover={
              <img
                alt={book.title}
                src={book.image}
                className="h-64 object-cover rounded-t-lg"
              />
            }
          >
            <Card.Meta title={book.title} description={book.author} />
          </Card>
        ))}
      </div>
    </div>
  );
}
