const Schema = require('../model/data.schema.js');

//retrieve all data from the DB
exports.find = (req, res) => {
    Schema.find()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || 'some error ocurred while retrieving data.',
        });
    });
};