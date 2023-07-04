import React from "react";
import { NavLink } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";

const isAuth = () => {
  if (isAuthenticated()) {
    return (
      <li className="nav-item">
        <NavLink
          style={{ cursor: "pointer", color: "#ffffff" }}
          className="nav-link"
          onClick={() => signout(() => isAuth())}
        >
          Logout
        </NavLink>
      </li>
    );
  } else {
    return (
      <>
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
      </>
    );
  }
};

const Menu = () => {
  return (
    <nav>
      <ul className="nav nav-tabs bg-dark" data-bs-theme="dark">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        {isAuth()}
      </ul>
    </nav>
  );
};

export default Menu;
