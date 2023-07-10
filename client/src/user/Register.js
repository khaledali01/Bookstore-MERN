import React, { useReducer } from "react";
import { signup } from "../auth/index";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_VALUES":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  const handleChange = (name) => (event) => {
    dispatch({
      type: "SET_VALUES",
      payload: { [name]: event.target.value, error: false },
    });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { name, email, password, error, success } = state;

  const clickSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          dispatch({
            type: "SET_VALUES",
            payload: { error: data.error },
          });
        } else {
          dispatch({
            type: "SET_VALUES",
            payload: {
              name: "",
              email: "",
              password: "",
              error: "",
              success: true,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        New Account is created. Please <Link to="/signin">Signin</Link>
      </div>
    );
  };

  return (
    <div className="vh-100 bg-body-tertiary">
      <main
        id="main"
        className="border border-warning form-signin bg-secondary-subtle position-absolute top-50 start-50 translate-middle"
      >
        {showError()}
        {showSuccess()}
        <h1 className="text-uppercase fs-3 mb-3 p-2 d-flex justify-content-center">
          Register
        </h1>
        <form>
          <div className="form-floating">
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name"
              value={name}
            />
            <label for="floatingInput">Name</label>
          </div>

          <div className="form-floating">
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control mt-2"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
            />
            <label for="floatingInput">Email</label>
          </div>

          <div className="form-floating">
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control mt-2"
              id="floatingInput"
              placeholder="name@example.com"
              value={password}
            />
            <label for="floatingInput">Password</label>
          </div>

          <button
            onClick={clickSubmit}
            className="text-uppercase btn btn-secondary mt-4 w-100 py-2"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
