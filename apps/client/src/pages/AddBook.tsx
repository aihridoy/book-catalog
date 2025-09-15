// src/components/AddBook.tsx
import { Form, Input, Button, DatePicker } from "antd";
import { useState } from "react";
import { useAddBookMutation } from "../redux/features/book/bookApi";
import { setLoading, setError } from "../redux/features/book/bookSlice";
import { useNavigate } from "react-router";
import type { IBook } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hook";

export default function AddBook() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [addBook] = useAddBookMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.book);

  const onFinish = async (values: IBook & { confirmPassword?: string }) => {
    dispatch(setLoading(true));

    // Use the provided imageUrl or a fallback Unsplash URL
    const finalImageUrl = imageUrl || "https://via.placeholder.com/150";
    const bookData: IBook = {
      image: finalImageUrl,
      title: values.title || "",
      author: values.author || "",
      genre: values.genre || "",
      publicationDate: values.publicationDate?.toString() || "",
    };

    try {
      await addBook(bookData).unwrap();
      dispatch(setLoading(false));
      form.resetFields();
      navigate("/");
    } catch (err: unknown) {
      const errorMessage =
        (err as { data?: { error?: string } })?.data?.error ||
        "Failed to add book";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Add a New Book</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* Book Image URL Input */}
          <Form.Item
            label="Book Cover Image URL"
            name="image"
            rules={[{ required: true, message: "Please enter an image URL!" }]}
          >
            <Input
              placeholder="Enter Unsplash URL or other image URL"
              size="large"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Item>

          {/* Title */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter book title!" }]}
          >
            <Input placeholder="Enter book title" size="large" />
          </Form.Item>

          {/* Author */}
          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please enter author name!" }]}
          >
            <Input placeholder="Enter author name" size="large" />
          </Form.Item>

          {/* Genre */}
          <Form.Item
            label="Genre"
            name="genre"
            rules={[{ required: true, message: "Please enter book genre!" }]}
          >
            <Input placeholder="Enter book genre" size="large" />
          </Form.Item>

          {/* Publication Date */}
          <Form.Item
            label="Publication Date"
            name="publicationDate"
            rules={[
              { required: true, message: "Please select publication date!" },
            ]}
          >
            <DatePicker className="w-full" size="large" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={isLoading}
            >
              Add Book
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
