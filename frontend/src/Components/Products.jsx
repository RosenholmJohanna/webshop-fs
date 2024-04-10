import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import online from "../assets/online.svg";
import ProductList from "./search/ProductsList";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

// TO DO
// handle fetch in reducer- productSlice = reduce api calls, and handle all products + serach there
// let user put items to cart not only from productDetail page

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
    <>
      <ProductList />
      <Container>
        <h3>NEW IN STORE</h3>
        <Row xs={1} md={2} lg={3} className="g-4">
          {allProducts.map((product) => (
            <Col
              key={product._id}
              className="d-flex align-items-center justify-content-center"
            >
              <Card style={{ width: "18rem" }}>
                <Link to={`/product/${product._id}`}>
                  <Card.Img variant="top" src={online} alt="Product Image" />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>Price: {product.price} kr</Card.Text>
                    <Button variant="success">Buy</Button>
                    <Button variant="primary">Details</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Products;

const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  list-style: none;
`;

const List = styled.li`
  border: 1px solid white;
  margin: 2%;
  padding: 2%;
  background-color: #464040;
  width: calc(40%);
`;

const Ul = styled.ul`
  display: flex;
  //flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  list-style: none;
`;

/* <p>{product.images[1]}</p> */
//}

{
  /* <img src={require(`../assets/${product.images}`).default}
  alt='image'
/> */
}
