const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    name: {type:String,require:true},
    imgUrl: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', FoodSchema);
