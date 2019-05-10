const mongoose = require('mongoose')

/**
 *  A purchase has a mandatory name and amount
 */
let purchaseModel = new mongoose.Schema({
    name: { type: String, required: [true, "not empty"], maxlength: 255 }, 
    amount: { type: Number, required: [true, "not empty"], maxlength: 5 }},
    { timestamps: true })

purchaseModel.method.findPurchase = function() {
    return {
        id : this._id,
        name: this.name,
        amount: this.amount
    }
}

mongoose.model('Purchase', purchaseModel)

// Purchase model
