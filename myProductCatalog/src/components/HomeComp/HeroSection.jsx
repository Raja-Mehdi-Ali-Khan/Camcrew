import React, { useEffect } from "react";

// import { NavLink } from "react-router-dom";
// import { Button } from "../styles/Button";
import bgImage from "../../assets/bgimage.jpg";
import cartImg from "../../assets/cart.webp";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTextCharacter from "../AnimatedText";

const HeroSection = () => {
  // const { name } = mydata;

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
    <div className=" relative h-screen ">
      <img
        className=" absolute -z-40 top-0 left-0 w-full h-full object-cover "
        src={bgImage}
        alt="Background Image"
      />
      <p className=" text-black flex  flex-col   justify-start items-end p-[10%] h-screen  ">
        <h1 class="mb-4  text-5xl md:text-6xl lg:text-7xl flex flex-col md:items-center md:justify-center font-extrabold leading-none  text-gray-900 ">
          <div className="flex flex-col md:flex-row md:gap-4  text-5xl  md:text-5xl lg:text-6xl ">
            <div>Curated </div>
            {/* <span class="text-blue-600   dark:text-blue-500">Collections</span> */}
            <div>
              <AnimatedTextCharacter text=" Collections " />
            </div>
          </div>
          For the Modern You
        </h1>
        {/* <span> Collections </span> */}
      </p>

      <div>
        <img
          className=" hidden w-[20rem] md:w-[30rem]  h-[20rem] md:h-[30rem] absolute right-0 bottom-16   cart-image "
          src={cartImg}
          alt="Cart"
        />
      </div>
    </div>
  );
};

export default HeroSection;
