const Schema = require('../../model/data.schema.js');

//Update a message identified by the  id in the request
exports.findOneAndUpdate = (req, res) => {
    Schema.findOne({_id : req.params.id}).then((data) => {
        const oldTopic = data.topic;
        const oldTitle = data.title;
        const oldUrl = data.url;
        let { newTopic, newTitle, newUrl } = req.body;
        if (!req.body.topic) { 
            newTopic = oldTopic; 
        }
        if (!req.body.title) {
            newTitle = oldTitle;
        }
        if (!req.body.url) {
            newUrl = oldUrl;
        }
        Schema.findOneAndUpdate(
            req.params.id,
            {
                topic: newTopic,
                title: newTitle,
                url: newUrl,
            },
            { new: true }
        )
        .then((data) => {
            if(!data) {
                return res.status(404).send({
                    message: 'data not found with id ' + req.params.id + '.Make sure the id is correct',
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'data not found with id ' + req.params.id,
                });
            }
            return res.status(500).send({
                message: 'error updating data with id ' + req.params.id,
            });
        });
    })
    .catch((err) => {
        res.status(404).json({ message: 'fail to find id' }),
        console.log('fail to find id')
    })
};