import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import online from "../assets/online.svg";
//import Checkout from "./Checkout";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log("cart content:", cartItems);

  const renderCheckoutButton = cartItems.length > 0;

  // create new id when in cart? productId ---> per item.id due when multiple of one product?
  // Each child in a list should have a unique "key" prop. 14/15 - fixed with uuid in cartslice
  // returns [{item}...}]
  return (
    <CartWrapper className="widget">
      <Title>
        <TitleText>Total items: </TitleText>
        {/* <TitleText>Recently added items to cart</TitleText> */}
      </Title>
      <div>
        {cartItems.map((item) => (
          //  console.log(item),
          <div key={item.id}>
            <h3>Cart: {item.quantity} items</h3>
            <Section>
              <img src={online} alt="Logo" width="60" height="50" />
              <p>
                {item.title} SEK {item.price}
              </p>
              <button>❎</button>
            </Section>
            <Footer>
              <Total>
                <span>SEK:{item.quantity * item.price}</span>
              </Total>
            </Footer>
            {/* <TitleText>Total sum: SEK</TitleText> */}
          </div>
        ))}
        {renderCheckoutButton && (
          <Link to={{ pathname: "/checkout", state: { toOrder: cartItems } }}>
            <Button>Checkout</Button>
          </Link>
        )}
      </div>
    </CartWrapper>
  );
};

export default Cart;

const CartWrapper = styled.div`
  width: 40%;
  position: absolute;
  bottom: -880%;
  background-color: #1c1d2b;
`;

const Title = styled.div`
  background-color: grey;
  padding: 10px;
`;

const TitleText = styled.h3`
  font-size: 0.9rem;
  text-transform: uppercase;
  margin: 0;
`;

const Section = styled.section`
  padding: 1px;
  //overflow-y: scroll;
`;

const Footer = styled.div`
  background-color: #132c47;
  padding: 1px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const Button = styled.button`
  width: 70%;
  margin: 1%;
  background-color: #4a0b49;
`;

const ProductText = styled.button`
  font-size: 0.7rem;
`;
