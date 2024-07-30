import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import "./Profile.css"

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    if (loading) {
        return <p>Loading...</p>; // Or any other loading indicator you prefer
    }

    if (!isAuthenticated) {
        return <p>You need to log in to view this page.</p>;
    }

    return (
        <div>
            <Fragment>
                <MetaData title={`${user.name}'s profile`} />
                <div className="profileContainer">
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt={user.name} />
                    <Link id="h4" to="/me/update">Edit Profile</Link>
                </div>
                <div className="uu1">
                    <h1 id='h6'> Your profile details</h1>
                    <div className='i2'>
                        
                        <h3>Full Name :-</h3>
                        <p id='i4'>{user.name}</p>
                    </div>
                    <div className='i3'>
                        <h3>Email :-</h3>
                        <p id='i5'>{user.email}</p>
                       
                    </div>
                    <div className='i3'>
                        <h3>Role :-</h3>
                        <p id='i5'>{user.role}</p>               
                    </div>
                    <div className='i1'>
                        <h3 className='h7'>All order details:-</h3>
                        <Link id="h1" to="/orders">My Orders</Link>
                        <h3 className='h7'>If you are change your password:-</h3>
                        <Link id="h2" to="/password/update">Change Password</Link>
                    </div>
                </div>
            </Fragment>
        </div>
    );
};

export default Profile;
