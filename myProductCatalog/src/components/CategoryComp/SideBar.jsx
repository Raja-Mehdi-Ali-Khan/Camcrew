import React, { useState } from "react";
import Star from "./Star";
import { categories } from "../../data";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useFilter } from "../../context/FilterContext";

export const AccordionItem = ({ title, content, index }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    // setIsOpen(!isOpen);
    setIsOpen(!isOpen);
    // console.log("Is Open:", isOpen);
  };

  return (
    <div className="relative mb-3" key={index}>
      <h6 className="mb-0">
        <button
          className="relative text-[1.3rem] flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
          onClick={toggleAccordion}
        >
          <span>{title}</span>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className="ml-auto"
          />
        </button>
      </h6>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        }  overflow-hidden text-xl transition-all duration-300 ease-in-out`}
      >
        {content}
      </div>
    </div>
  );
};

const SideBar = ({ category }) => {
  const {
    products,
    setProducts,
    ascSort,
    descSort,
    filters,
    setFilters,
    popularAscSort,
    popularDescSort,
    sort,
    setSort,
  } = useFilter();
  const [slider, setSlider] = useState();

  const priceOptions = ["90", "50", "25"];

  const [selectedPrice, setSelectedPrice] = useState(null);

  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, rating });
    setSelectedRating(rating);
  };

  const handlePriceChange = (price) => {
    setFilters({ ...filters, price });
    setSelectedPrice(price);
    // Add any additional logic you need here
  };

  const [pincode, setPincode] = useState("");

  const handlePincodeChange = (pincode) => {
    setFilters({ ...filters, pincode });
  };

  // console.log(slider);
  return (
    <div>
      <AccordionItem
        title="Categories"
        content={
          <div>
            {categories.map((product) => (
              <Link
                key={product.id}
                className={`flex flex-col my-1 items-center text-left  ${
                  category == product.name.toLowerCase()
                    ? "font-bold bg-bgimage text-gray-900 rounded "
                    : ""
                } `}
                to={`/category/${product.name.toLowerCase()}`}
              >
                {product.name}
              </Link>
            ))}
          </div>
        }
        index={1}
      />
      <AccordionItem
        title="Top Rated"
        content={
          <div className="flex flex-col  items-center">
            {[4, 3, 2, 1].map((item, index) => (
              <label className="flex" key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={item}
                  checked={filters.rating === item}
                  onChange={() => handleRatingChange(item)}
                />
                <div className="flex items-center  my-1 ">
                  <span>{Star(item, true)} </span>
                  <span>& Up</span>
                </div>
              </label>
            ))}
          </div>
        }
        index={2}
      />
      <AccordionItem
        title="Search by Pincode"
        content={
          <div className="flex flex-col items-center p-1 text-xl">
            <input
              type="text"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
            <button
              onClick={() => handlePincodeChange(pincode)}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:border-gray-500"
            >
              Search
            </button>
          </div>
        }
        index={3}
      />

      <AccordionItem
        title=" Filter "
        content={
          <div className=" flex  flex-col justify-center  items-center p-1 text-xl ">
            <div
              onClick={() => {
                ascSort();
                setSort({
                  priceAsc: true,
                  priceDesc: false,
                  popularAsc: false,
                  popularDesc: false,
                });
              }}
              className={`px-4 py-1 text-xl   ${
                sort.priceAsc ? "bg-bgimage font-semibold text-gray-900" : ""
              }  text-blue-gray-500/80 `}
            >
              Price (Low to High)
            </div>
            <div
              onClick={() => {
                descSort();
                setSort({
                  priceAsc: false,
                  priceDesc: true,
                  popularAsc: false,
                  popularDesc: false,
                });
              }}
              className={`px-4 py-1 text-xl   ${
                sort.priceDesc ? "bg-bgimage font-semibold text-gray-900" : ""
              }  text-blue-gray-500/80 `}
            >
              Price (High to Low)
            </div>
            <div
              onClick={() => {
                popularAscSort();
                setSort({
                  priceAsc: false,
                  priceDesc: false,
                  popularAsc: true,
                  popularDesc: false,
                });
              }}
              className={`px-4 py-1 text-xl   ${
                sort.popularAsc ? "bg-bgimage font-semibold text-gray-900" : ""
              }  text-blue-gray-500/80  `}
            >
              Popularity (Low to High)
            </div>
            <div
              onClick={() => {
                popularDescSort();
                setSort({
                  priceAsc: false,
                  priceDesc: false,
                  popularAsc: false,
                  popularDesc: true,
                });
              }}
              className={`px-4 py-1 text-xl   ${
                sort.popularDesc ? "bg-bgimage font-semibold text-gray-900" : ""
              }  text-blue-gray-500/80 `}
            >
              Popularity (High to Low)
            </div>
          </div>
        }
        index={4}
      />
      <AccordionItem
        title="Price Filter"
        content={
          <div className="flex flex-col items-center p-1 text-xl">
            {priceOptions.map((price, index) => (
              <label
                className="flex items-center my-0.5 rounded border p-2"
                key={index}
              >
                <input
                  type="radio"
                  name="price"
                  value={price}
                  checked={filters.price === price}
                  onChange={() => handlePriceChange(price)}
                  className="mr-2" // Add margin to separate the radio button and label
                />
                Under ₹{price}
              </label>
            ))}
          </div>
        }
        index={5}
      />
    </div>
  );
};

export default SideBar;
