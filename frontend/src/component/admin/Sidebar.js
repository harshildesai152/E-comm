import React from 'react'
import "./Sidebar.css"
import { FaUserCog } from "react-icons/fa";
import { BiChevronDownCircle } from "react-icons/bi";
import { BiChevronUpCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { TreeView,TreeItem } from '@material-ui/lab';
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";
import { BsBuildingAdd } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";


const Sidebar = () => {
  return (
    <div  className='sidebar1'>
  <Link to="/">
    <img src="/online-sale_12457402.png" alt="go" />
  </Link>

  <Link to="/admin/dashboard">
   <p><FaUserCog/>Dashboard</p>
  </Link>

  <div className='sidebar2'>
  <Link to="">
 <TreeView defaultCollapseIcon={<BiChevronUpCircle/>}
  defaultExpandIcon={<BiChevronDownCircle/>}
 >
    <TreeItem nodeId='1' label="products">


        <Link  to="/admin/products">
        <TreeItem nodeId='2' label="All" icon={<BsBuildingAdd/>}/>
        </Link>

        <Link  to="/admin/product">
        <TreeItem nodeId='3' label="Create" icon={<RiAddFill/>}/>
        </Link>


    </TreeItem>
 </TreeView>
  </Link>

  </div>

  <Link to="/admin/orders"><p>
       <FcViewDetails/>
       Orders
    </p> </Link>

    <Link to="/admin/orders"><p>
       <FaUserFriends/>
       Users
    </p> </Link>

    <Link to="/admin/reviews"><p>
       <MdOutlineRateReview/>
       Reviews
    </p> </Link>
    </div>
  )
}

export default Sidebar
