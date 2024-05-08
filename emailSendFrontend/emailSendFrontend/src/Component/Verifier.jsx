import React, { useState } from "react";
import logo from "../assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();

  const handleVerify = async () => {
    if (verificationCode !== "" || email !== "") {
      const data = {
        email: email,
        verificationCode: verificationCode
      }
      const resp = await axios.post("http://localhost:3000/activate", data);
      
      if (resp.status === 200) {
        alert("Email Verified Successfully");
        Navigate("/");
      } else if (resp.status === 400) {
        alert("invalid Email or Verification Code, Try Again!");
      } else {
        alert("server error");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="background-image"></div>
      <div className="signup-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="signup-heading">Email Verification</h2>
        <form className="signup-form">
          <div className="input-group">
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Verification Code"
              className="input-field"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <button type="button" className="signup-btn" onClick={handleVerify}>
            Verify
          </button>
        </form>

        <div className="login-link">
          <p>Go to .</p>
          <Link to="/" className="change-email-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
