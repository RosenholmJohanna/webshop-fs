import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import user from "../Reducers/user";
import styled from "styled-components";

const API_LOGIN = 'http://localhost:8080/register';

const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   //const isLoading = useSelector(state => state.user.isLoading);
//   //const error = useSelector(state => state.user.error);




const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch( API_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      }
    );
    console.log(response);
    setUsername("");
    setPassword("");

  } catch (error) {
    console.error("fetch error:");
  }
};

//   const handleSubmit =(event) => {
//     event.preventDefault();
//       const options = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
         
//         }, body: JSON.stringify({
//           username: username,
//           password: password,
//         })
//       }
//        fetch(API_LOGIN, options) 
//         .then(response => response.json())
//         .then(data => {
//           if(data.success) { 
//               dispatch(user.actions.setError(null));
//           } else {
//               dispatch(user.actions.setError(data.response));
//             }
//         })
//       }




  return (
    <LoginWrapper>
      <h3>Welcome!</h3>
     
<form onSubmit={handleSubmit}>


<div>
<label htmlFor = "username">username</label>
  <input
    placeholder="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</div>

<div>
<label htmlFor = "password">password</label>
  <input
    type="password"
    placeholder="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>

  <button type="submit">login</button>
</form>

      <a>Already a user? Loggin here</a>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flexbox;
  margin-top: 50%;
`
;


