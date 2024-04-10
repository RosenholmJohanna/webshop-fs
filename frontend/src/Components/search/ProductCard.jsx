import React from "react";
import { Card, Button } from "react-bootstrap";
import online from "../../assets/online.svg";
import { Link } from "react-router-dom";


const ProductCard = ({ product }) => {

  return (
    <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={online} alt="online" width="250" height="120" />
    <Card.Body>
      <Card.Title>{product.title}</Card.Title>
      <Card.Text>Price: {product.price} kr</Card.Text>
      <Link to={`/product/${product._id}`} className="btn btn-primary">
        View Details
      </Link>
    </Card.Body>
  </Card>
);
};
export default ProductCard;