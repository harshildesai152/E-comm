import React, { useRef, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { FaUserLock } from "react-icons/fa";
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { Typography } from '@mui/material';
import "./Payment.css";
import { useNavigate } from 'react-router-dom';
import { RiBankCardFill } from "react-icons/ri";
import { RiPassValidLine } from "react-icons/ri";
import { clearErrors ,createOrder} from '../../actions/OrderAction';


const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingInfo,cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100)
  };


  const order={
    shippingInfo,
    orderItems:cartItems,
    itemsPrice:orderInfo.subtotal,
    taxPrice:orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:orderInfo.totalPrice

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/payment/process", paymentData, config); // Updated endpoint
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {

          order.paymentInfo={    //backend :orderModel.js:  given id,ststus
            id:result.paymentIntent.id,
            status:result.paymentIntent.status,

          }
          dispatch(createOrder(order))
          navigate("/success");
        } else {
          alert.error("Payment processing failed");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

    useEffect(()=>{
       if(error){
        alert.error(error);
        dispatch(clearErrors());
       }
    },[dispatch,error,alert])

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
   
      <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
      <img  className='w11' src="/credit-card-payment-concept-landing-page.png" alt="" />
        <Typography>Cart Information</Typography>
        <div>
          <RiBankCardFill />
          <CardNumberElement className='paymentInput' />
        </div>
        <div>
          <RiPassValidLine />
          <CardExpiryElement className='paymentInput' />
        </div>
        <div>
          <FaUserLock />
          <CardCvcElement className='paymentInput' />
        </div>
        <input type="submit" value={`Pay - ${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='paymentFormBtn' />
      </form>
    </Fragment>
  );
};

export default Payment;
