const Schema = require('../../models/data.schema.js');

//Update a message identified by the  id in the request
exports.findOneAndUpdate = (req, res) => {
    console.log(req.body);
    // update data
    const newUpdatedData = new Schema({ 
        topic: req.body.topic,
        title: req.body.title,
        link: req.body.link,
        _id:req.params.id
    });
    Schema.findByIdAndUpdate(
        {_id: req.params.id},
        newUpdatedData,
        { new: true }
    ).then((updatedData) => {
        if(!updatedData) {
            return res.status(404).send({ message: 'data not found with _id ' + req.params._id, });
        }
        console.log('success update data');
        return res.status(200).send(updatedData);
    }).catch((err) => {
        if(err.kind === 'Object_id') {
            return res.status(404).send({ message: 'data not found with _id ' + req.params._id, });
        }
        return res.status(500).send({ message: 'error updating data with _id ' + req.params._id, });
    });
};