import React, { Fragment, useState, useEffect } from 'react';
import "./ForgotPasswordProfile.css";
import { CiMail } from "react-icons/ci";
import { FaUnlock } from "react-icons/fa";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { clearErrors,forgotPassword } from '../actions/userAction';
import { useAlert } from "react-alert";


const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    

    const { error, message, loading } = useSelector(state => state.forgotPassword);

    const [email, setEmail] = useState("");
    
    const forgotPasswordSubmit = (e) => {
    
        e.preventDefault();
        const myForm = new FormData();
  
        myForm.set("email", email);
   
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
   
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
    
        }
    }, [dispatch, error, alert, message]);


  return (
    <Fragment>
    <div className="updateProfileContainer">
              <div className="updateProfileBox">
                  <h2>forgot profile</h2>
              <form className='updateProfileForm'  onSubmit={forgotPasswordSubmit}>
                     
                      <div className="updateProfileEmail">
                          <FaUnlock />
                          <input type="email" placeholder='Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)}
/>
                      </div>
                     
                      <input type="submit" value="send" className='updateProfileBtn' />
                  </form>
              </div>
       </div>
 </Fragment>
  )
}

export default ForgotPassword
