import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../Reducers/user";
import styled from "styled-components";

const API_LOGIN = "http://localhost:8080/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    console.log('useEffect')
    if (userId) {
      navigate("/products");
    }
  }, [userId, navigate]);

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
    fetch(API_LOGIN, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setId(data.response.id));
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setIsLoggedIn(true));
          
        } else {
          console.log("Login failed");
          dispatch(user.actions.setUsername(null));
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <LoginWrapper>
      <h3>Login here!</h3>

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
        <button type="submit">login</button>
      </form>
    </LoginWrapper>
  );
};

export default Login;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50%;
  margin-bottom: 50%;
  text-align: center;

  input {
  margin: 5%;
  }

  button {
    background-color: #18618c;
    padding: 2%;
    color: white;
    width: 35%;
    border-style: none;
  }
`;
