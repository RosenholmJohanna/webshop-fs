import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const generateUniqueId = () => {
  return uuidv4();
};


// TO DO:
//push row total price / item (in component remove qty * price)
// db id: _id / cart item id: id
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload;
      const existingItem = state.items.find(item => item._id === itemToAdd._id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...itemToAdd, quantity: 1, id: generateUniqueId() });
      }
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;