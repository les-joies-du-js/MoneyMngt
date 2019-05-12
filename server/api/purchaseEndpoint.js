const router = require('express').Router()
const moongose = require('mongoose')
const HttpStatus = require('http-status-codes')

// Import models
const purchaseModel = moongose.model('Purchase')
const reportModel = moongose.model('Report')

// Handle request purchase 
router.param('purchase', function (req, res, next, id) {
    // check id the given id is what expected
    if (!id.match(/^[0-9a-fA-F]{3}$/)) {
        return res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    }
    purchaseModel.findById(id).then((purchase) => {
        if (!purchase) { return res.sendStatus(HttpStatus.NOT_FOUND) }
  
        req.purchase = purchase
        return next()
    })
})

// Save purchase 
router.post('/', (req, res) => {
  
    this.__checkPurchaseFrom(req)
    // purchaseId is given by the client?
    purchaseModel.findById(req.body.purchaseId).then( (purchase) => {
        if (!purchase) { res.statusCode(HttpStatus.NOT_FOUND) }
  
        let _purchase = new Purchase()
        _purchase.name = purchase.name
        _purchase.amount = purchase.amount
        _purchase.reportModel = purchase.reportModel
  
        _purchase.save().then(() => {
            reportModel.purchase.push(_purchase)
  
            reportModel.save().then(() => {
                res.json(_purchase.toClient()).statusCode(HttpStatus.CREATED)
            })
        })
    })
})

// Update purchase
router.put('/', (req, res) => {

    this.__checkPurchaseFrom(req)
  
    Task.findById(req.body.purchaseId).then( (purchase) => {
        purchase.name = req.body.name
  
        purchase.save().then(() => {
            res.json(purchase.toClient()).statusCode(HttpStatus.OK)
        })
    })
})

// Delete purchase
router.delete('/:task', (req, res) => {
    let purchase = req.purchase;
  
    purchase.remove().then(() => {
        res.sendStatus(HttpStatus.OK)
    })
 })


/**
 *  Check if a purchase has the mandatory standard
 */
 __checkPurchaseFrom = function (req){
    // Check if purchase is well formed
    if (!req.body.purchaseId || !req.body.name) {
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    }

    // Check id format
    if (!req.body.purchaseId.match(/^[0-9a-fA-F]{3}$/)) {
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    }
}

module.exports = router
