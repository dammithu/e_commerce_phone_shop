import React, { useState } from "react";
import "./signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateName = (name) => {
    if (!name) {
      return "Name is required";
    } else if (/[^a-zA-Z\s]/.test(name)) {
      return "Name should contain only letters";
    } else {
      return "";
    }
  };

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return "Please enter a valid email address.";
      }
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    setNameError("");
    setEmailError("");
    setPasswordError("");

   
    const nameValidationError = validateName(name);
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (
      nameValidationError ||
      emailValidationError ||
      passwordValidationError
    ) {
      setNameError(nameValidationError);
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      return; 
    }

    
    axios
      .post(`${process.env.REACT_APP_BE_BASE_URI}/signup`, { name, email, password })
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Signup successful!",
          text: "You can now log in.",
          showConfirmButton: true,
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Signup failed",
            text: "Email is already in use.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Signup failed",
            text: "There was an error during signup. Please try again.",
          });
        }
      });
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <div className="card signup-card shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className={`form-control ${nameError ? "is-invalid" : ""}`}
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <div className="invalid-feedback">{nameError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <div className="invalid-feedback">{passwordError}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-4">
              Sign Up
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <a href="/login" className="link">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
