import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();

  const [adminData, setAdmindata] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || localStorage.getItem("isLogged") !== "true") {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3000/admin/api/v1/fetchdata", {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the token
          },
        })
        .then((response) => {
          setAdmindata(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Handle error or unauthorized access
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    navigate("/login");
  };

  return (
    <>
      <button className="btn btn-danger btn-sm" onClick={handleLogout}>
        Logout
      </button>
      <p>Welcome to dashboard {adminData.name}</p>
    </>
  );
}

export default AdminDashboard;
