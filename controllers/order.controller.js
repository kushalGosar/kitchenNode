const Order = require('../model/order.model');
const mongoose = require('mongoose');

// Create and Save a new Note
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

            console.log(obj)
            obj.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note."
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
                message: err.message || "Some error occurred while retrieving notes."
            })
        });

};


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Order.find({ date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            })
        });
};

// Find a single note with a orderId
exports.findOne = (req, res) => {
    Note.findById(req.params.orderId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.orderId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.orderId
            });
        });
};


// Update a note identified by the orderId in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    console.log(req.params)

    // Find note and update it with the request body
    Order.findById(req.params.orderId).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.orderId
            });
        }
        // console.log(req.body.dailyorders)

        data.dailyorders.forEach(element => {
            console.log(element.foodId)

            element.totalqunatity = element.totalqunatity + req.body.dailyorders.find(e => e.foodId == element.foodId).qunatity
            element.qunatity = 0
        });
        console.log(data.dailyorders)

        Order.findByIdAndUpdate(req.params.orderId, {
            dailyorders: data.dailyorders
        }, { new: true })
            .then(data => res.send(data))
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.orderId
                    });
                }
                return res.status(500).send({
                    message: "Error updating note with id " + req.params.orderId
                });
            });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        })
    });



};

// Delete a note with the specified orderId in the request
exports.delete = (req, res) => {
    console.log(io)
};

// exports.updateDone
//     = () => {
//         console.log(io)
//         Order.update(
//             { _id: data._id, "dailyorders._id": data.data._id },
//             { $set: { "dailyorders.$.created": data.data.created + 1, "dailyorders.$.totalqunatity": data.data.totalqunatity - 1 } }
//         ).then(data => {
//             console.log('---')
//             console.log(data)

//             io.emit("document", true);
//         }).catch
//     }
exports.updateDone = (data,io) => {
    console.log('------')
    console.log(data)
    
    Order.update(
        { _id: data._id, "dailyorders._id": data.data._id },
        { $set: { "dailyorders.$.created": data.data.created + 1, "dailyorders.$.totalqunatity": data.data.totalqunatity - 1 } }
    ).then(data => {
        console.log('---')
        console.log(data)

        io.emit("document", true);
    })
}
