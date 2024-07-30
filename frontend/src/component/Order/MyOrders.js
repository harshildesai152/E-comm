import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/OrderAction';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData';
import { TbListDetails } from "react-icons/tb";
import "./MyOrders.css"

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    // const { user } = useSelector((state) => state.user);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        { field: "status", headerName: "Status", minWidth: 150, flex: 0.5 ,cellClassName:(params)=>{return params.getValue(params.id,"status")==="Deivered" ? "greenColor" : "redColor"},},
        { field: "itemQty", headerName: "Item Qty", type: "number", minWidth: 150, flex: 0.3 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id,"id")}`}>
                        <TbListDetails />
                    </Link>
                );
            }
        }
    ];

    const rows = [];

    orders && orders.forEach((item, index) => {
        rows.push({
            itemQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        });
    });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {/* <MetaData title={`${user.name} - Orders`} /> */}

            <div className="myOrderPage">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='myOrderTable'
                    autoHeight
                />

                {/* <Typography id="myHeading">{user.name} - Orders</Typography> */}
            </div>
        </Fragment>
    );
};

export default MyOrders;
