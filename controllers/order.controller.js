const Order = require('../model/order.model');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Bad Request"
        });
    }

    Order.find({ date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() }).then(data => {
        if (data.length === 0) {
            var arrayobj = req.body.map(element => {
                return ({
                    name: element.name,
                    foodId: element._id,
                    predicted: element.predicted,
                })
            })

            var obj = new Order({
                dailyorders: arrayobj
            })

            obj.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the order."
                    });
                });

        }
        else {
            res.status(500).send({
                message: "Prediction for today made"
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            })
        });

};


exports.findAll = (req, res) => {
    Order.find({ date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            })
        });
};

exports.findOne = (req, res) => {

};


exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "order content can not be empty"
        });
    }

    Order.findById(req.params.orderId).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }

        data.dailyorders.forEach(element => {

            element.totalqunatity = element.totalqunatity + req.body.dailyorders.find(e => e.foodId == element.foodId).qunatity
            element.qunatity = 0
        });

        Order.findByIdAndUpdate(req.params.orderId, {
            dailyorders: data.dailyorders
        }, { new: true })
            .then(data => res.send(data))
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "order not found with id " + req.params.orderId
                    });
                }
                return res.status(500).send({
                    message: "Error updating order with id " + req.params.orderId
                });
            });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        })
    });



};

exports.delete = (req, res) => {
};

exports.updateDone = (data, io) => {

    Order.update(
        { _id: data._id, "dailyorders._id": data.data._id },
        { $set: { "dailyorders.$.created": data.data.created + 1, "dailyorders.$.totalqunatity": data.data.totalqunatity - 1 } }
    ).then(data => {

        io.emit("document", true);
    })
}
