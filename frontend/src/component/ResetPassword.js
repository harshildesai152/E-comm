import React, { Fragment, useState, useEffect } from 'react';
import "./ResetPassword.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUnlock } from "react-icons/fa";
import { clearErrors, resetPassword } from '../actions/userAction';
import { useAlert } from "react-alert";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { token } = useParams();

    const { error, success, loading } = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const passwords = { password, confirmPassword };
        dispatch(resetPassword(token, passwords));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password updated successfully");
            navigate('/LoginSignUp');
        }
    }, [dispatch, error, alert, navigate, success]);

    return (
        <Fragment>
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                    <h2>Update Password</h2>
                    <form className='updateProfileForm' onSubmit={resetPasswordSubmit}>
                        <div className='loginePassword'>
                            <FaUnlock />
                            <input 
                                type="password" 
                                placeholder='New Password' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className='loginePassword'>
                            <FaUnlock />
                            <input 
                                type="password" 
                                placeholder='Confirm Password' 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <input type="submit" value="Change" className='updateProfileBtn' />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default ResetPassword;
