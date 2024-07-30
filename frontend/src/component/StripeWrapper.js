// src/StripeWrapper.js
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import Payment from './Cart/Payment';


const StripeWrapper = () => {
  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    const getStripeApiKey = async () => {
      try {
        // Mocked response for development
        const data = { stripeApiKey: 'pk_test_51PQuIhRtWyURhCzd2X9b8QYmnliCmcISs1qBtcXMPXSYaktQMrcQ2dLvSazd3ZXtTYfJJ6yOnOAK5dOVPwelj7jl00nGZriXzq' };
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.error('Error fetching Stripe API key:', error);
     
      } finally {
        
      }
    };
    getStripeApiKey();
  }, []);
  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  return stripePromise ? (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  ) : (
    <div>Loading...</div>
  );
};

export default StripeWrapper;
