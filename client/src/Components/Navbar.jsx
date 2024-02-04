import React from "react";
import { NavLink } from "react-router-dom";

import '../Modules/Navbar.css'
const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="container">
          <NavLink to="/login" className="navele">
            Login
          </NavLink>

          <NavLink to="/" className="navele">
            SignUp
          </NavLink>

          <NavLink to="/addBook" className="navele">
            Add Books

          </NavLink>
          <NavLink to="/booklist" className="navele">
            Booklist
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
