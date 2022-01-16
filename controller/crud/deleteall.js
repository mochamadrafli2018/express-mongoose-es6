const Schema = require('../../model/data.schema.js');

//Delete all data in collection
exports.remove = (req, res) => {
    Schema.remove({})
    .then(() => { res.status(200).send({ message: 'All data deleted successfully!' }) }) 
    .catch((err) => { res.status(500).send({ message: 'Could not delete all data' }) })
}