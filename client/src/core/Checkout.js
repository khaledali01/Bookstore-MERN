import React, { useState } from "react";
import { createOrder } from "./apiCore";
import { isAuthenticated } from "../auth";

const Checkout = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [choice, setChoice] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChoiceChange = (e) => {
    setChoice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createOrderData = {
      address: address,
    };

    createOrder(userId, token, createOrderData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <form>
            <section>
              <h3>Personal Information</h3>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  id="address"
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  id="phoneNumber"
                  className="form-control"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </section>
          </form>
        </div>
        <div className="col-md-6">
          <section>
            <h3>Order Summary</h3>
            <div className="form-group">
              <label htmlFor="subtotal">Subtotal:</label>
              <span id="subtotal" className="form-control">
                {subtotal}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="choice">Governorate - المحافظة:</label>
              <select
                id="choice"
                className="form-control"
                value={choice}
                onChange={handleChoiceChange}
              >
                <option value="">Select an option</option>
                <option value="option1">Cairo - القاهرة</option>
                <option value="option2">Alexandria - الإسكندرية</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="shippingCost">Shipping Cost:</label>
              <span id="shippingCost" className="form-control">
                {shippingCost}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="total">Total:</label>
              <span id="total" className="form-control">
                {total}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="btn btn-primary btn-block"
              type="submit"
            >
              Submit Order
            </button>
          </section>
        </div>
      </div>
      {JSON.stringify({
        name,
        address,
        phoneNumber,
        email,
        choice,
        subtotal,
        shippingCost,
        total,
      })}
    </div>
  );
};

export default Checkout;
