import React, { useState } from "react";

import "./css/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3000/admin/api/v1/login", login)
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("isLogged", "true");
        } else {
          setErr;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    setLoading(false);
  };

  return (
    <>
      <div className="container">
        <div className="card col-lg-6 m-auto mt-5">
          <div className="card-header text-center bg-info text-white ">
            <h2>Admin Login</h2>
          </div>
          <div className="card-body">
            <div className="error"></div>
            <form className="col-lg-6 m-auto">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={login.email}
                  className="form-control"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={login.password}
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-sm btn-primary col-lg-12"
                  onClick={handleSubmit}
                >
                  Login {loading ? "logging in" : ""}
                </button>
              </div>
              <div className="mb-3 ">
                <Link to="/forgotpassword">Forgot password ?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;