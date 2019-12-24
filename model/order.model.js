const mongoose = require('mongoose');
let today = new Date()
const OrderSchema = mongoose.Schema({
    dailyorders:[{
        name: String,
        foodId: String,
        qunatity: { type: Number, default: 0 },
        totalqunatity: { type: Number, default: 0 },
        created: { type: Number, default: 0 },
        predicted: { type: Number, default: 0 }
    }],
    date: { type: String, default: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() },
}, {
    timestamps: true,
    _id: true
});

module.exports = mongoose.model('Order', OrderSchema);
