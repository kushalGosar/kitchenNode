module.exports = (app, io) => {
    const order = require('../controllers/order.controller');

    // Create a new Note
    app.post('/order', order.create);

    // Retrieve all Notes
    app.get('/order', order.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', order.findOne);

    // Update a Note with noteId
    app.put('/order/:orderId', order.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', order.delete);

    io.on("connection", socket => {
        socket.on("addData", data => {
            console.log(data)
            order.updateDone(data,io)
        });
    });
}