const Schema = require('../../model/data.schema.js');

// create and save a new data
exports.save = (req, res) => {
    // Validate request
    if (!req.body) { return res.status(400).send({ message: 'data must be filled!' }); }
    const {title,topic,link} = req.body;
    if (!title) { return res.status(400).send({ message: 'title can not be empty!' }); }
    if (!topic) { return res.status(400).send({ message: 'topic can not be empty!' }); }
    if (!link) { return res.status(400).send({ message: 'link can not be empty!' }); }
    try {
        Schema.findOne({ link:req.body.link })
        .then((data) => {
            console.log('finish search data in database');
            if (!data) {
                Schema.init()
                const newData = new Schema(
                    {
                        title: title,
                        topic: topic,
                        link: link,
                    },
                );
                // save data to mongodb
                newData.save()
                .then((data2) => {
                    return res.status(200).send(data2);
                })
                .catch((err) => {
                    return res.status(500).send({
                        message:
                        err.message || 'fail to save data in database',
                    });
                });
            }
            else { return res.status(500).send({ message: 'link already exist' }); }
        })
    }
    catch(err) {
        return res.status(404).send({ message: 'fail to find link in database' });
    }
};