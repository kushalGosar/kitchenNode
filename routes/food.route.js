module.exports = (app) => {
    const food = require('../controllers/food.controller');
    app.post('/food', food.create);
    app.get('/food', food.findAll);
    // app.get('/food/:foodId', food.findOne);
    // app.put('/food/:foodId', food.update);
    // app.delete('/food/:foodId', food.delete);
}