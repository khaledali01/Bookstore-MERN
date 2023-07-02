import React from "react";

const Signin = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <label>Email</label>
        <input type="email" />
        <label>Password</label>
        <input type="password" />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
