import React, { useState } from "react";
import "./Login.scss";
import { FaAngleRight, FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8100/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("responseData",responseData);

      if (response.ok) {
        
        localStorage.setItem('UserID', responseData.user.user.UserID);
        localStorage.setItem('username', responseData.user.user.Username);
        localStorage.setItem('tagname', responseData.user.user.TagName);
        localStorage.setItem('location', responseData.user.user.Location);
        
        console.log('User logged in successfully:', responseData.user.user.Username);

        navigate("/profile");

      } else {
        setError(responseData.error || "Failed to login");
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError("Failed to login");
    }
  };


  return (
    <div className="container">
      <div className="login-screen">
        <h2 className="login-header">Login</h2>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
           
            <input
              type="email"
              {...register("Email", { required: "Email is required" })}
              placeholder="Enter your email"
            />
          </div>
          {errors.Email && <p className="error-message">{errors.Email.message}</p>}
          <div className="form-field">
           
            <input
              type="password"
              {...register("Password", { required: "Password is required" })}
              placeholder="Enter your password"
            />
          </div>
          {errors.Password && <p className="error-message">{errors.Password.message}</p>}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <a href="/">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;


