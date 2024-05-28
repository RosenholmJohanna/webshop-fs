import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import cart from "../assets/cart.svg";

const Header = () => {
  const username = useSelector((store) => store.user.username);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Navbar bg="#8bb0d8" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>FashionHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/products">
              HOME
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              CART
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link>Logged in as {username}</Nav.Link>
                {/* <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link> */}
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Link to="/cart" className="link">
            {" "}
            <img
              src={cart}
              alt="cart"
              width="60"
              height="60"
              backgroundcolor="white"
            />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
