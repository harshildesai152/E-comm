import axios from "axios";
import {
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS
} from "../constants/productConstants";



export const getProduct = (keyword = "", minPrice = 0, maxPrice = Infinity,category="") => async (dispatch) => {
  try {
    let link = `/api/v1/products?keyword=${keyword}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;
    const { data } = await axios.get(link);
    
    if(category){
        link=`/api/v1/products?keyword=${keyword}&price[gte]=${minPrice}&price[lte]=${maxPrice}&category=${category}`;
    }
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const getAdminProduct =()=>async(dispatch)=>{
  try{
    dispatch({type:ADMIN_PRODUCT_REQUEST});
    const { data } = await axios.get(`/api/v1/admin/products` );
    dispatch({
      type:ADMIN_PRODUCT_SUCCESS, 
      payload:data.products           //cccc
    })
  }
  catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }

}

export const getProductp = (keyword = "", minPrice = 0, maxPrice = Infinity,category="",ratings=0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    let link = `/api/v1/productsp?keyword=${keyword}&price[gte]=${minPrice}&price[lte]=${maxPrice}&ratings[gte]=${ratings}`;
   
    if(category){
        link=`/api/v1/productsp?keyword=${keyword}&price[gte]=${minPrice}&price[lte]=${maxPrice}&category=${category}&ratings[gte]=${ratings}`;
    }
    const { data } = await axios.get(link);
    
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    }); 
  }
};




export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/admin/product/new`,productData,config);

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/review`,reviewData,config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const updateProduct = (id,productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/admin/product/${id}`,productData,config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS, 
      payload: data.success ,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
