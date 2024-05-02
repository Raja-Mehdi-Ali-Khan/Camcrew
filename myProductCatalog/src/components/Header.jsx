import React, { useEffect, useState } from "react";
import Logo from "../assets/shopping-cart.png";
import { FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/ServiceContext";
import { Button } from "./Button";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../context/UserContext";
// import { CgMenu, CgClose } from "react-icons/cg";

const Header = () => {
  const [isMenu, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isLoading } = useAuth0();
  const { userData, updateUser } = useUser();
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  console.log(userData);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://camapi-in57.onrender.com/api/users/email/${user.email}`
        );
        if (!response.ok) {
          updateUser(null);
          // throw new Error("User not found");
        }
        const userData = await response.json();
        updateUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call fetchUserData only if user is authenticated
    if (isAuthenticated && user) {
      fetchUserData();
    }
  }, [isAuthenticated, user]); // Depend on isAuthenticated and user

  const { itemAmount } = useCart();
  const handleToggleMenu = () => {
    setMenuOpen(!isMenu);
  };
  return (
    <div className="flex flex-wrap place-items-center w-full ">
      <section className="relative mx-auto">
        {/* navbar */}
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <a className="text-3xl font-bold md:ml-2  font-heading" href="#">
              {/* <img class="h-9" src="logo.png" alt="logo"> */}
              CamCrew
            </a>
            {/* Nav Links */}
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <Link to="/" className="hover:text-gray-200">
                  Home
                </Link>
              </li>
              <li>
                <a href="#category" className="hover:text-gray-200">
                  Category
                </a>
              </li>
              <li>
                <Link
                  to="/category/media%20videography"
                  className="hover:text-gray-200"
                >
                  Collections
                </Link>
              </li>
              <li>
                <a href="#footer" className="hover:text-gray-200">
                  Contact Us
                </a>
              </li>
              <li className={` ${userData?.isCameraman ? "hidden" : ""} `}>
                <Link to="/form" className="hover:text-gray-200">
                  Join As Cameraman
                </Link>
              </li>
              <li className={` ${!userData?.isCameraman ? "hidden" : ""} `}>
                <Link to="/edituser" className="hover:text-gray-200">
                  Edit Profile
                </Link>
              </li>
              <li className={` ${!userData?.isCameraman ? "hidden" : ""} `}>
                <Link to="/add" className="hover:text-gray-200">
                  Add Service
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-gray-200">
                  Comparison
                </Link>
              </li>
            </ul>
            {/* Header Icons */}
            <div className="hidden xl:flex items-center space-x-5 ">
              <a className=" hidden hover:text-gray-200" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </a>
              <a className="flex items-center hover:text-gray-200" href="#">
                <div className="relative">
                  <FaStar
                    onClick={() => navigate("/cart")}
                    className=" w-10 h-10   "
                  />
                  <span className=" w-6 h-7 flex justify-center items-center text-sm   absolute rounded-[50%] top-[-20%] left-[70%] bg-bgimage text-gray-900 ">
                    {itemAmount}
                  </span>
                </div>
              </a>
              {!isAuthenticated ? (
                <Button onClick={() => loginWithRedirect()}>Login</Button>
              ) : (
                <div className="flex gap-2 ">
                  <span className="flex text-xl  ">
                    Hello {user?.given_name}{" "}
                  </span>
                  <Button
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    LogOut
                  </Button>
                </div>
              )}
              {/* Sign In / Register      */}
            </div>
          </div>
          {/* Responsive navbar */}
          <div className="xl:hidden flex gap-2 mr-2 items-center">
            {!isAuthenticated ? (
              <Button onClick={() => loginWithRedirect()}>Login</Button>
            ) : (
              <div className="flex gap-1 ">
                <span className="flex text-xl  ">
                  Hello {user?.given_name}{" "}
                </span>
                <Button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  LogOut
                </Button>
              </div>
            )}
            <div className="relative">
              <FaStar
                onClick={() => navigate("/cart")}
                className=" w-10 h-10   "
              />
              <span className=" w-6 h-7 flex justify-center items-center text-sm   absolute rounded-[50%] top-[-30%] left-[50%] bg-bgimage text-gray-900">
                {itemAmount}
              </span>
            </div>
          </div>
          <button
            onClick={handleToggleMenu}
            className="navbar-burger self-center mr-4 xl:hidden"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </section>
      <div className=" absolute top-[4rem]  right-2 ">
        {" "}
        {isMenu && (
          <div className="xl:hidden rounded-xl bg-gray-900 text-white p-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/"
                  onClick={handleToggleMenu}
                  className="hover:text-gray-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#category"
                  onClick={handleToggleMenu}
                  className="hover:text-gray-200"
                >
                  Category
                </a>
              </li>
              <li>
                <Link
                  to="/category/electronics"
                  onClick={handleToggleMenu}
                  className="hover:text-gray-200"
                >
                  Collections
                </Link>
              </li>
              <li>
                <a
                  href="#footer"
                  onClick={handleToggleMenu}
                  className="hover:text-gray-200"
                >
                  Contact Us
                </a>
              </li>
              <li
                onClick={handleToggleMenu}
                className={` ${userData?.isCameraman ? "hidden" : ""} `}
              >
                <Link to="/form" className="hover:text-gray-200">
                  Join As Cameraman
                </Link>
              </li>
              <li
                onClick={handleToggleMenu}
                className={` ${!userData?.isCameraman ? "hidden" : ""} `}
              >
                <Link to="/edituser" className="hover:text-gray-200">
                  Edit Profile
                </Link>
              </li>
              <li
                onClick={handleToggleMenu}
                className={` ${!userData?.isCameraman ? "hidden" : ""} `}
              >
                <Link to="/add" className="hover:text-gray-200">
                  Add Service
                </Link>
              </li>
              <li onClick={handleToggleMenu}>
                <Link to="/compare" className="hover:text-gray-200">
                  Comparison
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
