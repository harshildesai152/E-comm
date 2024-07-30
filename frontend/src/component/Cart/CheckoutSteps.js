import { Step, StepLabel, Typography, Stepper } from '@mui/material'
import React, { Fragment } from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";
import "./CheckoutSteps.css"
import { PiVideoConferenceThin } from "react-icons/pi";
import { BsBank2 } from "react-icons/bs";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LiaShippingFastSolid />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <PiVideoConferenceThin />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <BsBank2 />
        }
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };

    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step key={index}  active={activeStep===index  ? true :false} //active steps or index are same so true other vies false
                completed={activeStep>=index ? true :false}>
                        <StepLabel style={{color:activeStep >=index ? "blue" : "black" }} icon={item.icon}>
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
}

export default CheckoutSteps;
