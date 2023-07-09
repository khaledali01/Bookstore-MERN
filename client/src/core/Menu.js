import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cartHelpers";
import "./Menu.css";

const Menu = ({ history }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link className="list-item" to="/shop">
            Shop
          </Link>
        </li>

        <li>
          <Link className="list-item" to="/cart">
            Cart{" "}
            <sup>
              <small>{itemTotal()}</small>
            </sup>
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li>
            <Link className="list-item" to="/user/dashboard">
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li>
            <Link className="list-item" to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <>
            <li>
              <Link className="list-item" to="/signin">
                Login
              </Link>
            </li>

            <li>
              <Link className="list-item" to="/signup">
                SignUp
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <li>
            <span
              className="list-item"
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Logout
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(Menu);
