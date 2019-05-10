var reportEndpoint = require('./reportEndpoint')
var purchaseEndpoint = require('./purchaseEndpoint')

var router = require('express').Router();

// Create route during to handle requests
router.use('/report', reportEndpoint)
router.use('/report/purchase', purchaseEndpoint)

module.exports = router