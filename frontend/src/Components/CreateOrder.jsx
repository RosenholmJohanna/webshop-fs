import React, { useState } from "react";
import { useSelector } from "react-redux";


// only possible to order one item but multiple of same product
// BE  needs some work. 

const CreateOrder = ({ toOrder }) => {
  const userId = useSelector((store) => store.user.id);
  //const productId = useSelector((state) => state.cart.items)

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
            body: JSON.stringify({ quantity }),
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
      }
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
