import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, addDays } from "date-fns";
import moment from "moment";

import { list } from "../data";
import Star from "../components/CategoryComp/Star";
import { useCart } from "../context/ServiceContext";
import { useAuth0 } from "@auth0/auth0-react";
import MakeStar from "../components/CategoryComp/MakeStar";
import axios from "axios";
import RatingComp from "../components/RatingComp";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import Calendar from "react-calendar";

const ServiceDetailsPage = () => {
  const { addToCart } = useCart();
  const { productId } = useParams();
  const [list, setList] = useState([]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://camapi-in57.onrender.com/api/items");
      // console.log(response.data);
      setList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const product = list.filter((item) => item._id == productId);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [state, setState] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(0);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [excludedIntervals, setExcludedIntervals] = useState([]);



  const handleStartDateChange = (date) => {
    setStartDate(date);
    // calculateNumberOfDays(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    // calculateNumberOfDays(startDate, date);
  };

  // const calculateNumberOfDays = (start, end) => {
  useEffect(() => {
    if (startDate && endDate) {
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setNumberOfDays(Math.round(differenceInDays));
    }
  }, [startDate, endDate]);
  // };

  // useEffect(() => {
  //   if (checkIn && checkOut) {
  //     const startDate = new Date(checkIn);
  //     const endDate = new Date(checkOut);
  //     const differenceInTime = endDate.getTime() - startDate.getTime();
  //     const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  //     setNumberOfDays(Math.round(differenceInDays));
  //   }
  // }, [checkIn, checkOut]);

  const handleCheckInChange = (ev) => {
    setCheckIn(ev.target.value);
    // calculateNumberOfDays();
  };

  const handleCheckOutChange = (ev) => {
    setCheckOut(ev.target.value);
    // calculateNumberOfDays();
  };

  const [rating, setRating] = useState("");

  // const { user, logout, isAuthenticated, isLoading } = useAuth0();
  const [desc, setDesc] = useState("");
  const [Loading, setLoading] = useState(false);
  const [ratingArr, setRatingArr] = useState([]);

  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(null);
  // Replace with your actual product ID

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        // Make a GET request to fetch the rating data for the product ID
        const response = await axios.get(
          `https://camapi-in57.onrender.com/api/rating/rat/${productId}`
        );
        // Extract average rating and count from the response data
        const { averageRating, count } = response.data;
        // Update state with the received data
        setAverageRating(averageRating || 0);
        setRatingCount(count || 0);
        // console.log(averageRating);
      } catch (error) {
        console.error("Error fetching rating data:", error);
      }
    };

    fetchRatingData(); // Call the function to fetch rating data when component mounts
  }, [productId]);

  const fetchRating = async () => {
    try {
      const response = await axios.get(
        `https://camapi-in57.onrender.com/api/rating/${productId}`
      );
      // console.log(response);
      setRatingArr(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchRating();
  }, [productId, Loading, state]);

  // console.log(ratingArr);
  useEffect(() => {
    fetchData();
  }, [productId]);
  // console.log(list);

  // console.log(product);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { user, logout, isAuthenticated, isLoading } = useAuth0();
  const discountedPrice = parseInt(product[0]?.price);
  const originalPriceRef = useRef(
    discountedPrice + Math.random().toFixed(2) * 100 + 100
  );
  // console.log(originalPriceRef);

  const discountPercentage = Math.round(
    ((originalPriceRef.current - discountedPrice) / originalPriceRef.current) *
      100
  );

  const handleAddToCartClick = () => {
    if (isAuthenticated) {
      addToCart(product[0], product[0]?.id);
    } else {
      setShowModal(true);
    }
  };

  // console.log(user);s
  const handleRating = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://camapi-in57.onrender.com/api/rating", {
        rating,
        desc,
        productId: productId,
        userName: user?.given_name,
        userImage: user?.picture,
        count: 1,
      });
      setRating("");
      setDesc("");
      setState(!state);
      // console.log("Rating added:", response.data);
      // window.location.reload();
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  const konsaStar = (star) => {
    setRating(parseInt(star));
  };
  const [isVideo, setVideo] = useState(false);
  const [idx, setIdx] = useState(0);
  const handleIndex = (index) => {
    // console.log(index);
    setIdx(index);
  };
  // console.log(product);

  const paymentHandler = async (e) => {
    const response = await fetch("https://camapi-in57.onrender.com/order", {
      method: "POST",
      body: JSON.stringify({
        amount: parseInt(product[0]?.price * numberOfDays) * 100,
        currency: "INR",
        receipt: productId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    // console.log(order);

    var options = {
      key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: parseInt(product[0]?.price * numberOfDays) * 100,
      currency: "INR",
      name: "CamCrew", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "https://camapi-in57.onrender.com/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const jsonRes = await validateRes.json();

        if (jsonRes.msg == "success") {
          try {
            if (startDate && endDate) {
              const response = await axios.put(
                "https://camapi-in57.onrender.com/update-excluded-intervals",
                {
                  email: product[0]?.email, // Replace with the user's email
                  start: startDate,
                  end: endDate,
                }
              );

              // console.log(response.data.message); // Log success message
            }
          } catch (error) {
            console.error("Error:", error.response.data.message); // Log error message
          }
        }
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: user?.given_name, //your customer's name
        email: user?.email,
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "CamCrew MNC Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };
  console.log(product[0]?.email);
  const [arr, setArr] = useState([]);
  const fetchExcludedIntervals = async () => {
    try {
      // Fetch data from the API using Axios
      const response = await axios.get(
        `https://camapi-in57.onrender.com/get-excluded-intervals/${product[0]?.email}`
      );

      // Extract excludedIntervals from the response data
      const responseData = response.data;

      // Map over responseData to convert each interval into the specified format
      const formattedExcludedIntervals = responseData.map((interval) => ({
        start: new Date(interval.start),
        end: new Date(interval.end),
      }));

      // Set formatted excludedIntervals in state
      setArr(formattedExcludedIntervals);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // console.log(arr);
  // console.log("Mera ", new Date("2024-05-10"));

  useEffect(() => {
    if (product[0]?.email) {
      fetchExcludedIntervals();
    }
  }, [list]);

  return (
    <>
      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        <div className="max-w-4xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            {/* <div className="flex flex-col"> */}
            <div className="w-full px-4 md:w-1/2 ">
              {isVideo ? (
                <div className="sticky top-0 z-50 overflow-hidden ">
                  <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                    <img
                      src={
                        product[0]?.image[idx] ??
                        "https://www.bajajmall.in/emistore/media/catalog/product/placeholder/default/image-not-available_Edit.png"
                      }
                      alt
                      className="object-fit w-full md:w-[40rem] md:h-[20rem] "
                    />
                  </div>
                  <div className="flex-wrap hidden md:flex ">
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <div
                          key={index}
                          className={`w-1/2 p-2  sm:w-1/4 ${
                            idx === index ? "hidden" : ""
                          } `}
                        >
                          <a
                            href="javascript:void(0)"
                            className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                            onClick={() => handleIndex(index)}
                          >
                            <img
                              src={
                                product[0]?.image[index] ??
                                "https://www.bajajmall.in/emistore/media/catalog/product/placeholder/default/image-not-available_Edit.png"
                              }
                              alt=""
                              className="object-cover w-full lg:h-20"
                            />
                          </a>
                        </div>
                      ))}

                    {/* <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                      >
                        <img
                          src="https://www.bajajmall.in/emistore/media/catalog/product/placeholder/default/image-not-available_Edit.png"
                          alt
                          className="object-cover w-full lg:h-20"
                        />
                      </a>
                    </div>

                    <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                      >
                        <img
                          src="https://www.bajajmall.in/emistore/media/catalog/product/placeholder/default/image-not-available_Edit.png"
                          alt
                          className="object-cover w-full lg:h-20"
                        />
                      </a>
                    </div>
                    <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                      >
                        <img
                          src="https://www.bajajmall.in/emistore/media/catalog/product/placeholder/default/image-not-available_Edit.png"
                          alt
                          className="object-cover w-full lg:h-20"
                        />
                      </a>
                    </div>
                    <div className="w-1/2 p-2 sm:w-1/4">
                      <a
                        href="#"
                        className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                      >
                        <img
                          src="https://www.bajajmall.in/emistore/media/catalog/product/placeholder/default/image-not-available_Edit.png"
                          alt
                          className="object-cover w-full lg:h-20"
                        />
                      </a>
                    </div> */}
                  </div>
                </div>
              ) : (
                <iframe
                  width="425"
                  height="398"
                  src={`https://www.youtube.com/embed/${product[0]?.youtube}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
              <button
                type="button"
                onClick={() => setVideo(!isVideo)}
                className="flex items-center justify-center w-full m-4 p-2 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
              >
                Switch to {!isVideo ? "Photo" : "Video"}
              </button>
            </div>

            {/* </div> */}

            <div className="w-full px-4 md:w-1/2 ">
              <div className="lg:pl-20">
                <div className="mb-8 ">
                  <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                      <li className="inline-flex items-center">
                        <Link
                          to={"/"}
                          className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
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
                            className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
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
                          <Link
                            to={`/category/${product[0]?.category}`}
                            className="ms-1 text-md capitalize font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                          >
                            {product[0]?.category}
                          </Link>
                        </div>
                      </li>
                    </ol>
                  </nav>

                  <h2 className="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-400 md:text-4xl">
                    {product[0]?.title}
                  </h2>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/category/${product[0]?.category.toLowerCase()}`
                      )
                    }
                    className="px-8 py-1 mb-4 text-white capitalize font-semibold bg-gray-800 rounded-full dark:bg-gray-100 dark:text-gray-800"
                  >
                    {product[0]?.category}{" "}
                  </button>
                  <div className="flex items-center mb-6">
                    {Star(averageRating)}

                    <p className="text-xs dark:text-gray-400 ">
                      ( {ratingCount} customer reviews)
                    </p>
                  </div>
                  <div>{/* <MakeStar /> */}</div>
                  <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                    {product[0]?.description}
                  </p>
                  <div className="flex items-center   ">
                    <p className="inline-block  text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                      <span>₹ {discountedPrice}</span>
                      <span className="text-base font-normal  mx-1">
                        /per day
                      </span>
                    </p>
                    {/* <p className="text-green-600 dark:text-green-300 ">
                      {discountPercentage}% off
                    </p> */}
                  </div>
                </div>
                <div className="border p-2 pr-4 rounded-2xl my-4">
                  <div className="flex">
                    <div className="py-3 ">
                      <label>Book From:</label>
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        excludeDateIntervals={arr}
                      />
                      {/* {startDate && (
                        <div>Start Date: {startDate.toLocaleDateString()}</div>
                      )} */}
                    </div>
                    <div className="py-3 px-4   ">
                      <label>Book To:</label>
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        excludeDateIntervals={arr}
                      />
                      {/* {endDate && (
                        <div>End Date: {endDate.toLocaleDateString()}</div>
                      )} */}
                    </div>
                  </div>
                  <div className=" flex justify-center items-center ">
                    {numberOfDays} {numberOfDays === 1 ? "day" : "days"}
                  </div>
                </div>
                <div>
                  <div className=" flex flex-col justify-center items-center gap-y-5 md:my-4  ">
                    {/* <Calendar /> */}
                    {/* ToTal : {parseInt(product[0]?.price) * numberOfDays} */}
                    <div className="w-full flex justify-around px-5 py-2 border rounded-xl shadow-md  border-gray-200 font-light text-gray-500">
                      <div className="w-full  flex justify-around flex-col    gap-x-4">
                        <div className="w-full">
                          <div className="flex flex-col justify-between mb-2">
                            <div className="flex items-center justify-between">
                              <h1 className="text-[1rem] font-semibold items-center uppercase  max-w-[240px] text-primary hover:underline">
                                {product[0]?.title}
                              </h1>
                              {/* <div className="text-xl text-red-300  cursor-pointer">
                            <IoMdClose
                              // onClick={() => removeFromCart(id)}
                              className="font-bold text-gray-500 hover:text-red-500 transition"
                            />
                          </div> */}
                            </div>

                            <div className="flex  items-center justify-between gap-x-2 ">
                              <div className="  font-semibold ">
                                ₹ {parseInt(product[0]?.price)} X {numberOfDays}{" "}
                                days
                              </div>
                              <div className="  font-medium">
                                ₹{" "}
                                {parseFloat(
                                  parseInt(product[0]?.price) * numberOfDays
                                ).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 md:mr-1 flex flex-col ">
                      <p className=" text-2xl">
                        Total amount:
                        <span className="font-semibold">
                          {" "}
                          ₹{" "}
                          {parseFloat(
                            parseInt(product[0]?.price) * numberOfDays
                          ).toFixed(2)}{" "}
                        </span>
                      </p>
                      <p className="text-sm md:mr-8 ">
                        Not including taxes and additional costs
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center -mx-4 ">
                  <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                    <button
                      onClick={handleAddToCartClick}
                      className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                    >
                      Add to Fav
                    </button>
                    {showModal ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                              {/*header*/}
                              <div className="flex items-start justify-between p-5  rounded-t">
                                <h3 className="text-3xl font-semibold">
                                  Please Login with Your Account
                                </h3>
                              </div>

                              <div className="flex items-center justify-center p-4  rounded-b">
                                <button
                                  className="text-gray-900 bg-bgimage background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowModal(false);
                                  }}
                                >
                                  Okay
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                  </div>
                  <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                    <button
                      onClick={paymentHandler}
                      // onClick={handleCheckout}
                      className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="flex gap-4 items-center" onSubmit={handleRating}>
              <div>
                <img
                  src={user?.picture}
                  alt=""
                  className="w-12 h-12 rounded-full dark:bg-gray-300"
                />{" "}
              </div>
              {isAuthenticated && (
                <div>
                  <div className="font-bold"> {user?.given_name} </div>
                  <MakeStar konsaStar={konsaStar} />
                  <textarea
                    id="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full border rounded py-1 px-2 mb-3"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Send
                  </button>
                </div>
              )}
            </form>
          </div>

          <div>
            {ratingArr.reverse().map((item) => (
              <div key={item._id}>
                <RatingComp
                  rating={item?.rating}
                  userName={item?.userName}
                  userImage={item?.userImage}
                  text={item?.desc}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailsPage;
