import React from "react";
import Layout from "../core/Layout";

const Signup = () => {
  return (
    <div>
      <Layout title="Sign Up" description="Sign Up to Books E-Commerce">
        <h1>Sign Up</h1>
        <form>
          <label>Email</label>
          <input type="email" />
          <label>Password</label>
          <input type="password" />
          <button>Sign Up</button>
        </form>
      </Layout>
    </div>
  );
};

export default Signup;
