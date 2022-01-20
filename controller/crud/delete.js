const Schema = require('../../model/data.schema.js');

//Delete a data with the specified id
exports.findByIdAndRemove = (req, res) => {
    Schema.findByIdAndRemove(req.params.id)
    .then((data) => {
        if(!data) {
            return res.status(403).send({ message: 'data not found with id ' + req.params.id + '. Make sure the id is not wrong' });
        }
        res.status(200).send({ message: 'data deleted successfully!' });
    })
    .catch((err) => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({ message: 'data not found with id ' + req.params.id });
        }
        return res.status(500).send({ message: 'could not delete data with id ' + req.params.id });
    });
};