import { Rating } from "@material-ui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAlert } from "react-alert";
import { FaShoppingCart } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItemsToCart } from '../../actions/CartAction';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import '../Product/ProductDetails.css';
import ReviewCard from './ReviewCard';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item added to cart");
    };

    const submitReviewToggle = () => {
        setOpen(!open);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setOpen(false);
    };

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id));
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
    }, [dispatch, id, error, alert, reviewError, success]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    const options = {
      
        size:"large",
        value: product.ratings,
       readOnly:true,
       precision:0.5
    };

    return (
        <div className='app'>
            {product.images && product.images.map((image, index) => (
                <div className="details" key={index}>
                    <div className="big-img">
                        <img src={image.url} alt={`Product ${index}`} />
                    </div>
                    <div className="box">
                        <div className="row">
                            <h2>{product.name}</h2>
                            <p>{product._id}</p>
                            <span>{`₹${product.price}`}</span>
                            <div className="f1">
                                <ReactStars {...options} />
                            </div>
                            <span>({product.numOfReviews} Reviews)</span>
                        </div>
                        <p>Description: {product.description}</p>
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type="number" value={quantity} />
                        <button onClick={increaseQuantity}>+</button>
                        <button disabled={product.Stock < 1} className='cart' onClick={addToCartHandler}>
                            Add to cart <FaShoppingCart />
                        </button>
                        <p>
                            Status:{" "}
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                        <button onClick={submitReviewToggle} className='submitReviews'>
                            Submit Reviews
                        </button>
                    </div>
                </div>
            ))}
            <h3 className='reviewsHeading'>REVIEWS <MdRateReview /></h3>
            <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className='submitDialog'>
                    <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" />
                    <textarea
                        className='submitDialogTextArea'
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                    <Button onClick={reviewSubmitHandler}>Submit</Button>
                </DialogActions>
            </Dialog>
            <div className="k1">
                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {product.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                ) : (
                    <p className="noReviews">No reviews yet</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;