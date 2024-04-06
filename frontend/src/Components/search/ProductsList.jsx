import React, { useEffect, useState } from "react";
import SearchProduct from "./Search";
import styled from "styled-components";

const API_All_PRODUCTS = "http://localhost:8080/products";

const ProductList =() => {
  const [productList, setProductList] = useState([]);
 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_All_PRODUCTS);
        if (!response.ok) {
          throw new Error("cannot fetch products");
        }
        const data = await response.json();
        console.log(data)
        setProductList(data.response);
        console.log('fetch')
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <ProductListWrapper>
      <SearchProduct productList={productList} />
    </ProductListWrapper>
  );
}


const ProductListWrapper = styled.div`
margin-top: 20%;
`

export default ProductList;

