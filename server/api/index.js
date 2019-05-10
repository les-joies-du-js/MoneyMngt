var router = require('express').Router();

// Create route during to handle requests
router.use('/report', require('./reportEndpoint'))
router.use('/report/purchase', require('./purchaseEndpoint'))

module.exports = router