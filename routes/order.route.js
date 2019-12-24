module.exports = (app, io) => {
    const order = require('../controllers/order.controller');
    app.post('/order', order.create);
    app.get('/order', order.findAll);
    app.get('/notes/:noteId', order.findOne);
    app.put('/order/:orderId', order.update);
    // app.delete('/notes/:noteId', order.delete);

    io.on("connection", socket => {
        socket.on("addData", data => {
            console.log(data)
            order.updateDone(data, io)
        });
    });
}