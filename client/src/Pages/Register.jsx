import React, { useState } from 'react'
import '../components/register.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Store/Auth';

export const Register = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const storeTokenInLS = useAuth();

    const navigate = useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser((prev) => ({...prev, 
            [name]: value,
        }));
    }

    //to prevent form from refreshing
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
      console.log("Submitting user:", user);
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if(response.ok){
        const data = await response.json();
        storeTokenInLS(data.token);
        console.log("response from server: ", data);
        setUser({username: "",
        email: "",
        phone: "",
        password: "",})
        navigate("/login");
      }

      console.log("done", response);
    } catch (error) {
      console.error("Login: ", error);
    }
        
    };
    

  return (
    <>
    <div className='register-container'>
      <div className="register-image"><img src="/image.jpg" alt="decorative artwork" /></div>
      <div className="registration-form">
        <h1 className='main-heading mb-3'>Register here</h1>
        
        <form onSubmit={handleSubmit}>

      <div className="register-input">
        <input type="text" name="username" placeholder='Username' onChange={handleInput} value={user.username}></input>
        
        <input type="text" name="email" placeholder='Email' onChange={handleInput} value={user.email}></input>
        
        <input type="text" name="phone" placeholder='Phone Number' onChange={handleInput} value={user.phone}></input>

        <input type="text" name="password" placeholder='Password' onChange={handleInput} value={user.password}></input>
        

        <button type="submit" className="btn-submit">Join Us</button>
        </div>
        </form>
      </div>
    </div>
    </>
  )
}


