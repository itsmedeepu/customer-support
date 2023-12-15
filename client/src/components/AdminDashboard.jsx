import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    navigate("/login");
    return null; // or a loading indicator while redirection occurs
  }

  return <>Welcome</>;
}

export default AdminDashboard;
