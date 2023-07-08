import React, { useState } from "react";
import Layout from "./Layout";

const Checkout = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [choice, setChoice] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);

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
    // Perform submission logic here
  };

  return (
    <Layout
      title="Checkout Page"
      description="Enter your personal information and shipping details."
      className="container"
    >
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
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
            <button className="btn btn-primary btn-block" type="submit">
              Submit Order
            </button>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
