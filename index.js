const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const connection = require('./dbConnection/mongodb')
const cors = require('cors');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

connection.connectToServer((err)=>{
    if(err) process.exit();
})

require('./routes/food.route')(app);
require('./routes/order.route')(app, io);


http.listen(443);

