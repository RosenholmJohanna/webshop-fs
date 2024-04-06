import React from "react";
import ProductCard from "./ProductCard";

const SearchList = ({ filteredProducts }) => {
  const productList = filteredProducts.map((product) => (
    <ProductCard key={product._id} product={product} />
  ));

  return <div>{productList}</div>;
};

export default SearchList;
