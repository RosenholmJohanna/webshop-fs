import React from "react";
import styled from 'styled-components';
import online from '../assets/online.svg';
import cart from '../assets/cart.svg';

const Header = () => {
  

    return (
      <HeaderWrapper>
        <h3>Jr Fashion</h3>
       {/* <img src={online} alt="Logo" width="200" height="110" /> */}
       <img src={cart} alt="cart" width="200" height="70" />
      </HeaderWrapper>
    )
  }
  
  export default Header


  const HeaderWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3A3845;
  height: 10vh;
  margin-bottom:10%;
  position: absolute;
  top:0;
  width: 100%;
`