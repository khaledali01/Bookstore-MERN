import React, { useReducer } from "react";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const initialState = {
    email: "dady@gmail.com",
    password: "12345678910asa",
    error: false,
    loading: false,
    redirectToReferrer: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_VALUES":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { email, password, error, loading, redirectToReferrer } = state;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    dispatch({
      type: "SET_VALUES",
      payload: { [name]: event.target.value },
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "SET_VALUES", payload: { loading: true } });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          dispatch({
            type: "SET_VALUES",
            payload: { loading: false, error: data.error },
          });
        } else {
          authenticate(data, () => {
            dispatch({
              type: "SET_VALUES",
              payload: {
                loading: false,
                redirectToReferrer: true,
                error: false,
              },
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "SET_VALUES",
          payload: { error: err, loading: false },
        });
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

  const showLoading = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        Loading ....
      </div>
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Login"
      description="Login to Books E-Commerce"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showLoading()}
      {redirectUser()}
      <h1>Login</h1>
      <form>
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
          Login
        </button>
      </form>
      {JSON.stringify(state)}
    </Layout>
  );
};

export default Signin;
