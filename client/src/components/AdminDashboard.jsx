import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

import "./css/Dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || localStorage.getItem("isLogged") !== "true") {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/admin/api/v1/fetchdata",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAdminData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle error or unauthorized access
        } finally {
          setProgress(0);
        }
      };
      fetchData();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
      <div className="main-content">
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
        <p>Welcome to dashboard {adminData.name}</p>
        {/* Your main content goes here */}
      </div>
    </div>
  );
}

export default AdminDashboard;
