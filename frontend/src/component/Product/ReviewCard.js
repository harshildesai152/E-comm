import React from 'react'
import ReactStars from "react-rating-stars-component"
import profilePng from "../../images/profilePng"

const ReviewCard = ({review}) => {

    const option = {       //for rating 
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
    };


  return (
    
    <div className='ReviewCard'>
        <img src={profilePng} alt="user" />
        <p>{review.name}</p>
        <ReactStars {...option}/>
        <span>{review.comment}</span>
       
    </div>
  )
}

export default ReviewCard
