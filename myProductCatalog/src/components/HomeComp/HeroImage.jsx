import React, { useEffect } from "react";
import Hero from "../../assets/shopinng.svg";
import cartImg from "../../assets/cart.webp";
import bucket from "../../assets/bucket.svg";
import AnimatedTextCharacter from "../AnimatedText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const HeroImage = () => {
  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    // Your GSAP animation code with scrollTrigger
    gsap.to(".cart-image", {
      x: "-50%",
      scrollTrigger: {
        trigger: ".cart-image",
        start: "right center", // Change start to 'right center'
        end: "left center", // Change end to 'left center'
        scrub: 0.8,
      },
    });
  }, []);
  return (
    <section className="bg-bgimage   ">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-around">
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src={Hero}
            alt=""
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold  sm:text-6xl">
            Capturing
            <span className=" flex justify-center lg:justify-normal bg-black text-bgimage items-center my-1 ">
              {" "}
              {/* <AnimatedTextCharacter text=" Moments " />{" "} */}
              Moments
            </span>
            Made Easy
          </h1>

          <div className="flex flex-col m-4 space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <a
              rel="noopener noreferrer"
              href="#category"
              className="px-8 py-3 text-lg flex justify-center items-center gap-3  font-semibold border border-gray-900 rounded"
            >
              <span>Explore Categories</span>
              <span>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </a>
          </div>
        </div>

        <div className=" hidden ">
          <img
            className=" hidden lg:block w-[20rem] md:w-[30rem]  h-[20rem] absolute right-0 bottom-0  cart-image "
            src={bucket}
            alt="Cart"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroImage;
