const Schema = require('../../models/data.schema.js');

//get and find a single data with id
exports.findById = (req, res) => {
    Schema.findById({_id:req.params.id})
    .then((data) => {
        if(!data) {
            return res.status(404).send({ message: 'data not found with id ' + req.params.id + '. Make sure the id was correct' });
        }
        res.send(data);
    })
    .catch((err) => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ message: 'data not found with id ' + req.params.id });
        }
        return res.status(500).send({ message: 'error retrieving data with id ' + req.params.id });
    });
}