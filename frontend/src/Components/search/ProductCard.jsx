import React from "react";
import online from "../../assets/online.svg";
import { Link } from "react-router-dom";


const ProductCard = ({ product }) => {

  return (
    <div>
      <Link to={`/product/${product._id}`}>View Details 
      <img src={online} alt="online" width="200" height="70" />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;