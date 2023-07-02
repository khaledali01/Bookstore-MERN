import React from "react";

const Signup = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>Email</label>
        <input type="email" />
        <label>Password</label>
        <input type="password" />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
