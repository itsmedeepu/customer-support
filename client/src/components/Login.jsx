import React, { useState } from "react";
import "./css/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  const notify = () => toast("Wow so easy !");

  return (
    <div>
      <button onClick={notify}>Notify !</button>
      <ToastContainer />
    </div>
  );
}
function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value === "") {
    }

    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (login.email === "") {
      toast.error("Enter Email", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

        theme: "light",
      });
      return;
    }
    if (login.password === "") {
      toast.error("Enter password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }
    setLoading(true);
    setProgress(30);

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/api/v1/login",
        login
      );

      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLogged", "true");

        navigate("/dashboard");
      } else {
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setProgress(100);
        setLoading(false);
      }
    } catch {}
  };

  const onClick = (e) => {
    if (e.target.checked) {
      setPassword(true);
    } else {
      setPassword(false);
    }
  };

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
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
                  type={password ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={login.password}
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input type="checkbox" onChange={onClick} /> Show password
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-sm btn-primary col-lg-12"
                  onClick={handleSubmit}
                >
                  {loading ? "Logging in" : "Login"}
                </button>
              </div>
              {/* <div className="mb-3 col-lg-12 col-md-12 col-sm-12 ">
                <Link to="/forgotpassword">Forgot password ?</Link>
              </div> */}
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
