import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./user/Register";
import Login from "./user/Login";
import Dashboard from "./user/UserDashboard";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Checkout from "./core/Checkout";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/updateCategory";
import Navbar from "./core/Navbar";
import Header from "./core/Header";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Switch>
          <Route path="/" exact component={Shop} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/signin" exact component={Login} />
          <Route path="/signup" exact component={Register} />
          <Route path="/product/:productId" exact component={Product} />
          <Route path="/cart" exact component={Cart} />
          <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/profile/:userId" exact component={Profile} />
          <PrivateRoute path="/checkout" exact component={Checkout} />
          <AdminRoute path="/admin/products" exact component={ManageProducts} />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoute path="/create/category" exact component={AddCategory} />
          <AdminRoute path="/create/product" exact component={AddProduct} />
          <AdminRoute path="/admin/orders" exact component={Orders} />
          <AdminRoute
            path="/admin/product/update/:productId"
            exact
            component={UpdateProduct}
          />
          <AdminRoute
            path="/admin/category/update/:categoryId"
            exact
            component={UpdateCategory}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
