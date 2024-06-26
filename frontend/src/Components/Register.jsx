import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../Reducers/user";
import { LoginWrapper } from "./Login";

const API_REGISTER = "http://localhost:8080/register";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(API_REGISTER, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setId(data.response.id));
          dispatch(user.actions.setIsLoggedIn(true));
          navigate("/products");
        } else {
          console.log("Login failed");
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setIsLoggedIn(false));
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <LoginWrapper>
      <h3>Welcome, register here!</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </LoginWrapper>
  );
};

export default Register;


