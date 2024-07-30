import React, { Fragment } from 'react'
import "./Cart.css"
import { Link,useNavigate } from 'react-router-dom';
import CartItemCard from "./CartItemCard.js"
import {useSelector,useDispatch} from "react-redux";
import { addItemsToCart,removeItemsToCart } from '../../actions/CartAction.js';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
    const Dispatch=useDispatch();
    const {cartItems} =useSelector((state)=>state.cart);
    const navigate = useNavigate(); 

    const increaseQuantity=(id,quantity,stock)=>{
              const newQty=quantity+1;
              if(stock<=quantity){
                return;
              }
              Dispatch(addItemsToCart(id,newQty));
    }

    const decreaseQuantity=(id,quantity)=>{
        const newQty=quantity-1;
        if(1>=quantity){
          return;
        }
        Dispatch(addItemsToCart(id,newQty));
    }

    const deleteCartItems=(id)=>{
            Dispatch(removeItemsToCart(id))
    }
    const checkoutHandler=()=>{{
        navigate("/loginSignUp?redirect=shipping")
    }}
   
  return (
    <Fragment>
        {cartItems.length===0 ?(
            <div className="emptyCart">
           <MdOutlineRemoveShoppingCart/>
           <p> No product in your cart</p>
           <Link to='/products'>view products</Link>
            </div>

        ) :(
        
        
        <Fragment>
    <div className="cartPage">
        <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
        </div>

      {cartItems && cartItems.map((item)=>(
          <div className="cartContainer" key={item.product}>
          <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
          

       <div className="cartInput">
          <button onClick={()=>{decreaseQuantity(item.product,item.quantity)}}>-</button>
          <input type="number" readOnly value={item.quantity}/>
          <button onClick={()=>{increaseQuantity(item.product,item.quantity,item.stock)}}>+</button>
       </div>
       <p className="cartSubTotle">{`₹${item.price*item.quantity}`}</p>
      </div>
      ))}

        
        <div className="cartGroProfit">
            <div></div>
            <div className="cartGroProfitBox">
                <p>Total amount</p>
                <p id='a1'>{`₹${cartItems.reduce((acc,item)=>acc+item.quantity * item.price,0)}`}</p>

            <div></div>
         
            </div>
           
        </div>
        <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
            </div>
    </div>
  </Fragment>)}
    </Fragment>
  )
}

export default Cart
