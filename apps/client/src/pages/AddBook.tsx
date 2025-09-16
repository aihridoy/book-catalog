import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { useState, useEffect } from "react";
import type { Dayjs } from "dayjs";
import {
  BookOutlined,
  UserOutlined,
  CalendarOutlined,
  PictureOutlined,
  TagOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useAddBookMutation } from "../redux/features/book/bookApi";
import { useNavigate } from "react-router";
import type { IBook } from "../types";
import { useAppSelector } from "../redux/hook";

const { Option } = Select;

export default function AddBook() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [previewData, setPreviewData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: null as Dayjs | null,
  });
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const popularGenres = [
    "Fiction",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Biography",
    "Self-Help",
    "History",
    "Thriller",
    "Adventure",
    "Horror",
    "Drama",
    "Comedy",
    "Poetry",
    "Philosophy",
    "Science",
    "Technology",
    "Business",
  ];

  // Watch form values and update preview
  const watchedValues = Form.useWatch([], form);

  useEffect(() => {
    setPreviewData({
      title: form.getFieldValue("title") || "",
      author: form.getFieldValue("author") || "",
      genre: form.getFieldValue("genre") || "",
      publicationDate: form.getFieldValue("publicationDate"),
    });
  }, [watchedValues, form]);

  const onFinish = async (values: IBook & { confirmPassword?: string }) => {
    const finalImageUrl = imageUrl || "https://via.placeholder.com/150";
    const bookData: IBook = {
      image: finalImageUrl,
      title: values.title || "",
      author: values.author || "",
      genre: values.genre || "",
      publicationDate: values.publicationDate?.toString() || "",
      userId: user?._id || "",
    };

    try {
      await addBook(bookData).unwrap();
      form.resetFields();
      setImageUrl("");
      setPreviewData({
        title: "",
        author: "",
        genre: "",
        publicationDate: null,
      });
      message.success("Book added successfully!");
      navigate("/");
    } catch (err: unknown) {
      const errorMessage =
        (err as { data?: { error?: string } })?.data?.error ||
        "Failed to add book";
      message.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full opacity-15 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-red-200 to-pink-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-orange-200 to-amber-300 rotate-45 opacity-25"></div>

        {/* Floating book shapes */}
        <div className="absolute top-24 right-1/4 w-10 h-16 bg-gradient-to-b from-blue-300 to-blue-400 rounded-sm opacity-20 transform rotate-12"></div>
        <div className="absolute bottom-40 right-12 w-8 h-12 bg-gradient-to-b from-green-300 to-green-400 rounded-sm opacity-25 transform -rotate-6"></div>
        <div className="absolute top-1/2 left-12 w-6 h-10 bg-gradient-to-b from-purple-300 to-purple-400 rounded-sm opacity-30 transform rotate-45"></div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        {/* Back button */}
        <div className="mb-8">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/")}
            className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 transition-all duration-300 text-lg font-medium"
          >
            Back to Collection
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 -top-8 -bottom-8">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 rounded-full opacity-10 blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="mb-6">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg opacity-20 transform rotate-3 animate-pulse"></div>
                  <PlusOutlined className="relative text-5xl text-amber-600 p-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-lg shadow-lg" />
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                  Add New
                  <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent block">
                    Literary Treasure
                  </span>
                </h1>
              </div>

              <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Share your favorite book with our community and help others
                discover their next great read.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white border-opacity-50">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="space-y-6"
              >
                {/* Book Image URL Input */}
                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <PictureOutlined className="text-amber-600" />
                      Book Cover Image
                    </span>
                  }
                  name="image"
                  rules={[
                    { required: true, message: "Please enter an image URL!" },
                  ]}
                >
                  <Input
                    placeholder="Enter image URL (e.g., from Unsplash)"
                    size="large"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="rounded-xl border-gray-300 hover:border-amber-400 focus:border-amber-500 transition-colors duration-300"
                  />
                </Form.Item>

                {/* Title */}
                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <BookOutlined className="text-amber-600" />
                      Book Title
                    </span>
                  }
                  name="title"
                  rules={[
                    { required: true, message: "Please enter book title!" },
                  ]}
                >
                  <Input
                    placeholder="Enter the book title"
                    size="large"
                    className="rounded-xl border-gray-300 hover:border-amber-400 focus:border-amber-500 transition-colors duration-300"
                  />
                </Form.Item>

                {/* Author */}
                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <UserOutlined className="text-amber-600" />
                      Author Name
                    </span>
                  }
                  name="author"
                  rules={[
                    { required: true, message: "Please enter author name!" },
                  ]}
                >
                  <Input
                    placeholder="Enter author's name"
                    size="large"
                    className="rounded-xl border-gray-300 hover:border-amber-400 focus:border-amber-500 transition-colors duration-300"
                  />
                </Form.Item>

                {/* Genre */}
                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <TagOutlined className="text-amber-600" />
                      Genre
                    </span>
                  }
                  name="genre"
                  rules={[
                    { required: true, message: "Please select a genre!" },
                  ]}
                >
                  <Select
                    placeholder="Select or type a genre"
                    size="large"
                    showSearch
                    allowClear
                    className="rounded-xl"
                  >
                    {popularGenres.map((genre) => (
                      <Option key={genre} value={genre}>
                        {genre}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Publication Date */}
                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <CalendarOutlined className="text-amber-600" />
                      Publication Date
                    </span>
                  }
                  name="publicationDate"
                  rules={[
                    {
                      required: true,
                      message: "Please select publication date!",
                    },
                  ]}
                >
                  <DatePicker
                    className="w-full rounded-xl border-gray-300 hover:border-amber-400 focus:border-amber-500"
                    size="large"
                    placeholder="Select publication date"
                  />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item className="mb-0 pt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 border-none hover:from-amber-700 hover:to-orange-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                    size="large"
                    loading={isLoading}
                    icon={<PlusOutlined />}
                  >
                    {isLoading ? "Adding Book..." : "Add to Collection"}
                  </Button>
                </Form.Item>
              </Form>
            </div>

            {/* Preview Section */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white border-opacity-50 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Preview
              </h3>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                {imageUrl ? (
                  <div className="mb-6 flex justify-center">
                    <img
                      src={imageUrl}
                      alt="Book preview"
                      className="w-40 h-56 object-cover rounded-xl shadow-lg border-4 border-white"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/200x280/f59e0b/ffffff?text=Book+Cover";
                      }}
                    />
                  </div>
                ) : (
                  <div className="mb-6 flex justify-center">
                    <div className="w-40 h-56 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl shadow-lg border-4 border-white flex items-center justify-center">
                      <BookOutlined className="text-5xl text-amber-600 opacity-50" />
                    </div>
                  </div>
                )}

                <div className="text-center space-y-3">
                  <h4 className="text-xl font-bold text-gray-800">
                    {previewData.title || "Book Title"}
                  </h4>
                  <p className="text-gray-600 flex items-center justify-center gap-2">
                    <UserOutlined className="text-amber-600" />
                    {previewData.author || "Author Name"}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                      {previewData.genre || "Genre"}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarOutlined />
                      {previewData.publicationDate
                        ? previewData.publicationDate.format("YYYY")
                        : "Year"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-800 text-center">
                  💡 <strong>Tip:</strong> Use high-quality images from Unsplash
                  or similar sources for the best preview!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
