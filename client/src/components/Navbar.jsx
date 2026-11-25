import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-serif font-bold text-gray-900 tracking-tight"
        >
          Book-Bound
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-[#1B8A7E] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-[#1B8A7E] transition-colors"
          >
            Explore
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                {user.name}
              </span>
              <Link
                to="/create"
                className="bg-[#1B8A7E] hover:bg-[#146B62] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Write a Post
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-[#1B8A7E] transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-[#1B8A7E] hover:bg-[#146B62] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
