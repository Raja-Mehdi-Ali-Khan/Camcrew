import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const MakeStar = ({ initialStars = 0, gap = false, konsaStar }) => {
  const [stars, setStars] = useState(initialStars);

  const handleClick = (starIndex) => {
    setStars(starIndex + 1);
    konsaStar(starIndex + 1);
  };

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;

    return (
      <span
        className={` ${gap ? "mx-0.5" : " "}  `}
        key={index}
        onClick={() => handleClick(index)}
        style={{ cursor: "pointer" }}
      >
        {stars >= index + 1 ? (
          <FaStar className="icon  text-yellow-500 " />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon text-yellow-500 " />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return <span className="flex ">{ratingStar}</span>;
};

export default MakeStar;
