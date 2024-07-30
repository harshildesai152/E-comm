import React, { useRef, useState, useEffect } from 'react';
import "./LoginSignUp.css";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { CiMail } from "react-icons/ci";
import { FaUnlock } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { login,register, clearErrors } from '../../actions/userAction';
import { useAlert } from "react-alert";

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate(); // Using the useNavigate hook
    const location = useLocation(); 

    const { error, loading, isAuthenticated } = useSelector(state => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };
      

    const redirect=location.search ? location.search.split("=")[1] : "/account"    //cart.js =>if you are checkOut button click so render "/loginSignUp?redirect=shipping" if your link is = is not so redirect account if = alive so redirectby part = split right side shipping are call so link is "/loginSignUp/shipping"
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, navigate, alert, isAuthenticated,redirect]);

    const switcherTabs = (tab) => {
        if (tab === "login") {
            loginTab.current.classList.add("active");
            registerTab.current.classList.remove("active");
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
        } else {
            registerTab.current.classList.add("active");
            loginTab.current.classList.remove("active");
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
        }
    };

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Deadpool-834516798-large.jpg");

    const { name, email, password } = user;

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();    //myForm=>userData passed
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
       dispatch( register(myForm))
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {     //reader 3 state:0=innisai  ,1=prosessing, 2=done
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);   //file add
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <div>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p onClick={() => switcherTabs("login")}>LOGIN</p>
                            <p onClick={() => switcherTabs("register")}>REGISTER</p>
                        </div>
                        <button id='mm1' ref={switcherTab}></button>
                    </div>
                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            <CiMail />
                            <input type="email" placeholder='Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                        </div>

                        <div className='loginePassword'>
                            <FaUnlock />
                            <input type="password" placeholder='Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <Link to="password/forgot">Forgot Password</Link>
                        <input type="submit" value="Login" className='LoginBtn' />
                    </form>

                    <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
                        <div className='sigmUpName'>
                            <CiMail />
                            <input type="text" placeholder='Name' name="name" required value={name} onChange={registerDataChange} />
                        </div>
                        <div className="signUpEmail">
                            <FaUnlock />
                            <input type="email" placeholder='Email' name="email" value={email} onChange={registerDataChange} />
                        </div>
                        <div className="signUpPassword">
                            <FaUnlock />
                            <input type="password" placeholder='Password' name="password" value={password} onChange={registerDataChange} />
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt='Avatar Preview' />
                            <input type="file" name='avatar' accept='image/*' onChange={registerDataChange} />
                        </div>
                        <input type="submit" value="Register" className='signUpBtn' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUp;
