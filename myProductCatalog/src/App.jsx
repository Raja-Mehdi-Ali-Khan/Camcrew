// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import {
//   Routes,
//   Route,
//   createBrowserRouter,
//   RouterProvider,
//   Router,
// } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";

import Footer from "./components/Footer";
import CartProvider from "./context/ServiceContext";
import bgImage from "../src/assets/bgimage.jpg";
import FilterProvider from "./context/FilterContext";
import Header from "./components/Header";
import Form from "./pages/Form";
import User from "./pages/User";
import EditProfilePage from "./pages/User";
import AddCam from "./pages/AddCam";
import RCalendar from "./components/Calendar";
import ComparisonPage from "./pages/Compare";
import { ComparisonProvider } from "./context/ComparsionContext";
import { UserProvider } from "./context/UserContext";
import FavPage from "./pages/FavPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/category/:categoryId",
//     element: <CategoryPage />,
//   },
//   {
//     path: "/product/:productId",
//     element: <ServiceDetailsPage />,
//   },
//   {
//     path: "/cart",
//     element: <CartPage />,
//   },s
// ]);

const App = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <>
      {/* <User /> */}
      <div
        id="google_translate_element"
        className=" absolute top-0   z-10 "
      ></div>
      <UserProvider>
        <FilterProvider>
          <ComparisonProvider>
            <CartProvider>
              <Router>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/category/:categoryId"
                    element={<CategoryPage />}
                  />
                  <Route
                    path="/product/:productId"
                    element={<ServiceDetailsPage />}
                  />
                  <Route path="/cart" element={<FavPage />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/edituser" element={<EditProfilePage />} />
                  <Route path="/add" element={<AddCam />} />
                  <Route path="/cal" element={<RCalendar />} />
                  <Route path="/compare" element={<ComparisonPage />} />
                </Routes>
                <Footer />
              </Router>
            </CartProvider>
          </ComparisonProvider>
        </FilterProvider>
      </UserProvider>
    </>
  );
};

export default App;
