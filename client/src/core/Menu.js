import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <ul className="nav nav-tabs bg-dark" data-bs-theme="dark">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signin">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Signup
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
