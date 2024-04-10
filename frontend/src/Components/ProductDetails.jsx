import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ minwidth: '22rem' }}>
        <Card.Img variant="top" src={online} alt="Logo" width="450" height="362" />
        <Card.Body>
          <Card.Title>{productDetail.title}</Card.Title>
          <Card.Text>{productDetail.description}</Card.Text>
          <Card.Text>Price: {productDetail.price} kr</Card.Text>
          <AddProduct productDetail={productDetail} />
        </Card.Body>
      </Card>
    </Container>
  );
};
export default ProductDetails;

