import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cartHelpers";
import "./Navbar.css";
import SVG from "./logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ history }) => {
  return (
    <div>
      <div
        style={{ height: "100px" }}
        className="bg-white d-flex align-items-center justify-content-center justify-content-lg-start"
      >
        <img id="image" src={SVG} alt="Logo" />
        <ul className="nav col-12 text-uppercase fw-bold col-lg-auto  me-lg-auto mb-2 justify-content-center mb-md-0 ms-5">
          <li>
            <Link className="nav-link px-5 text-black" to="/shop">
              Shop
            </Link>
          </li>
          <li>
            <Link className="nav-link px-2 text-black me-4" to="/cart">
              <FontAwesomeIcon className="me-1" icon={faCartShopping} size="lg"/>
              <sup className="badge rounded-pill bg-danger">
                <small>{itemTotal()}</small>
              </sup>
            </Link>
          </li>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li>
              <Link className="nav-link px-2 text-black" to="/user/dashboard">
                Dashboard
              </Link>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li>
              <Link className="nav-link px-2 text-black" to="/admin/dashboard">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        {!isAuthenticated() && (
          <div className="text-end px-5 me-4">
            <Link
              className="btn btn-outline-light fw-bold text-uppercase px-3 m-4 bg-success"
              to="/signin"
            >
              Login
            </Link>

            <Link
              className="btn fw-bold btn-warning text-uppercase px-3"
              to="/signup"
            >
              Signup
            </Link>
          </div>
        )}
        {isAuthenticated() && (
          <span
            className="btn fw-bold btn-warning text-uppercase px-3 me-5"
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Logout
          </span>
        )}
      </div>
      <div
        style={{
          height: "50px",
        }}
        className="bg-info"
      ></div>
    </div>
  );
};

export default withRouter(Navbar);
