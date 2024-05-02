import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import { list } from "../data";
import ProductCard from "../components/CategoryComp/ProductCard";
import { Button } from "../components/Button";
import SideBar from "../components/CategoryComp/SideBar";
import { useFilter } from "../context/FilterContext";
import axios from "axios";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { products, setProducts, filters, setFilters, applyFilters, setSort } =
    useFilter();
  const [list, setList] = useState([]);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const [isSidebarOpen, setSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://camapi-in57.onrender.com/api/items");
      console.log(response.data);
      setList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setProducts([]);
    fetchData(); // Call the async function
  }, [categoryId, filters, isDesktop]);

  useEffect(() => {
    // Filter products based on category after list is updated
    const categoryProducts = list.filter(
      (product) => product.category.toLowerCase() === categoryId
    );

    // Create an array to store all the promises for fetching rating data
    const fetchRatingPromises = categoryProducts.map((product) =>
      axios.get(`https://camapi-in57.onrender.com/api/rating/rat/${product?._id}`)
    );

    // Use Promise.all to wait for all API requests to complete
    Promise.all(fetchRatingPromises)
      .then((responses) => {
        // Map over the responses to extract averageRating and count for each product
        const updatedProducts = categoryProducts.map((product, index) => {
          const { averageRating, count } = responses[index].data;
          // Return the product object with averageRating and count added
          return {
            ...product,
            averageRating,
            count,
          };
        });
        // Apply filters to the updated products list
        const filteredProducts = applyFilters(updatedProducts, filters);
        // Set the updated products with average rating and count to the state
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error fetching rating data:", error);
        // If there's an error, set products to an empty array or handle as needed
        setProducts([]);
      });
  }, [list, categoryId, filters, isDesktop]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  // list.map((categories) => console.log(categories.category == categoryId));
  const Products = products.map((item) => (
    <ProductCard key={item._id} product={item} />
  ));

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="flex p-2 justify-between">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to={"/"}
                className="inline-flex items-center text-md font-medium text-gray-100 hover:text-blue-600  dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Category Page
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-100 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ms-1 text-md capitalize font-medium text-gray-100 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {categoryId}
                </a>
              </div>
            </li>
            {
              
            }
          </ol>
        </nav>

        {!isDesktop && (
          <button
            className={`p-3 mx-2  border border-red-600 rounded-xl ${
              isSidebarOpen
                ? " bg-red-500 text-white"
                : "bg-bgimage text-gray-900 "
            }  `}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <span> Close Sort Filters </span>
            ) : (
              <span> Open Sort Filters </span>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-12 gap-4 min-h-[800px] ">
        <div
          className={`col-span-4 md:col-span-2 z-40  ${
            !isDesktop ? "absolute top-0 py-1 " : " py-10"
          }   bg-white gap-5 border ${isSidebarOpen ? "block" : "hidden"}`}
        >
          <div className="flex justify-center items-center ">
            <div
              onClick={() => {
                setFilters({ rating: null, price: null, pincode: null });
                setSort({
                  priceAsc: false,
                  priceDesc: false,
                  popularAsc: false,
                  popularDesc: false,
                });
              }}
            >
              <Button>Clear Filters</Button>
            </div>
          </div>
          <SideBar category={categoryId} />
        </div>

        <div className="col-span-8 md:col-span-10   md:flex-none mobile border pt-10 pb-10 px-10 ">
          <div className="flex flex-wrap gap-6">{Products}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
