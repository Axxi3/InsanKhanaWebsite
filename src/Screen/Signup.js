import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "../component/Alert";  

export default function Signup() {  
  const navigate = useNavigate();
  const [success, setSuccess] = useState({
    staus: true,
    message: "",
  });
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    pass: "",
    Address: "",
    City: "",
    State: "",
  });

  const changeValue = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  const SubmitHogaya = async (e) => {
    e.preventDefault();
    const Response = await fetch("http://localhost:5000/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pass: credentials.pass,
        email: credentials.email,
      }),
    });
    const res = await Response.json();
  
    if (!res.success) {
      setSuccess({
        staus: false,
        message: res.errors,
      });
    } else {
      setSuccess({
        staus: true,
        message: "Successfull login",
      });  
      localStorage.setItem("authToken",res.auth)  
      
      navigate('/')
    }
  };

  return (
    <div className="signdiv">
      <div className="left centre"></div>
      <div className="right centre">
        {!success.staus && (
          <div id="liveAlertPlaceholder">
            <Alert message={success.message} />
          </div>
        )}

        <h1 className="topcentre">Welcome back</h1>
        <p> Welcome back! please fill your details</p>
        <form className="row g-3 form" onSubmit={SubmitHogaya}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              E-mail
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Type your email"
              name="email"
              value={credentials.email}
              onChange={changeValue}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Type your password"
              name="pass"
              value={credentials.pass}
              onChange={changeValue}
            />
          </div>
          <div className="forgot">
            <p>Forgot password?</p>
          </div>

          <div className="d-grid gap-2 buttons">
            <button type="submit" className="btn btn-primary btncolor">
              Sign in
            </button>
          </div>
        </form>
        <div className="newuser">
          <p>
            <NavLink exact to="/signup">
              New here?Click here and create a account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
