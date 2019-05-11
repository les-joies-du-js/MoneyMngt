let reportEndpoint = require('./reportEndpoint')
let purchaseEndpoint = require('./purchaseEndpoint')

const router = require('express').Router();

// Create route during to handle requests
router.use('/report', reportEndpoint)
router.use('/report/purchase', purchaseEndpoint)

module.exports = router