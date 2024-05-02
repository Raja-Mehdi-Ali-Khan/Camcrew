import React, { useEffect } from "react";
import { useCart } from "../context/ServiceContext";
import CartCard from "../components/CartComp/CartCard";

const FavPage = () => {
  const { cart, total, setCart } = useCart();
  useEffect(() => {
    const storedCartJSON = localStorage.getItem("cartvalue");
    const localArray = JSON.parse(storedCartJSON);
    // console.log(localArray.length);
    // console.log(localArray);

    if (localArray && localArray.length != 0) {
      try {
        const storedCart = JSON.parse(storedCartJSON);
        setCart([...storedCart, ...cart]);
        console.log(storedCart);
      } catch (err) {
        console.warn(`Error parsing JSON from local storage: ${err}`);
      }
    }
  }, [setCart]); // Only run on initial render

  useEffect(() => {
    localStorage.setItem("cartvalue", JSON.stringify(cart));
  }, [cart]); // Run when cart changes

  const clearCart = () => {
    localStorage.setItem("cartvalue", []);
    // localStorage.removeItem("cartko");
    setCart([]);
  };

  // Function to handle checkout

  return (
    <div>
      {cart && cart?.length === 0 ? (
        <div className="flex items-center justify-center min-h-80">
          <p className="ml-2 text-xl font-semibold text-gray-100">
            Your cart is empty.
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:p-10">
          <div className="m-10">
            {cart.map((item) => (
              <div className="m-2" key={item.id}>
                <CartCard item={item} />
              </div>
            ))}
          </div>
          <div className="space-y-1 text-white flex flex-col items-center md:items-end md:text-right">
            <p className="md:mr-10 text-2xl">
              Total amount:
              <span className="font-semibold"> ${total.toFixed(2)} </span>
            </p>
            <p className="text-sm md:mr-8 ">
              Not including taxes and shipping costs
            </p>
          </div>
          <div className="flex justify-center my-5 md:justify-end space-x-4">
            <button
              type="button"
              onClick={() => clearCart()}
              className="px-6 py-2 border bg-red-200 rounded-md dark:border-violet-400"
            >
              Clear Favourite
            </button>
            {/* <button
              type="button"
              onClick={() => handleCheckout()}
              className="px-6 py-2 bg-slate-100 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
            >
              Continue to Checkout
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavPage;
