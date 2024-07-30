import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { IconName } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";  
import sidebarData from '../SideBarData//.';
import { IconContext } from "react-icons/lib";

const Header = () => {
  const [sideBar,setSideBar]=useState(false);

  const showSideBar=()=>{
    setSideBar(!sideBar)
  }
  return (
    <>
    <IconContext.Provider value={{color:'red'}}>                       
    <div className='navbar'>
    <Link to="#" className="menu-bars">
            <FaBars onClick={showSideBar}/>
    </Link>
         
    </div>

    <nav className={sideBar ?'nav-menu active':'nav-menu'}>    {/* if i click button show 'nav-menu active' and if i click clocse button so 'nav-menu' is close */}
      <ul className='nav-menu-items' onClick={showSideBar}>
        <li className="navbar-toggle">
          <Link to="#" className="menu-bars">
            <IoMdCloseCircleOutline/>
          </Link>
        </li>
        {sidebarData.map((item,index)=>{
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav> 
    </IconContext.Provider>
    </>
  )
}

export default Header
