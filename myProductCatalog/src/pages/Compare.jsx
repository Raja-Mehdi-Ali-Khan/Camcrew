import React from "react";
import { useComparison } from "../context/ComparsionContext";
import Star from "../components/CategoryComp/Star";
import { Button } from "../components/Button";

const ComparisonPage = () => {
  const { selectedProducts, clearComparison, removeProduct } = useComparison();
  console.log(selectedProducts);
  // Render the comparison table if there are two selectedProducts selected for comparison
  const renderComparisonTable = () => {
    if (selectedProducts?.length !== 2) {
      return (
        <p className="text-white">
          Please select exactly two selectedProducts for comparison.
        </p>
      );
    }

    const [product1, product2] = selectedProducts;

    return (
      <div className="text-white flex justify-center items-center ">
        <div className="text-white flex justify-between items-center">
          <table className="border-collapse border-2 text-2xl border-white">
            <thead className="text-white">
              <tr className="text-white  ">
                <th className="p-4 text-white "></th>

                <th className="p-4">
                  {" "}
                  <Button onClick={() => removeProduct(product1?._id)}>
                    Clear Choice 1{" "}
                  </Button>{" "}
                </th>
                <th className="p-4">
                  {" "}
                  <Button onClick={() => removeProduct(product2?._id)}>
                    Clear Choice 2{" "}
                  </Button>{" "}
                </th>
              </tr>
            </thead>
            <thead className="text-white">
              <tr className="text-white  ">
                <th className="p-4 text-white ">Attribute</th>
                <th className="p-4">{product1.title}</th>
                <th className="p-4">{product2.title}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">Video</td>
                <td className="p-4">
                  <iframe
                    width="500"
                    height="320"
                    src={`https://www.youtube.com/embed/${product1?.youtube}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </td>

                <td className="p-4">
                  <iframe
                    width="500"
                    height="320"
                    src={`https://www.youtube.com/embed/${product2?.youtube}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </td>
              </tr>
              <tr>
                <td className="p-4">Image</td>
                <td className="p-4">
                  {" "}
                  <img
                    src={product1?.image[0]}
                    alt
                    className="object-fit w-full md:w-[40rem] md:h-[20rem] "
                  />
                </td>

                <td className="p-4">
                  {" "}
                  <img
                    src={product2?.image[0]}
                    alt
                    className="object-fit w-full md:w-[40rem] md:h-[20rem] "
                  />
                </td>
              </tr>
              <tr>
                <td className="p-4">Price</td>
                <td className="p-4">{product1.price}</td>
                <td className="p-4">{product2.price}</td>
              </tr>
              <tr>
                <td className="p-4">Category</td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/category/${product1?.category}`)}
                    className="px-8 py-1 mb-4 text-white capitalize font-semibold bg-gray-800 rounded-full dark:bg-gray-100 dark:text-gray-800"
                  >
                    {product1?.category}{" "}
                  </button>
                </td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/category/${product2?.category}`)}
                    className="px-8 py-1 mb-4 text-white capitalize font-semibold bg-gray-800 rounded-full dark:bg-gray-100 dark:text-gray-800"
                  >
                    {product2?.category}{" "}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-4">Reviews</td>
                <td className="p-4">{Star(product1.averageRating)}</td>
                <td className="p-4">{Star(product2.averageRating)}</td>
              </tr>
              <tr>
                <td className="p-4"> Description</td>
                <td className="p-4">{product1.description}</td>
                <td className="p-4">{product2.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>Product Comparison</h2>

      {renderComparisonTable()}
      <div className=" flex justify-center items-center m-10 ">
        <Button className="w-96" onClick={() => clearComparison()}>
          {" "}
          Clear All{" "}
        </Button>
      </div>
    </div>
  );
};

export default ComparisonPage;
