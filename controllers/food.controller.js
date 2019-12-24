const Food = require('../model/food.model');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }

    const food = new Food({
        name: req.body.name || "Untitled Name",
        imgUrl: req.body.name || "Untitled Url"
    });

    console.log(food)
    food.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the food."
            });
        });
};

exports.findAll = (req, res) => {
    Food.find()
        .then(foods => {
            res.send(foods);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving food."
            });
        });
};

