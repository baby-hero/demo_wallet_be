const express = require('express');
const router = express.Router();
const WalletController = require('../services/wallet')

router.get('/get-balance/:address', WalletController.getNativeBalance);
router.get('/get-history/:address', WalletController.getWalletHistory);


module.exports = router;