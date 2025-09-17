import {
  BookOutlined,
  HeartOutlined,
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-20 right-1/4 w-16 h-16 bg-red-200 rounded-full opacity-25"></div>
      </div>

      <div className="relative container mx-auto px-6 py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                <BookOutlined className="text-white text-2xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
                BookVerse
              </span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Your ultimate destination for discovering, exploring, and sharing
              the world of books. Join our community of passionate readers and
              embark on endless literary adventures.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {[
                {
                  icon: TwitterOutlined,
                  href: "#",
                  color: "hover:text-blue-500",
                },
                {
                  icon: FacebookOutlined,
                  href: "#",
                  color: "hover:text-blue-600",
                },
                {
                  icon: InstagramOutlined,
                  href: "#",
                  color: "hover:text-pink-500",
                },
                {
                  icon: LinkedinOutlined,
                  href: "#",
                  color: "hover:text-blue-700",
                },
              ].map(({ icon: Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  className={`bg-white bg-opacity-70 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white border-opacity-50 text-gray-600 ${color} transition-all duration-300 hover:shadow-xl hover:scale-105`}
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Browse Books", path: "/books" },
                { name: "Add Book", path: "/add-book" },
                { name: "My Profile", path: "/profile" },
                { name: "Reading List", path: "/reading-list" },
                { name: "Reviews", path: "/reviews" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-300 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg">
                  <MailOutlined className="text-amber-600" />
                </div>
                <span>hello@bookverse.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg">
                  <PhoneOutlined className="text-orange-600" />
                </div>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg">
                  <EnvironmentOutlined className="text-red-600" />
                </div>
                <span>New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white border-opacity-50 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6">
            Get the latest book recommendations and literary news delivered to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-amber-200 focus:border-amber-400 focus:outline-none bg-white bg-opacity-80"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>

        {/* Popular genres */}
        <div className="mb-8">
          <p className="text-gray-600 mb-4 font-medium text-center">
            Explore Genres:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Fiction",
              "Non-Fiction",
              "Mystery",
              "Romance",
              "Sci-Fi",
              "Fantasy",
              "Biography",
              "History",
              "Self-Help",
              "Poetry",
              "Thriller",
              "Adventure",
            ].map((genre) => (
              <span
                key={genre}
                className="bg-white bg-opacity-80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 hover:bg-amber-100 transition-colors cursor-pointer border border-amber-200 hover:border-amber-400 text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-amber-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span>Made with</span>
              <HeartOutlined className="text-red-500" />
              <span>by the BookVerse team</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-amber-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-600 transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-amber-600 transition-colors">
                Help Center
              </a>
            </div>

            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} BookVerse. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
