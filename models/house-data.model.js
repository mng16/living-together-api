const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HouseData = new Schema({
    dataTitle: {
        type: String
    },
    company: {
        type: String
    },
    url: {
        type: String
    },
    personResponsible: {
        type: String
    },
    paymentsDue: {
        type: String
    },
    lastBillAmount: {
        type: Number
    },
    nextBillAmount: {
        type: Number
    },
    billSplit: {
        type: String
    }
});

module.exports = mongoose.model('HouseData', HouseData);