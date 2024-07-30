import { Typography } from '@material-ui/core';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAdminProduct } from '../../actions/productAction.js';
import Sidebar from './Sidebar.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
      const dispatch = useDispatch()
   const {products} =useSelector((state)=>state.products)
  let outOfStock=0;

  products && products.forEach((item)=>{ 
    if(item.Stock===0){
      outOfStock +=1;
    }
  })

  
  useEffect(() => {
   
    dispatch(getAdminProduct());
}, [dispatch, alert]);


  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["red"],
        data: [2, 10],
      }
    ]
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["green", "red"],
        hoverBackgroundColor: ["pink", "blue"],
        data: [outOfStock, products.length-outOfStock],
      }
    ]
  };

  return (
    <>
      <div className='dashboard'>
        <Sidebar />

        <div className='dashboardContainer'>
          <Typography component="h1" id='y1'>Dashboard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹2000
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link id='t1' to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link id='t2' to="/admin/orders">
                <p>Orders</p>
                <p>4</p>
              </Link>
              <Link id='t3' to="/admin/users">
                <p>Users</p>
                <p>2</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
