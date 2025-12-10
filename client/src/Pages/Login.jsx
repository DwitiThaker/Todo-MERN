import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Store/Auth";
import "../components/login.css";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  
  const {storeTokenInLS} = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`https://todo-mern-fgws.onrender.com/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

  
    if (response.ok) {
      setUser({email: "", password: ""});  
      navigate("/");   
      const data = await response.json();
      storeTokenInLS(data.token)
      console.log("response from server: ", data);
    }
    else{
      alert("Invalid Credentials");
      console.log("invalid credentials");
    }

    

  } catch (error) {
    console.error("Login: ", error);
  }
};


  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser((prev)=>({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="login-container">
        <div className="login-image">
          <img src="/image.jpg" alt="decorative artwork" />
        </div>
        <div className="login-form">
          <h1 className="main-heading mb-3">Login here</h1>
          <form onSubmit={handleSubmit}>
            <div className="login-input">
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleInput}
                value={user.email}
              ></input>

              <input
                type="text"
                name="password"
                placeholder="Password"
                onChange={handleInput}
                value={user.password}
              ></input>

              <button type="submit" className="btn-submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
