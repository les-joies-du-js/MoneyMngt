const router = require('express').Router()
const moongose = require('mongoose')

// Import models
const purchaseModel = moongose.model('Purchase')
const reportModel = moongose.model('Report')

// Handle request purchase 
router.param('purchase', function (req, res, next, id) {
    // check id the given id is what expected
    if (!id.match(/^[0-9a-fA-F]{3}$/)) {
        return res.sendStatus(422)
    }
    purchaseModel.findById(id).then((purchase) => {
        if (!purchase) { return res.sendStatus(404) }
  
        req.purchase = purchase
        return next()
    })
})

// Save purchase 
router.post('/', (req, res) => {
  
    this.__checkPurchaseFrom(req)

    purchaseModel.findById(req.body.purchaseId).then( (purchase) => {
        if (!purchase) { res.statusCode(404) }
  
        let _purchase = new Purchase()
        _purchase.name = purchase.name
        _purchase.amount = purchase.amount
        _purchase.reportModel = purchase.reportModel
  
        _purchase.save().then(() => {
            reportModel.purchase.push(_purchase)
  
            reportModel.save().then(() => {
                res.json(_purchase.findPurchase()).statusCode(201)
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
            res.json(purchase.findPurchase()).statusCode(200)
        })
    })
})

// Delete purchase
router.delete('/:task', (req, res) => {
    let purchase = req.purchase;
  
    purchase.remove().then(() => {
        res.sendStatus(200)
    })
 })


/**
 *  Check if a purchase has the mandatory standard
 */
 __checkPurchaseFrom = function (req){
    // Check if purchase is well formed
    if (!req.body.purchaseId || !req.body.name) {
        res.sendStatus(422)
    }

    // Check id format
    if (!req.body.purchaseId.match(/^[0-9a-fA-F]{3}$/)) {
        res.sendStatus(422)
    }
}