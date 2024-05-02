import React, { createContext, useContext, useState } from "react";

// Create a context for product comparison
export const ComparisonContext = createContext();

// Custom hook to access the comparison context

// Component to provide the comparison context to its children
export const ComparisonProvider = ({ children }) => {
  // State to store the selected products for comparison
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Function to add a product to the comparison list
  const addProduct = (product) => {
    // Check if exactly two products are already selected for comparison
    if (selectedProducts.length === 2) {
      console.log("Already selected two products for comparison");
      return;
    }

    // Check if the product is already in the comparison list
    if (!selectedProducts.some((p) => p._id === product._id)) {
      // Add the product to the comparison list using functional update
      setSelectedProducts((prevProducts) => [...prevProducts, product]);
    } else {
      // Product already exists in the comparison list
      console.log("Product already added for comparison");
    }
  };

  // Function to remove a product from the comparison list
  const removeProduct = (productId) => {
    // Filter out the product with the given productId
    const updatedProducts = selectedProducts.filter((p) => p._id !== productId);
    setSelectedProducts(updatedProducts);
  };

  // Function to clear all products from the comparison list
  const clearComparison = () => {
    setSelectedProducts([]);
  };

  // Value object to provide in the context
  const value = {
    selectedProducts,
    addProduct,
    removeProduct,
    clearComparison,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
