import { ADD_TO_CART, REMOVE_TO_CART,SAVE_SHIPPING_INFO } from "../constants/CaetConstants"
import axios from "axios"



export const addItemsToCart = (id, quantity) => async (dispatch,getState) => {
  
      
        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({ type: ADD_TO_CART, payload: {
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.Stock,
            quantity

        } });

        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));  //if i reload page data are not remove in cart but data are store in redux store name by:cartItems
    }

    export const removeItemsToCart = (id) => async (dispatch,getState) => {
            dispatch({
                type:REMOVE_TO_CART,
                payload:id,

            })
            localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems)); 
    }

    
    export const saveShippingInfo = (data) => async (dispatch) => {
        dispatch({
            type:SAVE_SHIPPING_INFO,
            payload:data,

        })
        localStorage.setItem("shippingInfo",JSON.stringify(data)); 
}
