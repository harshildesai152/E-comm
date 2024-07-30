import React, { Fragment, useState, useEffect } from 'react';
import "./UpdatePassword.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserLock } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { FaUnlockAlt } from "react-icons/fa";
import { clearErrors, updatePassword} from '../../actions/userAction';
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';


const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

  
    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [oldPassword,setOldPassword ] = useState("");
    const [newPassword,setNewPassword ] = useState("");
    const [confirmPassword,setConfirmPassword ] = useState("");
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);
  
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
       
        dispatch(updatePassword(myForm));
    };


    useEffect(() => {
       
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile updated successfully");

            navigate('/account');
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, isUpdated]);


  return (
    <Fragment>
           <div className="b1">
     
     {c1 ? (
       <img src="/cloud-computing-security-abstract-concept-illustration.png" alt="" />   ) : (<p></p>)  }

{c2 ? (
       <img src="/cloud-storage-idea-online-computing-internet-database-backup-server-programming-equipment-limited-access-control-pass-privacy-settings-vector-isolated-concept-metaphor-illustration.png" alt="" />   ) : (<p></p>)  }
{c3 ? (
       <img src="/ecological-strategy-development-natural-resources-access-ecologists-cartoon-characters.png" alt="" />   ) : (<p></p>)  }

       
{!c1 && !c2 && !c3 && <img src="/flat-safer-internet-day-illustration.png" alt="Reset Password" />}

      <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className='shippingHeading'>Update password</h2>
                <form className='shippingForm' onSubmit={updatePasswordSubmit}>

                <div className={`inputContainer ${c1 ? 'focused' : ''}`}>
                            <RiLock2Fill />
                            <input type="password" placeholder='old password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}  
                            onFocus={() => setC1(true)} 
                            onBlur={() => setC1(false)} />
                        </div>

                        <div className={`inputContainer ${c2 ? 'focused' : ''}`}>
                            <FaUnlockAlt />
                            <input type="password" placeholder='new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                             onFocus={() => setC2(true)} 
                             onBlur={() => setC2(false)}
                            />
                        </div>

                        <div className={`inputContainer ${c3 ? 'focused' : ''}`}>
                            <FaUserLock />
                            <input type="password" placeholder='confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                             onFocus={() => setC3(true)} 
                             onBlur={() => setC3(false)}
                            />
                        </div>

                        <input type="submit" value="Change" className='shippingBtn' />
                    </form>
                </div>
         </div>
         </div>
   </Fragment>
  )
}

export default UpdatePassword
