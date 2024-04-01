import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import online from '../assets/online.svg';
//import Products from "./Products";



const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState(null);
  const { id } = useParams();

  //console.log(productDetail)
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:8080/product/${id}`);
        console.log(response)
        if (!response.ok) {
          throw new Error('Cannot fetch product');
        }
        const data = await response.json();
        console.log('Fetch OK', data)
        setProductDetail(data.product);
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
    <ProductWrapper>
    <h2>{productDetail.title}</h2>
    <img src={online} alt="Logo" width="250" height="162" />
    <p>{productDetail.description}</p>
    <p>Price: {productDetail.price} kr</p>
    <button>Buy</button>
    <button>💟</button>
  </ProductWrapper>
    )
  }
  
  export default ProductDetails

  const ProductWrapper = styled.div `
  `

  const List = styled.li`
  border: 1px solid white;
  margin-bottom: 5%;
  padding: 5%;
  background-color: #464040;
  `
