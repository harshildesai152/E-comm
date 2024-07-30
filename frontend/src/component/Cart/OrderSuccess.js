import React from 'react'
import { GoCheckCircle } from "react-icons/go";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './OrderSuccess.css'

const OrderSuccess = () => {
  return (
      <>
    
    <div className="orderSuccess">
    <img className='w1' src="/cartoon-courier-with-packages-electric-personal-transporter.png" alt="" />
        <GoCheckCircle/>
    
        <Typography>Your Order has been Placed Successfully</Typography>
        <Link to="/orders">view order</Link>
    </div>
    </>
  )
}

export default OrderSuccess
