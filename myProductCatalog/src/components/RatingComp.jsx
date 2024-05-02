import React from "react";
import Star from "./CategoryComp/Star";

const RatingComp = ({ rating, userName, userImage, text }) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <div>
          <img
            src={userImage}
            alt=""
            className="w-12 h-12 rounded-full dark:bg-gray-300"
          />{" "}
        </div>
        <div>
          <div className="font-bold"> {userName} </div>
          {/* <MakeStar konsaStar={konsaStar} />
           */}
          {Star(rating)}
          <p> {text} </p>
        </div>
      </div>
    </div>
  );
};

export default RatingComp;
