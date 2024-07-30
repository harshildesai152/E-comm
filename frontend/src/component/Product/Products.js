import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductp } from "../../actions/productAction";
import Product from "../Home/Product";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomPrevArrow, CustomNextArrow } from "./CustomArrows";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhone"
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { loading, products, error } = useSelector((state) => state.products);

  const [price, setPrice] = useState({ min: 0, max: Infinity });
  const [ratings, setRatings] = useState(0);
  const [category, setCategory] = useState("");

  const priceHandler = (event) => {
    const selectedPrice = event.target.value;
    let minPrice = 0;
    let maxPrice = Infinity;

    switch (selectedPrice) {
      case "0-1000":
        maxPrice = 1000;
        break;
      case "1000-3000":
        minPrice = 1000;
        maxPrice = 3000;
        break;
      case "15000-20000":
        minPrice = 15000;
        maxPrice = 20000;
        break;
      case "20000-50000":
        minPrice = 20000;
        maxPrice = 50000;
        break;
      case "50000-200000":
        minPrice = 50000;
        maxPrice = 200000;
        break;
      default:
        break;
    }

    setPrice({ min: minPrice, max: maxPrice });
  };

  const ratingHandler = (event) => {
    setRatings(event.target.value);
  };

  useEffect(() => {
    dispatch(getProductp(keyword, price.min, price.max, category, ratings));
  }, [dispatch, keyword, price, category, ratings]);

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading...</p>;

  const filteredProducts = products
    ? keyword
      ? products.filter((product) =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        )
      : products
    : [];

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const firstSliderProducts = filteredProducts.slice(0, 8);
  const secondSliderProducts = filteredProducts.slice(8, 30);

  
  return (
    <>
      <div>
        <h2 className="productsHeading">Products</h2>
      </div>

      <div className="ml">
        <h2>Price</h2>

        <label>
          <input
            onChange={priceHandler}
            type="radio"
            value=""
            name="priceFilter"
            checked={price.min === 0 && price.max === Infinity}
          />
          <span>All</span>
        </label>
        <label>
          <input
            onChange={priceHandler}
            type="radio"
            value="0-1000"
            name="priceFilter"
            checked={price.min === 0 && price.max === 1000}
          />
          <span>0-1000</span>
        </label>
        <label>
          <input
            onChange={priceHandler}
            type="radio"
            value="1000-3000"
            name="priceFilter"
            checked={price.min === 1000 && price.max === 3000}
          />
          <span>1000-3000</span>
        </label>
        <label>
          <input
            onChange={priceHandler}
            type="radio"
            value="15000-20000"
            name="priceFilter"
            checked={price.min === 15000 && price.max === 20000}
          />
          <span>15000-20000</span>
        </label>
        <label>
          <input
            onChange={priceHandler}
            type="radio"
            value="20000-50000"
            name="priceFilter"
            checked={price.min === 20000 && price.max === 50000}
          />
          <span>20000-50000</span>
        </label>
        <label>
          <input
            onChange={priceHandler}
            type="radio"
            value="50000-200000"
            name="priceFilter"
            checked={price.min === 50000 && price.max === 200000}
          />
          <span>50000-200000</span>
        </label>

        <h2>Categories</h2>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        <h2>Rating</h2>
       
          <select className="ratingFilter" onChange={ratingHandler}>
            <option  value="0">All</option>
            <option  value="0">0 & up</option>
            <option  value="1">1 & Up</option>
            <option value="2">2 & Up</option>
            <option  value="3">3 & Up</option>
            <option  value="4">4 & Up</option>
            <option  value="5">5</option>
          </select>
        
      </div>
      {/* first sider */}
      <div className="products-carousel">
        {firstSliderProducts.length > 2 ? (
          <Slider {...settings}>
            {firstSliderProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </Slider>
      
        ) : (
          firstSliderProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
         
         {/* second slider */}
          {secondSliderProducts.length > 2 ? (
          <Slider {...settings}>
            {secondSliderProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </Slider>
      
        ) : (
          secondSliderProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default Products;
