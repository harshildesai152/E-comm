import React, { Fragment } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { TbBorderLeftPlus } from "react-icons/tb";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import "./UserOptions.css";
import { useNavigate } from 'react-router-dom'; 
import { useAlert } from 'react-alert';
import {useDispatch,useSelector} from "react-redux"
import { logout as logoutAction } from '../../actions/userAction';



const UserOptions = ({user}) => {

  const {cartItems} =useSelector((state)=>state.cart); 

    const navigate = useNavigate(); 
    const alert=useAlert();
    const dispatch=useDispatch();
  const actions = [
    { icon: <TbBorderLeftPlus />, name: 'orders', func:orders},
    { icon: <RiAccountCircleFill />, name: 'account', func:account},
    { icon: <FaCartArrowDown  style={{color:cartItems.length>0 ? "green" : "unset"}} />, name: `cart(${cartItems.length})`, func:cart},
    { icon: <IoLogOutOutline />, name: 'logout', func:logout},
   
  ];
  if (user.role === "admin") {
    actions.unshift({ icon: <GrUserAdmin />, name: 'Dashboard Admin', func: dashboard });
}

function dashboard() {
    navigate("/admin/dashboard");
}

  function orders(){
    navigate("/orders")
  }

  function account(){
    navigate("/account")
  }
  
  function cart(){
    navigate("/cart")
  }

  function logout() {
    dispatch(logoutAction());
    navigate("/");
    alert.success("Logout successful");
  }
  return (
    <Fragment>
       
    <div className="user-options">
      <SpeedDial ariaLabel="navigation speed dial" className='speedDial' direction="down"  
       icon={
        <img  className='speedDialIcon'  alt="User Avatar"
        src={user.avatar.url ? user.avatar.url:"//Deadpool-834516798-large.jpg"}/>
       }
      >
        <SpeedDialIcon icon={<SpeedDialIcon /> } />
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
           
          />
        ))}
      </SpeedDial>
    </div>
    </Fragment>
  );
};

export default UserOptions;
