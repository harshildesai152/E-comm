import React from 'react';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import { FaAppStoreIos } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaInstagramSquare } from "react-icons/fa";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6"
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer"
    >
      <div className="leftFooter">
         <h4>Download our app</h4>
         <p>Download app for Android and Play Store</p>
         <a className='a1'>
         <Link  to="#"><IoLogoGooglePlaystore/></Link>
         </a>
         <a className='a1'>
         <Link  to="#"><FaAppStoreIos/></Link>
         </a>
      </div> 

      <div className="midFooter">
        <h1 className='c1'>ECOMMERCE WEBSITE</h1>
        <p>high qulite is our first pripority</p>
      </div>

      <div className="rightFooter">
        <h4>Follow us</h4>
        <p>More details you can show in my social media headers</p>
        <a className='a1'>
        <Link to="#"><FaWhatsapp/></Link>
        </a>
        <a className='a1'>
        <Link to="#"><FaInstagramSquare/></Link>
        </a>
        <a className='a1'>
        <Link to="#"><RiFacebookCircleFill/></Link>   
        </a>
      </div>
    </footer>
  );
};

export default Footer;
