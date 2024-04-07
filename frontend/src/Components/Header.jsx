import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import cart from "../assets/cart.svg";
import Cart from "./Cart";



const Header = () => {
  const username = useSelector((store) => store.user.username);
  // const userState = useSelector((state) => state.user);
  // console.log("User slice state:", userState);

  return (
    <HeaderWrapper>
      <h3>Jr Fashion</h3>
      <>Welcome {username}</>
      <img src={cart} alt="cart" width="200" height="70" />
      <>
         <Cart /> 
      </>
    </HeaderWrapper>
  );
  
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3a3845;
  height: 10vh;
  //margin-bottom: 10%;
  position: absolute;
  top: 0;
  width: 100%;
`;