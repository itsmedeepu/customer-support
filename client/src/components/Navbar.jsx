import React from "react";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav-bar">
      <div className="nav-items">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
