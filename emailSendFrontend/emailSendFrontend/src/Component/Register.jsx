import React, { useState } from "react";
import logo from "../assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Corrected variable name
  const [conPass, setConPass] = useState(""); // Corrected variable name
  const Navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async () => {
    if (email !== "" || password !== "" || conPass !== "") {
      // Corrected conditional logic
      if (password !== conPass) {
        alert("Both Entered Passwords Are Not Same");
      } else {
        let data = {
          email: email, // Corrected variable name
          password: password, // Corrected variable name
        };
        try {
          let resp = await axios.post("http://localhost:3000/register", data);
          if (resp.status === 200) {
            alert(resp.data.message);
            setEmail("");
            setPassword("");
            setConPass("");
            Navigate("/email-verify");
          } else {
            alert("Email Already Existed!");
          }
        } catch (error) {
          console.error("Error registering:", error);
          // Handle error properly, show error message to user or log it
        }
      }
    } else {
      alert("Please fill in all fields"); // Added alert for empty fields
    }
  };

  return (
    <div className="signup-container">
      <div className="background-image"></div>
      <div className="signup-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="signup-heading">Sign Up</h2>
        <form className="signup-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Corrected function call
            />
            <i
              className={`password-toggle ${
                showPassword ? "fas fa-eye-slash" : "fas fa-eye"
              }`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input-field"
              value={conPass}
              onChange={(e) => setConPass(e.target.value)} // Corrected function call
            />
            <i
              className={`password-toggle ${
                showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
              }`}
              onClick={toggleConfirmPasswordVisibility}
            ></i>
          </div>
          <button type="button" className="signup-btn" onClick={handleRegister}>
            Sign Up
          </button>{" "}
          {/* Changed type to "button" */}
        </form>
        <div className="login-link">
          <p>Already have an account?</p>
          <Link to="/" className="signup-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
