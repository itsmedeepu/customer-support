import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect((e) => {
    if (
      !localStorage.getItem("token") &&
      localStorage.getItem("isLogged") !== "true"
    ) {
      navigate("/login");
    }
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    navigate("/login");
  };

  return (
    <>
      <button type="btn-sm btn-danger" onClick={handleLogout}>
        Logout
      </button>
      <p>welcome to admin dashboard</p>
    </>
  );
}

export default AdminDashboard;
