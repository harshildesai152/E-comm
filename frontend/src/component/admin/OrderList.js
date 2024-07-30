import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/OrderAction';
import { DELETE_ORDER_RESET } from '../../constants/OrderConstants';
import MetaData from '../layout/MetaData';
import "./ProductList.css";
import Sidebar from './Sidebar';

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders || {});
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteProductHandler = (id) => {
     dispatch(deleteOrder(id));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
     if (deleteError) {
    alert.error(deleteError);
       dispatch(clearErrors());
     }
     if (isDeleted) {
       alert.success("Order deleted successfully");
       navigate("/admin/orders");
       dispatch({ type: DELETE_ORDER_RESET });
     }
    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        { field: "status", headerName: "Status", minWidth: 150, flex: 0.5 ,cellClassName:(params)=>{return params.getValue(params.id,"status")==="Deivered" ? "greenColor" : "redColor"},},
        { field: "itemQty", headerName: "Item Qty", type: "number", minWidth: 150, flex: 0.3 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <RiEditLine />
            </Link>
            <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
              <RiDeleteBin6Line />
            </Button>
          </Fragment>
        );
      }
    }
  ];

  const rows = [];

  orders && orders.forEach((item, index) => {
    rows.push({
      id: item._id,
      itemQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS   - Admin`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id='productListHeading'>ALL ORDERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
}



export default OrderList;
