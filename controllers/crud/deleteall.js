const Schema = require('../../models/data.schema.js');

//Delete all data in collection
exports.remove = (req, res) => {
    Schema.remove({})
    .then(() => { return res.status(200).send({ message: 'All data deleted successfully!' }); }) 
    .catch((err) => { return res.status(500).send({ message: 'Could not delete all data' }); })
}