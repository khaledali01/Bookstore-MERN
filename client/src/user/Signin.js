import React from "react";
import Layout from "../core/Layout";

const Signin = () => {
  return (
    <div>
      <Layout title="Sign In" description="Sign In to Books E-Commerce">
        <h1>Sign In</h1>
        <form>
          <label>Email</label>
          <input type="email" />
          <label>Password</label>
          <input type="password" />
          <button>Sign In</button>
        </form>
      </Layout>
    </div>
  );
};

export default Signin;
