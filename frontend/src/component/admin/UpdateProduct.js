import { Button } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { SiCkeditor4 } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import MetaData from '../layout/MetaData';
import "./NewProduct.css";
import Sidebar from './Sidebar';

const UpdateProduct = () => {
    const { id } = useParams(); // Get the id from the route params
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, product } = useSelector((state) => state.getProductDetails || {});
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product || {});

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [x1, setX1] = useState(false);
    const [x2, setX2] = useState(false);
    const [x3, setX3] = useState(false);
    const [x4, setX4] = useState(false);
    const [x5, setX5] = useState(false);
    const [x6, setX6] = useState(false);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhone"
    ];

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            if (product) {
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category);
                setStock(product.Stock);
                setOldImages(product.images);
            }
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Product updated Successfully");
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, alert, navigate, isUpdated, error, id, product, updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(id, myForm));
    };

    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Update Product" />
            <Sidebar />
            <div className="dashboard1">
                {x1 ? (
                    <img className="gg1" src="/people-buying-online.png" alt="" />
                ) : (
                    <p></p>
                )}
                {x2 ? (
                    <img className="gg1" src="/mtop.png" alt="" />
                ) : (
                    <p></p>
                )}
                {x3 ? (
                    <img className="gg1" src="/online-shopping-concept.png" alt="" />
                ) : (
                    <p></p>
                )}
                {x4 ? (
                    <img className="gg1" src="/usert.png" alt="" />
                ) : (
                    <p></p>
                )}
                {x5 ? (
                    <img className="gg1" src="/professionals-analyzing-charts-computer-monitor.png" alt="" />
                ) : (
                    <p></p>
                )}
                {x6 ? (
                    <img className="gg1" src="/uploading-concept-illustration.png" alt="" />
                ) : (
                    <p></p>
                )}
                {!x1 && !x2 && !x3 && !x4 && !x5 && !x6 && (
                    <img className="gg1" src="/soft.png" alt="" />
                )}

                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>

                        <div className={`inputContainer ${x1 ? "focused" : ""}`}>
                            <SiCkeditor4 />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => setX1(true)}
                                onBlur={() => setX1(false)}
                            />
                        </div>

                        <div className={`inputContainer ${x2 ? "focused" : ""}`}>
                            <SiCkeditor4 />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                onFocus={() => setX2(true)}
                                onBlur={() => setX2(false)}
                            />
                        </div>

                        <div className={`inputContainer ${x3 ? "focused" : ""}`}>
                            <SiCkeditor4 />
                            <textarea
                                cols="30"
                                rows="1"
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onFocus={() => setX3(true)}
                                onBlur={() => setX3(false)}
                            ></textarea>
                        </div>

                        <div className={`inputContainer ${x4 ? "focused" : ""}`}>
                            <SiCkeditor4 />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                onFocus={() => setX4(true)}
                                onBlur={() => setX4(false)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={`inputContainer ${x5 ? "focused" : ""}`}>
                            <SiCkeditor4 />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                value={Stock}
                                onChange={(e) => setStock(e.target.value)}
                                onFocus={() => setX5(true)}
                                onBlur={() => setX5(false)}
                            />
                        </div>

                        <div className={`inputContainer ${x6 ? "focused" : ""}`}>
                            <input
                                type="file"
                                multiple
                                onChange={createProductImageChange}
                                name="avatar"
                                accept="image/*"
                                onFocus={() => setX6(true)}
                                onBlur={() => setX6(false)}
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img src={image.url} key={index} alt="Old Avatar Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img src={image} key={index} alt="Avatar Preview" />
                            ))}
                        </div>

                        <Button id="createProductBtn" type="submit" disabled={loading ? true : false}>
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;
