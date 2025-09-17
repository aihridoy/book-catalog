import { useParams } from "react-router";
import { useGetBookByIdQuery } from "../redux/features/book/bookApi";
import { Card, Spin, Alert, Typography } from "antd";
import RelatedBooks from "../components/RelatedBooks";

const { Title, Text, Paragraph } = Typography;

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetBookByIdQuery(id!, { skip: !id });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert message="Error loading book details" type="error" showIcon />
      </div>
    );
  }

  const book = data?.data;

  if (!book) {
    return (
      <div className="p-4">
        <Alert message="Book not found" type="warning" showIcon />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
        <Card
          className="max-w-3xl w-full shadow-lg rounded-2xl"
          cover={
            <img
              alt={book.title}
              src={book.image}
              className="object-cover h-[400px] w-full rounded-t-2xl"
            />
          }
        >
          <div className="space-y-3">
            <Title level={3} className="!mb-2">
              {book.title}
            </Title>
            <Text strong>Author: </Text>
            <Text>{book.author}</Text>
            <br />
            <Text strong>Genre: </Text>
            <Text>{book.genre}</Text>
            <br />
            <Text strong>Publication Date: </Text>
            <Text>{new Date(book.publicationDate).toLocaleDateString()}</Text>
            <Paragraph className="!mt-4 text-gray-600">
              Added on {new Date(book.createdAt!).toLocaleDateString()}
            </Paragraph>
          </div>
        </Card>
      </div>

      {/* Pass genre + current book id */}
      <RelatedBooks genre={book.genre} currentBookId={book._id!} />
    </>
  );
}
