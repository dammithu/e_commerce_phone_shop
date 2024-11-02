import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

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
      return "Password is required.";
    } else if (password.length <= 3) {
      return "Password must be at least 3 characters long.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    setEmailError("");
    setPasswordError("");
    setServerError("");

   
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError || passwordValidationError) {
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      return;
    }

   
    axios
      .post(`${process.env.REACT_APP_BE_BASE_URI}/login`, { email, password })
      .then((result) => {
        if (result.data.message === "Success") {
         
          localStorage.setItem("user", JSON.stringify(result.data.user));
          Swal.fire({
            icon: "success",
            title: "Logged in successfully!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/");
          });
        } else {
          setServerError("Login failed. Please check your credentials.");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect password or email!",
        });
      });
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="card login-card shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Log In</h2>
          {serverError && (
            <div className="alert alert-danger text-center">{serverError}</div>
          )}
          <form onSubmit={handleSubmit}>
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
              Log In
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="link">
                Sign up
              </a>
              <br />
              Admin login?{" "}
              <a href="/adminlogin" className="link">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
