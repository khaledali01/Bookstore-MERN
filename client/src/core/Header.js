import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cartHelpers";

const Header = ({ history }) => {
  return (
    <header class="p-3 bg-secondary">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul class="nav col-12 text-uppercase fw-bold col-lg-auto  me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link className="nav-link px-5 text-white" to="/shop">
                Shop
              </Link>
            </li>
            <li>
              <Link className="nav-link px-2 text-white" to="/cart">
                Cart{"  "}
                <sup>
                  <small>{itemTotal()}</small>
                </sup>
              </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li>
                <Link className="nav-link px-2 text-white" to="/user/dashboard">
                  Dashboard
                </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li>
                <Link
                  className="nav-link px-2 text-white"
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {!isAuthenticated() && (
            <div class="text-end px-5">
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
              className="btn fw-bold btn-warning text-uppercase px-3"
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
      </div>
    </header>
  );
};

export default withRouter(Header);
