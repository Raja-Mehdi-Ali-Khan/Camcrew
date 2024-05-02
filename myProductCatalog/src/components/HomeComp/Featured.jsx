import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";
import { categories } from "../../data";

const Featured = () => {
  return (
    <section id="category" className="  text-4xl p-12 my-2 mx-auto">
      <div className="text-bgdarkimage font-extrabold text-4xl  ">
        Check now !
      </div>
      <h1 class="my-6 pb-6 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl ">
        Our Feature Categories
      </h1>

      <div className=" flex flex-wrap justify-center items-center  gap-10 md:gap-2">
        {categories
          .filter((category) => category.id < 5)
          .map((product) => (
            <Link
              key={product.id}
              to={`/category/${product.name.toLowerCase()}`}
              className="  "
            >
              {" "}
              <div className=" flex flex-wrap my-5 ">
                <CategoryCard category={product} />
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default Featured;
