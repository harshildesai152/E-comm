import { Typography } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/OrderAction';
import MetaData from '../layout/MetaData';
import './OrderDetails.css';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, alert, id]);

  return (
    <Fragment>
      <MetaData title="Order Details" />
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography component="h1">
            Order #{order && order._id}
          </Typography>
          <Typography>Shipping Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{order && order.user && order.user.name}</span>
            </div>
            
            <div>
                <p>Phone:</p>
                <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
            </div>

            <div>
                <p>Address:</p>
                <span>{order && order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
            </div>

            <Typography>Payment</Typography>
            <div className="orderDetailsContainerBox">
                <div>
                    <p className={order && order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                        {order && order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                    </p>
                </div>

                <div>
                    <p>Amount:</p>
                    <span>{order && order.totalPrice && order.totalPrice}</span>
                </div>
            </div>

            <Typography>Order status</Typography>
            <div className="orderDetailsContainerBox">
                <div>
                    <p className={order && order.orderStatus === "Deivered" ? "greenColor" : "redColor"}>
                        {order && order.orderStatus}
                    </p>
                </div>

                <div className="orderDetailsCartItems">
                    <Typography>Orders Items:</Typography>
                    <div className="orderDetailsCartItemsContainer">
                        {order && order.orderItems && order.orderItems.map((item) => (
                            <div key={item.product}>
                                <img src={item.image} alt="Product" />
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                <span>
                                    ₹{item.price} × {item.quantity} = <b>₹{item.price * item.quantity}</b>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default OrderDetails;
