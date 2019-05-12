// Import mongoose module
const mongoose = require('mongoose')
const Purchase = require('../models/purchaseModel')

/**
 *  A report has a mandatory name and contains an array of purchases
 */
let reportModel = new mongoose.Schema({
    name: { type : String, required : [true, "not empty"], maxlength : 255, index: true },
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }]},
    { timestamps: true })

// Make sure that object is clean
reportModel.pre('remove', (next) => {
    Purchase.remove({ reportId : this._id}).exec()
    next()
})

// Retrieve simplify data retrival from model
reportModel.methods.findReport = function() {
    return {
        id: this._id,
        name: this.name,
        purchases: this.purchases.map( (purchase)=> {
            return purchase.findPurchase()
        })
    }
}

mongoose.model('Report', reportModel)
// ReportModel
