const Food = require('../model/food.model');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const food = new Food({
        name: req.body.name || "Untitled Name",
        imgUrl: req.body.name || "Untitled Url"
    });

    // Save Note in the database
    console.log(food)
    food.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
                res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

exports.findAll = (req, res) => {
    Food.find()
    .then(foods => {
        res.send(foods);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};