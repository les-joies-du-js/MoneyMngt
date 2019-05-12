const router = require('express').Router()
const mongoose = require('../models/reportModel')
const HttpStatus = require('http-status-codes')

// Handle request report 
router.param('report', function(req, res, next,id) {
    
    // check id the given id is what expected
    if (!id.match(/^[0-9a-fA-F]{5}$/)) {
        return res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    }

    // Build object and handle request
    reportModel.findById(id)
        .populate('purchases')
        .then(function (report) {
            if(!report) { return res.sendStatus(HttpStatus.NOT_FOUND) }

            req.report = report
            return next()
        })
})

// Get full report 
router.get('/', (req,res) => {
    reportModel.find()
        .populate('purchases')
        .then( (purchases) => {
            // If there are no purchases ?? Can be discussed 
            if(!purchases) { return res.sendStatus(HttpStatus.NOT_FOUND)}
        })
    
    return res.json({
        reports: reports.map((report) => {
            return reportModel.toClient()
        })
    }).status(HttpStatus.OK)
})

// Save report 
router.post('/', (req, res) => {
    const {name} = req.body.name
    // F*ucking title needed
    if (!name) {
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    }
  
    const report = new Report({name})
  
    report.save().then(() => {
        res.json(reportModel.toClient()).statusCode(HttpStatus.CREATED)
    })
  
 })

 // Delete report
 router.delete('/:report', (req, res) => {
     // Mooaarrr checks ?? 
    req.report.remove().then(function () {
        return res.sendStatus(HttpStatus.OK)
    })
 })

 module.exports = router
