import { Link } from "react-router";
import { logout, setLoading } from "../redux/features/user/userSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  console.log(user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(setLoading(true));
    dispatch(logout());
    dispatch(setLoading(false));
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          BookCatalog
        </Link>

        <div className="hidden md:flex space-x-6">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-300">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-gray-300"
              disabled={isLoading}
            >
              Logout
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="md:hidden">
        {isMobileMenuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                disabled={isLoading}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
