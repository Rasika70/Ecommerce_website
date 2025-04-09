const catchAsyncError = require('../middlewares/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');

exports.processPayment  = catchAsyncError(async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment"},
        shipping: req.body.shipping
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

exports.sendStripeApi  = catchAsyncError(async(req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
});



exports.createQrCodeIntent = catchAsyncError(async (req, res, next) => {
    try {
      const { amount, shipping } = req.body || {};
  
      if (!amount || !shipping) {
        return res.status(400).json({
          success: false,
          message: 'Invalid request payload. Amount and shipping are required.',
        });
      }
  
      console.log('Request Body:', req.body);
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr", // Change this based on your currency
        description: "QR Code Payment",
        metadata: { integration_check: "accept_payment" },
        shipping,
      });
  
      // Access QR code data only if charges exist
      if (paymentIntent.charges) {
        const qrCodeData = paymentIntent.charges.data[0].payment_method_details.qr_code.converted_qr_code;
        res.status(200).json({ success: true, qrCodeData });
      } else {
        res.status(400).json({ success: false, message: 'QR code data not available yet.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });

  
  exports.codPayment = async (req,res) => {
    try {
      const { amount, shipping } = req.body || {};
  
      if (!amount || !shipping) {
        return res.status(400).json({
          success: false,
          message: 'Invalid request payload. Amount and shipping are required.',
        });
      }

      const order  = await Order.create({
        amount,
        shipping
      })
      res.status(200).json({
        success: true,
        order
    })
    } catch (error) {
      res.send(error);
    }
  }