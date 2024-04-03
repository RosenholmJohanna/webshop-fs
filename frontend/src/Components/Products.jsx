import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import online from "../assets/online.svg";

const API_All_PRODUCTS = "http://localhost:8080/products";

// const products = {
//   images: "online.svg"
// };

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_All_PRODUCTS);
        if (!response.ok) {
          throw new Error("Cannot fetch products");
        }
        const data = await response.json();
        setAllProducts(data.response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <ProductsWrapper>
      <h1>Products</h1>

      <ul>
        {allProducts.map((product) => (
          <List key={product._id}>
            <Link to={`/product/${product._id}`}>
              <h2>{product.title}</h2>
              <img src={online} alt="Logo" width="250" height="162" />
              <p>{product.description}</p>
              <p>Price: {product.price} kr</p>
              <button>Details</button>
              <button>Buy</button>
              <button>💟</button>
            </Link>
          </List>
        ))}
      </ul>
      {/* <Products allProducts={allProducts} /> */}
    </ProductsWrapper>
  );
};

export default Products;

const ProductsWrapper = styled.div`
  overflow-y: scroll;
`;

const List = styled.li`
  border: 1px solid white;
  margin-bottom: 5%;
  padding: 5%;
  background-color: #464040;
`;

{
  /* <p>{product.images[1]}</p> */
}

{
  /* <img src={require(`../assets/${product.images}`).default}
  alt='image'
/> */
}
