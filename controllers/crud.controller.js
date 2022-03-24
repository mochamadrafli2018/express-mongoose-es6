const Schema = require('../models/data.schema.js');

// create and save a new data
exports.save = (req, res) => {
    console.log(req.body);
    // validate request
    const {title, topic, link} = req.body;
    if (!req.body) { return res.status(400).send({ message: 'data must be filled!' }); }
    if (!title) { return res.status(400).send({ message: 'title can not be empty!' }); }
    if (!topic) { return res.status(400).send({ message: 'topic can not be empty!' }); }
    if (!link) { return res.status(400).send({ message: 'link can not be empty!' }); }
    try {
        // check link already exist or not
        Schema.findOne({ link:req.body.link })
        .then((data) => {
            if (!data) {
                Schema.init();
                const newData = new Schema({
                    title: req.body.title,
                    topic: req.body.topic,
                    link: req.body.link,
                });
                // save data to mongodb
                newData.save()
                .then((newDataAddedd) => { 
                    console.log('success add new data');
                    return res.status(200).send(newDataAddedd); 
                })
                .catch((err) => {
                    return res.status(500).send({
                        message: err.message || 'fail to save data in database',
                    });
                });
            }
            else {
                return res.status(500).send({ message: 'link already exist' });
            }
        })
    }
    catch(err) {
        return res.status(404).send({ message: err.message || 'fail to find link in database' });
    }
};

// retrieve all data from the DB
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

// get and find a single data with id
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

// update a message identified by the  id in the request
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

// delete a data with the specified id
exports.findByIdAndRemove = (req, res) => {
    Schema.findByIdAndRemove({_id: req.params.id})
    .then((data) => {
        if(!data) { return res.status(404).send({ message: 'data not found with id ' + req.params.id, }); }
        console.log('data deleted successfully!');
        return res.status(200).send({ message: 'data deleted successfully!' });
    })
    .catch((err) => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({ message: 'data not found with id ' + req.params.id, });
        }
        return res.status(500).send({ message: 'could not delete data with id ' + req.params.id, });
    });
};

// delete all data in collection
exports.remove = (req, res) => {
    Schema.remove({})
    .then(() => { return res.status(200).send({ message: 'All data deleted successfully!' }); }) 
    .catch((err) => { return res.status(500).send({ message: 'Could not delete all data' }); })
}