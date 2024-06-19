import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="bg-white shadow p-2">
      <div className="mx-12 flex items-center justify-between">
        <div className="flex items-center">
          <Link to={"/"}>
            <h1 className="text-3xl font-bold text-black">
              <span className="text-black">D</span>
              <span className="text-red-500">i</span>
              <span className="text-orange-500">g</span>
              <span className="text-yellow-500">e</span>
              <span className="text-green-500">s</span>
              <span className="text-blue-500">t</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={"/publish"}
            className="flex flex-row bg-transparent hover:bg-black hover:text-white hover:rounded text-black font-semibold py-2 px-2"
          >
            <div className="px-1">
              <Write />
            </div>
            <div className="px-1">Write</div>
          </Link>
          <div className="relative">
            {token ? (
              <>
                <button onClick={toggleDropdown}>
                  <Avatar size={"big"} name="Abhi" />
                </button>
              </>
            ) : (
              <Link
                to={"/signin"}
                className="flex flex-row bg-black text-white rounded hover:bg-transparent hover:text-black hover:border-black hover:border font-semibold py-2 px-2"
              >
                Login
              </Link>
            )}

            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <ul>
                  <li>
                    <Link
                      to={"/user-blogs"}
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                    >
                      My Posts
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

function Write() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Write"
    >
      <path
        d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
        fill="currentColor"
      ></path>
      <path
        d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
        stroke="currentColor"
      ></path>
    </svg>
  );
}
