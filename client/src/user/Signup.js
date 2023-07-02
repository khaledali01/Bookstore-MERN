import React, { useReducer } from "react";
import Layout from "../core/Layout";

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

  return (
    <Layout
      title="Sign Up"
      description="Sign Up to Books E-Commerce"
      className="container col-md-8 offset-md-2"
    >
      <h1>Sign Up</h1>
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
          />
        </div>
        <button className="btn btn-dark">Sign Up</button>
      </form>
      {JSON.stringify(state)}
    </Layout>
  );
};

export default Signup;
