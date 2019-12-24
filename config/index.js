let config = require('./config');
module.exports = {
    // url: 'mongodb+srv://kushal:kushal@cluster0-afafk.mongodb.net/test?retryWrites=true&w=majority'
    // "url": "mongodb://localhost:27017/kitchen-system"
    config: config,
    url: config.db.mongo.url

}