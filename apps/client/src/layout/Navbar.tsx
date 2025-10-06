import { Link } from "react-router";
import { Input, Dropdown, Menu, Spin } from "antd";
import {
  SearchOutlined,
  BookOutlined,
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  DownOutlined,
  CalendarOutlined,
  TagOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { logout, setLoading } from "../redux/features/user/userSlice";
import { useState, useMemo, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router";
import type { IBook } from "../types";

const { Search } = Input;

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchValue(value.trim());
        setIsSearchDropdownOpen(!!value.trim());
      }, 300),
    []
  );

  // Trigger debounced search on input change
  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.cancel();
  }, [searchValue, debouncedSearch]);

  // Fetch books based on debounced search value
  const { data: booksResponse, isFetching } = useGetBooksQuery(
    { search: debouncedSearchValue },
    { skip: !debouncedSearchValue || debouncedSearchValue.length < 2 }
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        // Check if the clicked element is a search result item or its child
        const clickedElement = event.target as HTMLElement;
        const isSearchResultClick = clickedElement.closest(
          "[data-search-result]"
        );

        // Only close if it's not a search result click
        if (!isSearchResultClick) {
          setIsSearchDropdownOpen(false);
          setSearchValue("");
          setDebouncedSearchValue("");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleResultClick = (bookId: string) => {
    // Use setTimeout to ensure navigation happens before cleanup
    setTimeout(() => {
      navigate(`/book-details/${bookId}`);
      setSearchValue("");
      setDebouncedSearchValue("");
      setIsSearchDropdownOpen(false);
    }, 0);
  };

  const handleLogout = () => {
    dispatch(setLoading(true));
    dispatch(logout());
    dispatch(setLoading(false));
  };

  const profileMenu = (
    <Menu className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      <Menu.Item key="profile">
        <Link to="/profile" className="text-gray-200 hover:text-white">
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <span className="hover:text-red-400">
          {isLoading ? "Logging out..." : "Logout"}
        </span>
      </Menu.Item>
    </Menu>
  );

  const renderSearchResults = () => {
    if (!isSearchDropdownOpen) return null;

    return (
      <div className="absolute left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50 animate-fade-in">
        {isFetching ? (
          <div className="p-4 text-center">
            <Spin size="small" />
            <span className="ml-2 text-gray-300">Searching...</span>
          </div>
        ) : debouncedSearchValue.length >= 2 &&
          booksResponse?.data &&
          booksResponse.data.length > 0 ? (
          booksResponse.data.map((book: IBook) => (
            <div
              key={book._id}
              data-search-result="true"
              className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0 transition-all duration-200"
              onClick={() => book._id && handleResultClick(book._id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg transition-shadow">
                  <BookOutlined className="text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-base truncate mb-1">
                    {book.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                    <UserOutlined className="w-4 h-4" />
                    <span className="truncate">{book.author}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <TagOutlined className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400 font-medium">
                        {book.genre}
                      </span>
                    </div>
                    {book.publicationDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <CalendarOutlined className="w-4 h-4" />
                        <span>
                          {new Date(book.publicationDate).getFullYear()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : debouncedSearchValue.length >= 2 &&
          booksResponse?.data?.length === 0 ? (
          <div className="p-3 text-gray-300">No results found</div>
        ) : debouncedSearchValue.length > 0 &&
          debouncedSearchValue.length < 2 ? (
          <div className="p-3 text-gray-300">Type at least 2 characters</div>
        ) : null}
      </div>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-gray-700 animate-gradient-bg">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold text-white transition-colors duration-300 group cursor-pointer"
            onClick={() => {
              setSearchValue("");
              setDebouncedSearchValue("");
              setIsSearchDropdownOpen(false);
            }}
          >
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl logo-3d">
              <BookOutlined className="text-white text-2xl" />
            </div>
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent tracking-tight">
              BookVerse
            </span>
          </Link>

          <div className="hidden lg:flex flex-1 justify-center px-10">
            <div className="max-w-lg w-full relative" ref={searchContainerRef}>
              <Search
                prefix={<SearchOutlined className="text-gray-400 mr-2" />}
                placeholder="Search books, authors, genres..."
                size="large"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={handleSearch}
                enterButton={
                  <div className="flex items-center gap-2">
                    <SearchOutlined />
                    <span className="hidden sm:inline">Search</span>
                  </div>
                }
                allowClear
                onClear={() => setIsSearchDropdownOpen(false)}
              />
              {renderSearchResults()}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-gray-200 hover:text-white hover:bg-gray-700 rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <LoginOutlined />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  <UserAddOutlined />
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/add-book"
                  className="px-5 py-2.5 text-gray-200 hover:text-white hover:bg-gray-700 rounded-full transition-all duration-300 font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <BookOutlined />
                  Add Book
                </Link>
                <Dropdown overlay={profileMenu} trigger={["hover"]}>
                  <button className="flex items-center gap-2 px-5 py-2.5 text-gray-200 hover:text-white hover:bg-gray-700 rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-lg">
                    <UserOutlined />
                    <span>{user?.username?.split(" ")[0] || "Profile"}</span>
                    <DownOutlined className="text-xs" />
                  </button>
                </Dropdown>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              className="text-white hover:text-amber-300 focus:outline-none p-3 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <CloseOutlined className="w-6 h-6" />
              ) : (
                <MenuOutlined className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div className="lg:hidden mt-4">
          <div className="relative" ref={searchContainerRef}>
            <Search
              prefix={<SearchOutlined className="text-gray-400 mr-2" />}
              placeholder="Search books, authors, genres..."
              size="large"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={handleSearch}
              enterButton={
                <div className="flex items-center gap-2">
                  <SearchOutlined />
                  <span>Search</span>
                </div>
              }
              allowClear
              onClear={() => setIsSearchDropdownOpen(false)}
            />
            {renderSearchResults()}
          </div>
        </div>

        <div className="md:hidden">
          <div
            className={`mobile-menu bg-gray-900 border-t border-gray-700 px-6 py-4 space-y-3 shadow-2xl ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-5 py-3 rounded-full text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 transition-all duration-300 shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LoginOutlined />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-3 px-5 py-3 rounded-full text-base font-medium bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserAddOutlined />
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-5 py-3 rounded-full text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 transition-all duration-300 shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserOutlined />
                  Profile
                </Link>
                <Link
                  to="/add-book"
                  className="flex items-center gap-3 px-5 py-3 rounded-full text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700 transition-all duration-300 shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOutlined />
                  Add Book
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-5 py-3 rounded-full text-base font-medium text-gray-200 hover:text-red-400 hover:bg-gray-700 transition-all duration-300 shadow-md"
                  disabled={isLoading}
                >
                  <LoginOutlined className="rotate-180" />
                  {isLoading ? "Logging out..." : "Logout"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
