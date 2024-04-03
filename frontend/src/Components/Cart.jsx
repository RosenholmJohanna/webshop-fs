import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import online from "../assets/online.svg";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items); // fastnar här
  console.log("cart content:", cartItems);

  // create new id when in cart? productId ---> per item.id due when multiple of one product?
  // Each child in a list should have a unique "key" prop. 14/15
  return (
    <Wrapper className="widget">
      <Title>
        <TitleText>Total items: </TitleText>
        <TitleText>Recently added items to cart</TitleText>
      </Title>
      <div>
        {cartItems.map(
          (item) => (
            console.log(item),
            (
              <div key={item.id}>
                {/* <h3>Cart Item #{index + 1}</h3>  */}
                <h3>Cart: {item.quantity} items</h3>

                <Section>
                  <img src={online} alt="Logo" width="70" height="110" />
                  <p>
                    {item.title} SEK {item.price}
                    <button>❎</button>
                  </p>
                </Section>
                <Footer>
                  <Total>
                    <span>total:{item.quantity * item.price}</span>
                  </Total>
              
                </Footer>
              </div>
            )
          )
        )}
        <Button>Checkout</Button>
        <Button>Continue shopping</Button> 
      </div>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  width: 40%;
  position: absolute;
  bottom: -880%;
  //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #1c1d2b;
  /* display: none; */
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
  width: 50%;
  margin: 2%;
  background-color: #4a0b49;
`;
