import React from "react";
import styled from 'styled-components';
import online from '../assets/online.svg';

const Header = () => {
  

    return (
      <HeaderWrapper>
       <img src={online} alt="Logo" width="250" height="162" />
      </HeaderWrapper>
    )
  }
  
  export default Header


  const HeaderWrapper = styled.div `
  background-color: #3A3845;
  height: 20vh;
  margin:0;
  position: absolute;
  top:0;
  width: 100%;
`