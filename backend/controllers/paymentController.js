const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.processPayment = async (req, res, next) => {
    try {
      const { amount } = req.body;
  
      if (!amount) {
        return res.status(400).json({ message: 'Missing required param: amount.' });
      }
  
      const myPayment = await stripe.paymentIntents.create({
      //  
        amount,
        currency: "inr",
        metadata: {
          company: "Ecom",
        }   
      });
  
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  exports.sendStripeApiKey = async (req, res, next) => {
    res.status(200).json({
      success: true,
      stripeApiKey: process.env.STRIPE_API_KEY,
    });
  }