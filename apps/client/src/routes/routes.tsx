import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import AddBook from "../pages/AddBook";
import BookDetails from "../pages/BookDetails";
import Profile from "../pages/Profile";
import BooksByGenre from "../pages/BooksByGenre";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/books/genre/:genre",
        element: <BooksByGenre />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default routes;
