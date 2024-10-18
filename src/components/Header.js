import React, { useContext, useState } from "react";
import axios from "axios";
import { GrSearch } from "react-icons/gr";
import { FaCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import logo from "../assest/logo.png";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  // const [search, setSearch] = useState(searchInput?.search?.split("=")[1]);

  const userId = user?.data?._id;

  const cleanSearchQuery = () => {
    const query = searchInput?.search?.split("=")[1];
    if (query) {
      // Check if the query contains forbidden terms like "userEmail" or numeric IDs
      const forbiddenTerms = ["userId", "userEmail", /\d{9,}/]; // Add more terms if needed
      if (
        forbiddenTerms.some((term) =>
          term instanceof RegExp ? term.test(query) : query.includes(term)
        )
      ) {
        return ""; // Return empty string if it's an unwanted value
      }
      return query;
    }
    return "";
  };
  const [search, setSearch] = useState(cleanSearchQuery());

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
        withCredentials: true,
      });
      dispatch(setUserDetails(null));
      toast.success("Logout Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to Logout");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center justify-between px-4 sm:px-5">
        <div className="">
          <Link to={"/"}>
            <img
              src={logo}
              alt="success"
              width={50}
              height={50}
              className="mix-blend-multiply object-scale-down bg-white"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 flex-grow max-w-md">
          <div className="w-1/2">
            <select className="w-full outline-none p-2 text-xs sm:text-sm border border-orange-200 rounded-full focus-within:shadow py-2 sm:py-3">
              <option>Available Branches</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Coimbatore</option>
              <option>Hyderabad</option>
              <option>Kochi</option>
              <option>Madurai</option>
              <option>Pondicherry</option>
              <option>Salem</option>
              <option>Trichy</option>
              <option>Tirunelveli</option>
            </select>
          </div>
          <div className="flex items-center w-1/2 border border-orange-200 rounded-full focus-within:shadow pl-2">
            <input
              type="text"
              placeholder="search product here..."
              className="w-full outline-none p-1 text-xs sm:text-sm bg-transparent"
              onChange={handleSearch}
              value={search}
            />
            <div className="text-lg min-w-[40px] h-8 sm:h-10 bg-orange-400 flex items-center justify-center rounded-r-full text-white">
              <GrSearch />
            </div>
          </div>
        </div>

        {/* User Menu and Cart */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* User Profile Icon */}
          <div className="relative flex justify-center">
            {user?.data?._id && (
              <div
                className="text-2xl sm:text-3xl cursor-pointer flex justify-center text-orange-400"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                <FaCircleUser />
              </div>
            )}

            {/* Dropdown Menu */}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg  rounded">
                <nav>
                  {user?.data?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hover:bg-orange-400 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to={"/order"}
                    className="whitespace-nowrap hover:bg-orange-400 p-2"
                    onClick={() => setMenuDisplay((prev) => !prev)}
                  >
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          {user?.data?._id && (
            <Link
              to={"/cart"}
              className="text-2xl sm:text-3xl relative text-orange-400"
            >
              <span>
                <FaCartShopping />
              </span>
              <div className="bg-orange-400 text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center p-1 absolute -top-2 -right-3">
                <p className="text-xs sm:text-sm">
                  {context?.cartProductCount}
                </p>
              </div>
            </Link>
          )}

          {/* Logout / Login (Mobile and Desktop) */}
          <div className="block md:hidden">
            {userId ? (
              <div
                onClick={handleLogout}
                className="text-2xl sm:text-3xl text-orange-400 cursor-pointer"
              >
                <FaSignOutAlt />
              </div>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-orange-400 rounded-full text-white"
              >
                Login
              </Link>
            )}
          </div>

          <div className="hidden md:block">
            {userId ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-orange-400 rounded-full text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-orange-400 rounded-full text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
