import React, { useState } from 'react';
import logo from "../assets/react.svg"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // State variable for email
  const [password, setPassword] = useState(""); // State variable for password
  const Navigat = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if( email != "" || password != ""){
      let data = {
        email: email,
        password: password
      }
      try {
        const resp = await axios.post("http://localhost:3000/login", data);
        if(resp.status === 200){
          alert("Login successfully");
          setEmail("")
          setPassword("");
          Navigat("/home");
        }else{
          alert("Invalid Email or Password");
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    
  };

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <div className="login-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="login-heading">Login Now!</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={password} onChange={(e) => setPassword(e.target.value)} // Set value and onChange event handler
            />
            <i
              className={`password-toggle ${showPassword ? "fas fa-eye-slash" : "fas fa-eye"}`}
              onClick={togglePasswordVisibility}
            >show</i>
          </div>
          <button type="button" className="login-btn" onClick={handleLogin}>Login</button>
        </form>
        <div className="create-account">
          <p>Don't have an account?</p>
          <Link to="/register" className="signup-link"> Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
