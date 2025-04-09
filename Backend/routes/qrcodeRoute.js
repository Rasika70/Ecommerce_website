const express = require('express');
const { scanQrCode } = require('../controllers/qrcodeController');
const qrRouter = express.Router();

qrRouter.post('/scanqrcode', scanQrCode)

module.exports = qrRouter;