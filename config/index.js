let config = require('./config')
console.log(config)
// module.export = { 
//     config : config,
//     url : config.db.mongo.url

// }

module.exports = {
    url: 'mongodb+srv://kushal:kushal@cluster0-afafk.mongodb.net/test?retryWrites=true&w=majority'
}