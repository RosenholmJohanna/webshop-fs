import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Products from "./Components/Products";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductDetails from "./Components/ProductDetails";
import { Provider } from "react-redux";
import "./App.css";
import user from "./Reducers/user";
import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./Reducers/cartSlice";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
//import SearchProduct from "./Components/search/Search";
//import ProductList from "./Components/search/ProductsList";



const reducer = {
  user: user.reducer,
  cart: cartSlice.reducer
};
const store = configureStore({ reducer });


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
         <Header /> 
         {/* <ProductList /> */}
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path='product/:id' element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
        {/* <Cart />  */}
       {/* <Footer /> */}
      </Provider>
    </BrowserRouter>
  );
}
export default App;

{
  /* <div>

const [count, setCount] = useState(0)

<a href="https://vitejs.dev" target="_blank">
  <img src={viteLogo} className="logo" alt="Vite logo" />
</a>
<a href="https://react.dev" target="_blank">
  <img src={reactLogo} className="logo react" alt="React logo" />
</a>
</div>
<h1>Vite + React</h1>
<div className="card">
<button onClick={() => setCount((count) => count + 1)}>
  count is {count}
</button>
<p>
  Edit <code>src/App.jsx</code> and save to test HMR
</p>
</div>
<p className="read-the-docs">
Click on the Vite and React logos to learn more
</p> */
}
