import React, { Fragment, useState } from 'react';
import './Shipping.css';
import { saveShippingInfo } from '../../actions/CartAction';
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from 'react-redux';
import { CiMail } from "react-icons/ci";
import { useAlert } from 'react-alert';
import { FaRegAddressCard } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { TbMapPinCode } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import {useNavigate } from 'react-router-dom';

const Shipping = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address || '');
    const [city, setCity] = useState(shippingInfo.city || '');
    const [state, setState] = useState(shippingInfo.state || '');
    const [country, setCountry] = useState(shippingInfo.country || '');
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode || '');
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || '');
    const [isAddressFocused, setIsAddressFocused] = useState(false);

    const [ist, setIst] = useState(false);
    const [ist1, setIst1] = useState(false);
    const [ist2, setIst2] = useState(false);
    const [isCountryFocused, setIsCountryFocused] = useState(false);
    const [isCountryFocused1, setIsCountryFocused1] = useState(false);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length !== 10) {
            alert.error("Phone number should be 10 digits");
            return;
        }

        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <CheckoutSteps activeStep={0} />
            <div className="b1">

                {isAddressFocused ? (
                    <img src="/current-location-concept-illustration.png" alt="" />
                ) : (<p></p>)}

                {ist ? (
                    <img src="/city-skyline-black.png" alt="" />
                ) : (<p></p>)}

                {ist1 ? (
                    <img src="/address-concept-illustration.png" alt="" />
                ) : (<p></p>)}

                {ist2 ? (
                    <img src="/multi-device-targeting-concept-illustration.png" alt="" />
                ) : (<p></p>)}

                {isCountryFocused ? (
                    <img src="/online-world-concept-illustration.png" alt="" />
                ) : (<p></p>)}

                {isCountryFocused1 ? (
                    <img src="/directions-concept-illustration.png" alt="" />
                ) : (<p></p>)}

                {!isAddressFocused && !ist && !ist1 && !ist2 && !isCountryFocused && !isCountryFocused1 && (
                    <img src="/installment-purchase-offer-shopping-business-convenient-customer-service.png" alt="" />
                )}

                <div className="shippingContainer">
                    <div className="shippingBox">
                        <h2 className='shippingHeading'>Shipping Details</h2>

                        <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>
                            <div className={`inputContainer ${isAddressFocused ? 'focused' : ''}`}>
                                <FaRegAddressCard className="icon" />
                                <input
                                    type="text"
                                    placeholder='Address'
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    onFocus={() => setIsAddressFocused(true)}
                                    onBlur={() => setIsAddressFocused(false)}
                                />
                            </div>

                            <div className={`inputContainer ${ist ? 'focused' : ''}`}>
                                <FaCity />
                                <input
                                    type="text"
                                    placeholder='City'
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    onFocus={() => setIst(true)}
                                    onBlur={() => setIst(false)}
                                />
                            </div>

                            <div className={`inputContainer ${ist1 ? 'focused' : ''}`}>
                                <TbMapPinCode />
                                <input
                                    type="number"
                                    placeholder='Pin Code'
                                    required
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                    onFocus={() => setIst1(true)}
                                    onBlur={() => setIst1(false)}
                                />
                            </div>

                            <div className={`inputContainer ${ist2 ? 'focused' : ''}`}>
                                <FaPhoneAlt />
                                <input
                                    type="number"
                                    placeholder='Phone Number'
                                    required
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    onFocus={() => setIst2(true)}
                                    onBlur={() => setIst2(false)}
                                />
                            </div>

                            <div className={`inputContainer ${isCountryFocused ? 'focused' : ''}`}>
                                <FaEarthAmericas />
                                <select
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    onFocus={() => setIsCountryFocused(true)}
                                    onBlur={() => setIsCountryFocused(false)}
                                >
                                    <option value="">Country</option>
                                    {Country && Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            {country && (
                                <div className={`inputContainer ${isCountryFocused1 ? 'focused' : ''}`}>
                                    <MdOutlineRealEstateAgent />
                                    <select
                                        required
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        onFocus={() => setIsCountryFocused1(true)}
                                        onBlur={() => setIsCountryFocused1(false)}
                                    >
                                        <option value="">State</option>
                                        {State && State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <input
                                type="submit"
                                value="Continue"
                                className='shippingBtn'
                                disabled={!state}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping;
