const mongoose = require('mongoose');
const dbConfig = require('../config/index');


module.exports = {
    connectToServer:function(callback){
        mongoose.connect(dbConfig.url, {
            useNewUrlParser: true
        }).then(() => {
            console.log("Successfully connected to the database");
            callback(null)
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            callback(err)
        });
    }
}