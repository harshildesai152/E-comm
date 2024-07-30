import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from "../../actions/productAction.js";
import MetaData from '../layout/MetaData.js';
import './Homei.css';
import Product from "./Product.js";

const Homei = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error]);

    const specificCategories = ["Laptop", "SmartPhone"]; 

    return (
        <>
            <MetaData title={"ECOMMERCE"} />
            <div className="banner">
                <img className='as1' src="/27Z_2105.w023.n001.498B.p1.498.jpg" alt="" />
                <p className='f11'>Welcome to Ecommerce</p>
                <h1 className='w1'>Find the product</h1>
                <a href="#container" ><button>scroll</button></a>
            </div>
            <h2 className='homeh'>Featured products</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container" id="container">
                    {products && products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}

            <h2 className='homeh'>Products in {specificCategories.join(", ")}</h2>
            <div className="container" id="specific-category-container">
                {products && products
                    .filter(product => specificCategories.includes(product.category))
                    .map(product => (
                        <Product key={product._id} product={product} />
                    ))}
            </div>
        </>
    );
};

export default Homei;
