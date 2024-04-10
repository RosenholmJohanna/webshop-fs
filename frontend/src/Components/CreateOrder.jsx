import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Reducers/cartSlice";

// only possible to order one item but multiple of same product
// BE  needs some work.

const CreateOrder = ({ toOrder }) => {
  const userId = useSelector((store) => store.user.id);
  const dispatch = useDispatch();
  //const productId = useSelector((state) => state.cart.items)
  console.log("order", toOrder);

  const submitOrder = async () => {
    try {
      for (const { _id: productId, quantity } of toOrder) {
        const response = await fetch(
          `http://localhost:8080/buy/${userId}/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: quantity,
            }),
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(
            `could not submit order for product ${productId}: ${errorMessage}`
          );
        }

        const data = await response.json();
        console.log(`order created for product with id ${productId}:`, data);
        //console.log(data)
      }
      setTimeout(() => {
        dispatch(clearCart());
      }, 1000);
    } catch (error) {
      console.error("errorr creating order:", error.message);
      throw error;
    }
  };
  return (
    <div>
      <button onClick={submitOrder}>Submit order</button>
    </div>
  );
};

export default CreateOrder;
