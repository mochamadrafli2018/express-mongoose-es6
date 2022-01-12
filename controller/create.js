const Schema = require('../model/data.schema.js');

// create and save a new data
exports.save = (req, res) => {
    // Validate request
    if (!req.body) { res.status(400).send({ message: 'data must be filled!' }); return; }
    const {title,topic,link} = req.body;
    if (!title) { res.status(400).send({ message: 'title can not be empty!' }); return; }
    if (!topic) { res.status(400).send({ message: 'topic can not be empty!' }); return; }
    if (!link) { res.status(400).send({ message: 'link can not be empty!' }); return; }
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
                    res.status(200).send(data2);
                    // stop further execution in this callback
                    return;
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                        err.message || 'fail to save data in database',
                    });
                    return;
                });
                return;
            }
            else { res.status(500).send({ message: 'link already exist' }); return; }
        })
    }
    catch(err) {
        res.status(404).json({ message: 'fail to find link in database' });
        return;
    }
};