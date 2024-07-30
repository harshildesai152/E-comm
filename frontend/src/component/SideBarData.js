import React from "react";
import { IconName } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { GrAppsRounded } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import { MdMobileScreenShare } from "react-icons/md";
import Products from "./Product/Products"
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";



const sidebarData = [               //Header.js
    {
      title: 'Home',
      path: '/',
      icon: <IoHomeSharp />,
      cName: 'nav-text'
    },
    // {
    //     title: 'user',
    //     path: '/user',
    //     icon: <FaRegUserCircle />,
    //     cName: 'nav-text'
    //   },
      {
        title: 'Products',
         path: '/Products',
        icon: <GrAppsRounded />
        ,
        cName: 'nav-text'
      },
      {
        title: 'search',
        path: '/search',
        icon: <FaSearch />,
        cName: 'nav-text'
      },
      {
        title: 'LoginSignUp',
        path: '/LoginSignUp',
        icon: <IoLogIn />,
        cName: 'nav-text'
      },  
      {
        title: 'cart',
        path: '/cart',
        icon: <FaCartArrowDown />,
        cName: 'nav-text'
      }
  ];

export default sidebarData
