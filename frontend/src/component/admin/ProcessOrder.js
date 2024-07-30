import { Button } from '@material-ui/core';
import { Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { SiCkeditor4 } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/OrderAction';
import { UPDATE_ORDER_RESET } from '../../constants/OrderConstants';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const ProcessOrder = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    const UpdateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(id, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
            navigate("/admin/orders");
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, error, alert, id, isUpdated, updateError, navigate]);

    return (
        <Fragment>
            <MetaData title="Process Order" />
            <Sidebar />
            <div className="ConfirmOrder">
                <div>
                    <div className="ConfirmShipping">
                        <Typography className='ll1'>Shipping Info:</Typography>
                        <div className="shippingBox1">
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
                        </div>
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
                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p className={order && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                {order && order.orderStatus}
                            </p>
                        </div>
                    </div>
                    <div className="confirmCart">
                        <Typography>Your Cart Items:</Typography>
                    </div>
                    <div className="confirmcartitem">
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
                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={UpdateOrderSubmitHandler}
                >
                    <h1>Process Order</h1>
                    <div className="inputContainer">
                        <SiCkeditor4 />
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Choose Status</option>
                            {order && order.orderStatus === "Processing" && (<option value="Shipped">Shipped</option>)}
                            {order && order.orderStatus === "Shipped" && (<option value="Delivered">Delivered</option>)}
                        </select>
                    </div>
                    <Button id="createProductBtn" type="submit" disabled={loading ? true : false || status === "" ? true : false}>
                        Update
                    </Button>
                </form>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;
