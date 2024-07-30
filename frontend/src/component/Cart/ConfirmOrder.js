import React, { Fragment } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import './ConfirmOrder.css';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Ensure cartItems is defined and not empty before calculating subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges + tax;

  const address = shippingInfo
    ? `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
    : '';
   
  const processToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
      address
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));  //sessionStorage cannot store data permanently if you open a new tab, so click to payment again.
    
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="ConfirmOrder">
        <div>
          <div className="ConfirmShipping">
            <Typography className='ll1'>Shipping Info:</Typography>
            <div className="shippingBox1">
              <div>
                <p>Name:</p>
                <span>{user ? user.name : 'Loading...'}</span>
              </div>

              <div>
                <p>Phone:</p>
                <span>{shippingInfo ? shippingInfo.phoneNo : 'Loading...'}</span>
              </div>

              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCart">
            <Typography>Your Cart Items:</Typography>
          </div>
          <div className="confirmcartitem">
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>
                    ₹{item.price} × {item.quantity}  = <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
        {/* Order summary section */}
        <div className="orderSummary">
          <Typography>Order Summary:</Typography>
          <div>
            <div>
              <p>Subtotal:</p>
              <span>₹{subtotal}</span>
            </div>

            <div>
              <p>Shipping Charges:</p>
              <span>₹{shippingCharges}</span>
            </div>

            <div>
              <p>GST:</p>
              <span>₹{tax}</span>
            </div>

            <div className="orderSummary">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={processToPayment}>Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
