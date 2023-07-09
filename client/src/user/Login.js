import React, { useReducer } from "react";
import { signin, authenticate, isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const initialState = {
    email: "messi@gmail.com",
    password: "12444dasd",
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
    <div className="vh-100 bg-body-tertiary">
      <main
        id="main"
        className="border border-warning form-signin bg-secondary-subtle position-absolute top-50 start-50 translate-middle"
      >
        {showError()}
        {showLoading()}
        {redirectUser()}
        <form>
          <div className="form-floating">
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
            />
            <label for="floatingInput">Email address</label>
          </div>

          <div className="form-floating">
            <input
              onChange={handleChange("password")}
              type="password"
              value={password}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button
            onClick={clickSubmit}
            className="btn btn-secondary w-100 py-2"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
