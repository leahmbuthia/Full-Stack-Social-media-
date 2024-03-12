import React, { useState } from "react";
import "./Register.scss";
import { FaAnglesRight, FaAddressCard, FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8100/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        console.log('User registered successfully:', responseData);
        navigate("/login");
      } else {
        setError(responseData.message || "Failed to register user");
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError("Failed to register user");
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <div className="form-head">
            <h2>Create An Account</h2>
          </div>
          <div className="register-page">
            <div className="register-img"></div>
            <form className="register" onSubmit={handleSubmit(onSubmit)}>
              <div className="register__field">
                <FaAddressCard className="register__icon fas fa-user" />
                <input
                  type="text"
                  className="register__input"
                  {...register("Username")}
                  placeholder="Enter your Username"
                />
              </div>
              <div className="register__field">
                <FaAddressCard className="register__icon fas fa-user" />
                <input
                  type="text"
                  className="register__input"
                  {...register("Email")}
                  placeholder="Enter your Email"
                />
              </div>
              <div className="register__field">
                <FaLock className="register__icon fas fa-lock" />
                <input
                  type="password"
                  className="register__input"
                  {...register("Password")}
                  placeholder="Password"
                />
              </div>
              <div className="register__field">
                <FaAddressCard className="register__icon fas fa-user" />
                <input
                  type="text"
                  className="register__input"
                  {...register("TagName")}
                  placeholder="Enter your Tag Name"
                />
              </div>
              <div className="register__field">
                <FaAddressCard className="register__icon fas fa-user" />
                <input
                  type="text"
                  className="register__input"
                  {...register("Location")}
                  placeholder="Enter your Location"
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="button register__submit">
                <span className="button__text">Register Now</span>
              </button>
            </form>
          </div>
          <div className="social-register">
            <h3>Have an Account already</h3>
            <a onClick={() => navigate("/login")}>Login Here</a>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;


