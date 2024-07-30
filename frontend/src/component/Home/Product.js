// Product.js
import { Rating } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";
import "./Homei.css";

const Product = ({ product }) => {
  const option = {
    //for rating

    value: product.ratings,

    size: "large",

    readOnly: true,
    precision: 0.5,
  };

  return (
    <div>
      <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <Rating className="e11" {...option} />
          <span>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </div>
  );
};

export default Product;
