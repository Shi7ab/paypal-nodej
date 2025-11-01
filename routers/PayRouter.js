// routes/authRoutes.js
const express = require('express');
const  PayService = require('../services/payService')

const router = express.Router();
const payService = new PayService()

// map routes to methods
 router.get('/pay',payService.getpaymMethod)
 router.post('/pay',payService.createPayment)
 router.put('/update-transaction',payService.updateTransaction)
 router.delete('/transaction',payService.deleteTransaction)
 
 

module.exports = router;
