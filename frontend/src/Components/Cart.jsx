import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import online from "../assets/online.svg";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log("cart content:", cartItems);

  const renderCheckoutButton = cartItems.length > 0;

  return (
    <Container
      className="widget"
      style={{ minHeight: "500px", backgroundColor: "#343654" }}
    >
      <Row>
        <Col>
          <div style={{ backgroundColor: "grey", padding: "10px" }}>
            <h3
              style={{
                fontSize: "0.9rem",
                textTransform: "uppercase",
                margin: "0",
              }}
            >
              Total items:
            </h3>
          </div>
        </Col>
      </Row>
      {cartItems.map((item) => (
        <Row key={item.id}>
          <Col>
            <div style={{ padding: "1px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={online} alt="Logo" width="60" height="50" />
                <p>
                  {item.title} SEK {item.price}
                </p>
                <Button variant="danger" style={{ marginLeft: "10px" }}>
                  ❎
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                <span>SEK:{item.quantity * item.price}</span>
              </div>
            </div>
          </Col>
        </Row>
      ))}
      <Row>
        {renderCheckoutButton && (
          <Col>
            <Link to={{ pathname: "/checkout", state: { toOrder: cartItems } }}>
              <Button
                variant="primary"
                style={{
                  width: "70%",
                  margin: "1%",
                  backgroundColor: "#4a0b49",
                }}
              >
                Checkout
              </Button>
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
