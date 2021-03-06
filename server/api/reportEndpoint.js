const router = require('express').Router()
const mongoose = require('../models/reportModel')

// Handle request report 
router.param('report', function(req, res, next,id) {
    
    // check id the given id is what expected
    if (!id.match(/^[0-9a-fA-F]{5}$/)) {
        return res.sendStatus(422)
    }

    // Build object and handle request
    reportModel.findById(id)
        .populate('purchases')
        .then(function (purchase) {
            if(!purchase) { return res.sendStatus(404) }

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
            if(!purchases) { return res.sendStatus(404)}
        })
    
    return res.json({
        reports: reports.map((report) => {
            return reportModel.findReport()
        })
    }).status(200)
})

// Save report 
router.post('/', (req, res) => {
    // F*ucking title needed
    if (!req.body.name) {
        res.sendStatus(422)
    }
  
    let report = new Report()
    report.name = req.body.name
  
    report.save().then(() => {
        res.json(reportModel.findReport()).statusCode(201)
    })
  
 })

 // Delete report
 router.delete('/:report', (req, res) => {
     // Mooaarrr checks ?? 
    req.report.remove().then(function () {
        return res.sendStatus(200)
    })
 })

 module.exports = router