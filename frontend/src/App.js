import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { loadUser } from './actions/userAction.js';
import Cart from "./component/Cart/Cart.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import Shipping from './component/Cart/Shipping.js';
import Footer from './component/Footer/Footer';
import ForgotPassword from './component/ForgotPassword.js';
import Homei from './component/Home/Homei';
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import ProductDetails from './component/Product/ProductDetails//.';
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import ResetPassword from './component/ResetPassword.js';
import LoginSignUp from './component/User/LoginSignUp.js';
import Profile from "./component/User/Profile.js";
import UpdatePassword from './component/User/UpdatePassword.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import Header from "./component/layout/Header";
import UserOptions from "./component/layout/UserOptions.js";
import store from "./store";

import axios from 'axios';

import StripeWrapper from './component/StripeWrapper.js';
import NewProduct from './component/admin/NewProduct.js';
import OrderList from './component/admin/OrderList.js';
import ProcessOrder from './component/admin/ProcessOrder.js';

const App = () => {
const {isAuthenticated,user}=useSelector((state)=>state.user);


const [stripeApiKey,setStripeApiKey]=React.useState("");

async function getStripeApiKey(){
const {data}=await axios.get("/api/v1/StripeApiKey");
setStripeApiKey(data.stripeApiKey)
}

useEffect(()=>{
store.dispatch(loadUser()); //if you are loding website so your data are permanently store in redux store

getStripeApiKey();
},[])
return (
<Router>
<Header />
{isAuthenticated && <UserOptions user={user}/>} {/*isAuthenticated=login besaly isAuthenticated creact by backend */}
<Routes>

<Route path="/" element={<Homei />} />
<Route path="/product/:id" element={<ProductDetails />} />
<Route path="/products" element={<Products />} />
<Route path="/search" element={<Search />} />
<Route path="/products/:keyword" element={<Products />} />
<Route path="/LoginSignUp" element={<LoginSignUp/>} />
<Route path="/account" element={<Profile/>} />
<Route path="/me/update" element={<UpdateProfile/>} />
<Route path="/password/update" element={<UpdatePassword/>} />
<Route path="/LoginSignUp/password/forgot" element={<ForgotPassword/>} />
<Route path="/LoginSignUp/password/reset/:token" element={<ResetPassword/>} />
<Route path="/cart" element={<Cart/>} />
<Route path="/LoginSignUp/shipping" element={<Shipping/>} />
<Route path="/order/confirm" element={<ConfirmOrder/>} />
<Route path="/success" element={<OrderSuccess />} /> 
<Route path="/orders" element={<MyOrders />} /> 
<Route path="/order/:id" element={<OrderDetails />} /> 
<Route path="/admin/dashboard" element={user && user.role === "admin" ? <Dashboard /> : <Homei />} />
<Route path="/admin/products" element={user && user.role === "admin" ? <ProductList /> : <Homei />} />
<Route path="/admin/product" element={user && user.role === "admin" ? <NewProduct /> : <Homei />} />
<Route path="/admin/product/:id" element={user && user.role === "admin" ? <UpdateProduct/>  : <Homei />} />
<Route path="/admin/orders" element={user && user.role === "admin" ? <OrderList/>  : <Homei />} />
<Route path="/admin/order/:id" element={user && user.role === "admin" ? <ProcessOrder/>  : <Homei />} />


 <Route path="/process/payment" element={<StripeWrapper />} />


{/* 
{stripeApiKey && <Route path="/payment"   element={<StripeWrapper />} />} */}

</Routes>
<Footer />
</Router>
);
}

export default App;
