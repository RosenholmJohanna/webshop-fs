import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
//import { useLocation } from "react-router-dom";
import CreateOrder from "./CreateOrder";

// create orderlist by getting the items from cart state

const Checkout = () => {
  const username = useSelector((store) => store.user.username);
  const userId = useSelector((store) => store.user.id);
  const toOrder = useSelector((state) => state.cart.items);
  console.log("checkout", toOrder);


  //products.reduce((price, item) => price + item.price, 0)
  const totalSum = toOrder.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  return (
    <CheckoutWrapper>
      <div>
        <h4>User information </h4>
        <p>{username} {userId}</p>
        <h4>Items ready to order </h4>
        {toOrder &&
          toOrder.map((item) => (
            
            <OrderList key={item.id}>
              <div>{item.title}</div>
              <div>{item.price}</div>
              <div>{item.quantity}</div>
              <div>{item._id}</div>
              <span>SEK:{item.quantity * item.price}</span>
              <button>➕</button> <button>➖</button>
            </OrderList>
          ))}
        <p>To Pay: SEK {totalSum}</p>
      </div>
      <CreateOrder toOrder = {toOrder} />
    </CheckoutWrapper>
  );
};

export default Checkout;

const CheckoutWrapper = styled.section`
  margin-top: 15%;
`;

const OrderList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 5%;
`;
// TO DO:
// import create order button, fetch order db
// import sum of cart items that user want to order
//fech and update product db when clicked ordered
// userinfo, adress etc.
