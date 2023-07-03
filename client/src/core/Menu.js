import React from "react";
import { NavLink } from "react-router-dom";
import { signout } from "../auth/index";

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
        <li className="nav-item">
          <NavLink
            style={{ cursor: "pointer", color: "#ffffff" }}
            className="nav-link"
            onClick={() => signout()}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
