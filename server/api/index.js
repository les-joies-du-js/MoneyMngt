var router = require('express').Router();

// Create route during to handle requests
router.use('/report', require('./reports'))
router.use('/report/purchase', require('./purchase'))

module.exports = router