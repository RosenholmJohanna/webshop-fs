import React from "react";
import online from "../../assets/online.svg";

const ProductCard = ({ product }) => {
  return (
    <div>
      <img src={online} alt="online" width="200" height="70" />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductCard;