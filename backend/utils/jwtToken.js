const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    
    
    const expirationDate = new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000);

    // Options for cookie
    const options = {
        expires: expirationDate, // Set the correct expiration date
        httpOnly: true,
    };

    // Set the cookie in the response
    res.status(statusCode).cookie('token', token, options).json({  //'token':- name ,token:- jwtTOKEN passed    
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;
