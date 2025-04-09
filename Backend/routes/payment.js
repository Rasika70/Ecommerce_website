const express = require('express');
const { processPayment, sendStripeApi, createQrCodeIntent, codPayment } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/payment/process').post( isAuthenticatedUser, processPayment);
router.route('/payment/qr-code-process').post( isAuthenticatedUser, createQrCodeIntent);
/* router.route('/stripeapi').get( isAuthenticatedUser, sendStripeApi); */
router.route('/stripeapi').get( sendStripeApi);
router.route('/payment/cod-process').post( isAuthenticatedUser, codPayment);


module.exports = router;