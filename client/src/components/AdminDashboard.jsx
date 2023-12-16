import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect((e) => {
    if (
      !localStorage.getItem("token") &&
      localStorage.getItem("isLogged") !== "true"
    ) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Navbar />

      <p>welcome to admin dashboard</p>
    </>
  );
}

export default AdminDashboard;
