import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from "react-alert";
import { CiMail } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import "./UpdateProfile.css";


const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);
    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Deadpool-834516798-large.jpg");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [x1, setX1] = useState("");
    const [x2, setX2] = useState("");
    const [x3, setX3] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar ? user.avatar.url : "/Deadpool-834516798-large.jpg");

        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile updated successfully");
            dispatch(loadUser());
            navigate('/account');
            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
   <Fragment>
     <div className="b1">
     
     {x1 ? (
       <img src="/privacy-policy-concept-illustration.png" alt="" />   ) : (<p></p>)  }

     
{x2 ? (
       <img src="/email-campaign-concept-illustration.png" alt="" />   ) : (<p></p>)  }

{x3 ? (
       <img src="/uploading-concept-illustration.png" alt="" />   ) : (<p></p>)  }

{!x1 && !x2 && !x3 &&(
               <img src="/web-developer-working-company-website-tiny-people.png" alt="" />
                )}

      <div className="shippingContainer">
                <div className="shippingBox">
                    <h2>Update profile</h2>
                <form className='shippingForm'  onSubmit={updateProfileSubmit}>
                <div className={`inputContainer ${x1 ? 'focused' : ''}`}>
                            <FaUser />
                            <input type="text" placeholder='Name' name="name" required value={name} onChange={(e) => setName(e.target.value)}
                              onFocus={() => setX1(true)} 
                              onBlur={() => setX1(false)} />

                        </div>
                        <div className={`inputContainer ${x2 ? 'focused' : ''}`}>
                            <CiMail />
                            <input type="email" placeholder='Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                              onFocus={() => setX2(true)} 
                              onBlur={() => setX2(false)}
                             />
                        </div>
                        <div className={`inputContainer ${x3 ? 'focused' : ''}`}>
                        <img src={avatarPreview} alt='Avatar Preview' />
                            <input type="file" name='avatar' accept='image/*' onChange={updateProfileDataChange}  
                             onFocus={() => setX3(true)} 
                              onBlur={() => setX3(false)}
                              />
                        </div>
                        <input type="submit" value="Update" className='shippingBtn' />
                    </form>
                </div>
         </div>
         </div>
   </Fragment>
  )
}

export default UpdateProfile
