const jwt = require('jsonwebtoken');
Schema = require('../../model/user.schema.js');
// user authorization with verify the access token
exports.verifyaccesstoken = (req, res) => {
    const header = req.headers.authorization;
    const authHeader = req.headers['authorization']; // header and authHeader are same
    const token = authHeader.split(' ')[1];
    console.log(authHeader);
    console.log(header);
    console.log(token);
    // validation
    if (!authHeader) { return res.status(403).send({message: 'request header undefined'}); }
    // convert token to json (decoded)
    const decodedResult = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedResult.id);
    Schema.findOne({ _id: decodedResult.id }).then(user => {
        if (user.role === 'admin') {
            console.log(user.name);
            return res.status(200).send({
                message: 'congratulations! there is no hidden content',
                name: user.name,
            });
        }
        console.log(user.name);
        return res.status(200).send({
            message: 'congratulations! but there is a hidden content',
            name: user.name,
        });
    }).catch(err => { 
        return res.status(401).send({message: 'invalid jwt token'}); 
    });
};