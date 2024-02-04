import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../Modules/Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedRole");

    // Redirect to Signup page
    navigate("/");
  };
  return (
    <div>
      <nav>
        <div className="container">
          <NavLink to="/" className="navele">
            SignUp
          </NavLink>
          <NavLink to="/login" className="navele">
            Login
          </NavLink>

          <button onClick={handleLogout} style={{backgroundColor:"red"}}>Logout</button>

          {/* <NavLink to="/addBook" className="navele">
            Add Books

          </NavLink>
          <NavLink to="/booklist" className="navele">
            Booklist
          </NavLink> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
