import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import online from '../assets/online.svg';
import cart from '../assets/cart.svg';
import user from "../Reducers/user";

const Header = () => {
  const username = useSelector(store => store.user.username)
  
  

    return (
      <HeaderWrapper>
        <h3>Jr Fashion</h3>
        <>Welcome {username}</>
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