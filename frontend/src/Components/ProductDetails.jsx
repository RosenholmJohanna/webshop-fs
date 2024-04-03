import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import online from "../assets/online.svg";
import AddProduct from "./AddProduct";
import Cart from "./Cart";

const ProductDetails = () => {
  //const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:8080/product/${id}`);
        if (!response.ok) {
          throw new Error("Cannot fetch product");
        }
        const data = await response.json();
        setProductDetail(data.product);
        //setProducts(data.products);
        console.log(data.product);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [id]);

  if (productDetail === null) {
    return <p>Loading...</p>;
  }

  return (
    <ProductWrapper key={productDetail._id}>
      <h2>{productDetail.title}</h2>
      <img src={online} alt="Logo" width="250" height="162" />
      <p>{productDetail.description}</p>
      <p>Price: {productDetail.price} kr</p>
      <AddProduct productDetail={productDetail} />
    </ProductWrapper>
  );
};

export default ProductDetails;

const ProductWrapper = styled.div``;

// const List = styled.li`
// border: 1px solid white;
// margin-bottom: 5%;
// padding: 5%;
// background-color: #464040;
// `
