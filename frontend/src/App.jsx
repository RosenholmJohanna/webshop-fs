import React, { useState } from 'react'
import Login from './Components/Login'
import Products from './Components/Products'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Provider } from 'react-redux'
//import store from './store'
import './App.css'
import user from './Reducers/user'
import { configureStore } from '@reduxjs/toolkit'
//import online from './assets/online.svg';


const reducer = ({
  user: user.reducer,
});


const store = configureStore({reducer});

function App() {
  

  return (
  <>
    <Provider store={store}>
      <Header />
       <Login />
       <Products />
       <Footer />
    </Provider>
  </>
  )
}

export default App







{/* <div>

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
</p> */}