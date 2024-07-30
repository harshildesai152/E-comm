import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk as thunkMiddleware } from "redux-thunk";
import { cartReducer } from "./reducers/CartReducers";
import { NEWOrderReducer, OrderReducer, allOrdersReducer, myOrdersReducer, orderDetailsReducer } from "./reducers/OrderReducers";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";




 const reducer = combineReducers({
    // product:productsReducer,
    product:productReducer,
   productDetails:productDetailsReducer,
   user:userReducer,
   profile:profileReducer,
   forgotPassword:forgotPasswordReducer,
   cart:cartReducer,
   newOrder:NEWOrderReducer,
   myOrders:myOrdersReducer,
   orderDetails:orderDetailsReducer,
   newReview:newReviewReducer,
   newProduct:newProductReducer,
   products:productsReducer,
   allOrders:allOrdersReducer,
   order:OrderReducer,
   //product:productReducer,
  
 });

const initialState = {    //cartReducers.js
   cart:{
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) :[],
    shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) :{},
   }
};

const middleware = [thunkMiddleware];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

//createStore: This function creates the Redux store, which holds the complete state tree of the app.

// combineReducers: This utility helps combine multiple reducers into a single reducing function that can be passed to createStore.

//redux-thunk: Thunk middleware allows you to write action creators that return a function instead of an action. This is useful for handling asynchronous actions.

//productReducer: This is a reducer function (imported from another file) that manages the state slice related to products.


// const reducer = combineReducers({
//   // product:productsReducer,
//   productDetails:productDetailsReducer,
//   user:userReducer,
//   profile:profileReducer,
//   forgotPassword:forgotPasswordReducer,
//   cart:cartReducer,
//   newOrder:NEWOrderReducer,
//   myOrders:myOrdersReducer,
//   orderDetails:orderDetailsReducer,
//   newReview:newReviewReducer,
//   newProduct:newProductReducer,
//   products:productsReducer,
//   product:productReducer,
  
// });