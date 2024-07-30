import { ADD_TO_CART, REMOVE_TO_CART,SAVE_SHIPPING_INFO } from "../constants/CaetConstants"

export const cartReducer = (state = { cartItems: [],shippingInfo:{} }, action) => {
     switch(action.type){
        case ADD_TO_CART:
             const item=action.payload;

             const isItemExist=state.cartItems.find(  //product is exist or not 
                (i)=>i.product===item.product    //cart in product and item product id is same or not
             )
             if(isItemExist){    //if item is alrady exist so you can quantity
                     return{
                        ...state,
                        cartItems:state.cartItems.map((i)=>    
                            i.product===isItemExist.product ? item:i
                        )
                     }
             }else{
                return{   //is cart is empty so add product in cart   //store.js 
                    ...state,
                    cartItems:[...state.cartItems,item],
                }
             }
        
             case REMOVE_TO_CART:
                return{
                    ...state,
                    cartItems:state.cartItems.filter((i)=>i.product !== action.payload)  //if you are remove product selcet so other product are alive and only remove product are remove
                }

            case SAVE_SHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:action.payload
                }

        default:
            return state;
     }
}