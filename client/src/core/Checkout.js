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
      <div class="container">
        <main>
          <div class="py-5 text-center">
            <h2>Checkout Form</h2>
          </div>

          <div class="row g-5">
            <div class="col-md-5 col-lg-4 order-md-last">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-primary">Order Summary</span>
                <span class="badge bg-primary rounded-pill">3</span>
              </h4>
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-sm mt-3">
                  <div>
                    <h6 class="my-0">Subtotal</h6>
                  </div>
                  <span class="text-body-secondary">{subtotal}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 class="my-0">Shipping Cost</h6>
                  </div>
                  <span class="text-body-secondary">{shippingCost}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 class="my-0">Total</h6>
                  </div>
                  <span class="text-body-secondary">{total}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                  <div class="text-success">
                    <h6 class="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span class="text-success">−$5</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$20</strong>
                </li>
              </ul>

              <form class="card p-2 mt-4">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Promo code"
                  />
                  <button type="submit" class="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </form>

              <button
                onClick={handleSubmit}
                class="w-100 btn btn-primary btn-lg mt-4"
                type="submit"
              >
                Place Order
              </button>
            </div>
            <div class="col-md-7 col-lg-8">
              <h4 class="mb-3">Billing Information</h4>
              <form class="needs-validation" novalidate>
                <div class="row g-3">
                  <div class="col-12">
                    <label for="firstName" class="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder=""
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                    <div class="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="email" class="form-label">
                      Email <span class="text-body-secondary">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <div class="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="address" class="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      value={address}
                      placeholder="1234 Main St"
                      onChange={handleAddressChange}
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="address2" class="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      class="form-control"
                      id="address2"
                      placeholder="01065140587"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>

                  <div class="col-md-5">
                    <label for="country" class="form-label">
                      Governorate
                    </label>
                    <select
                      value={choice}
                      onChange={handleChoiceChange}
                      class="form-select"
                      id="country"
                      required
                    >
                      <option value="">Select an option</option>
                      <option>Cairo</option>
                      <option>Alexandria</option>
                    </select>
                    <div class="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                </div>

                <div class="form-check mt-3">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="save-info"
                  />
                  <label class="form-check-label" for="save-info">
                    Save this information for next time
                  </label>
                </div>

                <h4 class="mb-3 mt-4">Payment</h4>

                <div class="my-3">
                  <div class="form-check">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      class="form-check-input"
                      checked
                      required
                    />
                    <label class="form-check-label" for="credit">
                      Cash On Delivery
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Checkout;
