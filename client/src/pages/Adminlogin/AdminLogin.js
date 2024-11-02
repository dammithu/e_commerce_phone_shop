import React, { useState } from "react";
import "./adminlogin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AdminLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const validateUserName = (userName) => {
    if (!userName) {
      return "Name is required";
    } else if (/[^a-zA-Z\s]/.test(userName)) {
      return "Name should contain only letters";
    } else {
      return "";
    }
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

    // Reset errors
    setUserNameError("");
    setPasswordError("");
    setServerError("");

    // Validate inputs
    const userNameValidationError = validateUserName(userName);
    const passwordValidationError = validatePassword(password);

    if (userNameValidationError || passwordValidationError) {
      setUserNameError(userNameValidationError);
      setPasswordError(passwordValidationError);
      return;
    }

    // If validation passes, proceed with API call
    axios
      .post(`${process.env.REACT_APP_BE_BASE_URI}/adminlogin`, { userName, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          // Save admin information to localStorage
          localStorage.setItem("admin", JSON.stringify({ userName }));

          Swal.fire({
            icon: "success",
            title: "Logged in successfully!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/adminhome");
          });
        } else {
          setServerError("Login failed. Please check your credentials.");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect password or username!",
        });
      });
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="card login-card shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Admin Login</h2>
          {serverError && (
            <div className="alert alert-danger text-center">{serverError}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                className={`form-control ${userNameError ? "is-invalid" : ""}`}
                id="username"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {userNameError && (
                <div className="invalid-feedback">{userNameError}</div>
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
              User login?{" "}
              <a href="/login" className="link">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
