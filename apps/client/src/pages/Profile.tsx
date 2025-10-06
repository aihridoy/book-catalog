import {
  useGetBooksQuery,
  useGetBooksByGenreQuery,
  useEditBookMutation,
  useDeleteBookMutation,
} from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import UserDetails from "../components/UserDetails";
import MyBooks from "../components/MyBooks";
import EditBookModal from "../components/EditBookModal";
import type { IBook } from "../types";
import FavoriteBooks from "../components/FavoriteBooks";

export default function Profile() {
  const { user } = useAppSelector((state) => state.user);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<IBook | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<IBook>>({});

  const { data: allBooksData, isLoading: isAllBooksLoading } = useGetBooksQuery(
    {}
  );
  const { data: genreBooksData, isLoading: isGenreBooksLoading } =
    useGetBooksByGenreQuery(selectedGenre || "", { skip: !selectedGenre });

  const [editBook, { isLoading: isEditing }] = useEditBookMutation();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const allBooks = allBooksData?.data || [];
  const myBooks = allBooks.filter((book) => book?.userId === user?._id);
  const genreBooks =
    genreBooksData?.data?.filter((book) => book?.userId === user?._id) || [];

  const genres = [...new Set(myBooks.map((book) => book.genre))];
  const displayedBooks = selectedGenre ? genreBooks : myBooks;
  const isLoading = selectedGenre ? isGenreBooksLoading : isAllBooksLoading;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleEditBook = (book: IBook) => {
    setEditingBook(book);
    setEditFormData({
      image: book.image,
      title: book.title,
      author: book.author,
      genre: book.genre,
      publicationDate: book.publicationDate,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingBook || !user?._id) return;

    try {
      await editBook({
        id: editingBook._id!,
        data: { ...editFormData, userId: user._id },
      }).unwrap();

      setEditingBook(null);
      setEditFormData({});
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteBook(bookId).unwrap();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const handleInputChange = (field: keyof IBook, value: string) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 min-h-screen overflow-hidden">
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
        <UserDetails user={user} />
        <MyBooks
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          genres={genres}
          isLoading={isLoading}
          displayedBooks={displayedBooks}
          handleEditBook={handleEditBook}
          handleDeleteBook={handleDeleteBook}
          isDeleting={isDeleting}
        />
      </div>

      <EditBookModal
        editingBook={editingBook}
        setEditingBook={setEditingBook}
        setEditFormData={setEditFormData}
        editFormData={editFormData}
        handleInputChange={handleInputChange}
        handleSaveEdit={handleSaveEdit}
        isEditing={isEditing}
      />

      <FavoriteBooks />
    </div>
  );
}
