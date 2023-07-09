import React, { useReducer } from "react";
import Layout from "../core/Layout";
import { signup } from "../auth/index";
import { Link } from "react-router-dom";

const Signup = () => {
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
    <Layout
      title="Sign Up"
      description="Sign Up to Books E-Commerce"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      <h1>Sign Up</h1>
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-dark">
          Sign Up
        </button>
      </form>
    </Layout>
  );
};

export default Signup;
