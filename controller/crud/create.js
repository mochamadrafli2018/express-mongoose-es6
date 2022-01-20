const Schema = require('../../model/data.schema.js');

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