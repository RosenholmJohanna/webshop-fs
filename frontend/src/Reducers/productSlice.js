// import { createSlice} from "@reduxjs/toolkit";

//  // use asynkChunk?
//  // like product

// const initialState = {
//     status: "idle",
//     products: [],
//     currentProduct: {},
//     filterTitle: null,
//   };

//   const fetchData = () => {
//     fetch("http://localhost:8080/products")
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('response error');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('all products slice:', data);
//       })
//       .catch(error => {
//         console.error('cannot fetch products data at reducer:', error);
//       });
//   };

//   export const selectAllProducts = (state) => state.product.products;