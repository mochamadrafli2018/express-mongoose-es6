const jwt = require("jsonwebtoken");
User = require("../../model/user.schema.js");

exports.verifytoken = (req, res) => {
    const header = req.headers.authorization;
    const keyword = req.headers.authorization.split(' ')[0] === 'JWT';
    if (header && keyword) {
        jwt.verify(keyword, process.env.API_SECRET, function (err, decode) {
            if (err) {
                console.log('data not found')
                return res.status(500).send({message: err});
            }
            User.findOne({_id: decode.id})
            .exec((err, user) => {
                if (err) { 
                    console.log('fail')
                    return res.status(500).send({message: err}); 
                }
                else if (req.user === 'user') {
                    return res.status(403).send({message: "Invalid JWT token"});
                }
                else if (req.user == 'admin') {
                    return res.status(200).send({message: "Congratulations! but there is no hidden content"});
                }
            })          
        });
    }
    else {
        return res.status(403).send({message: "Unauthorised access"});
    }
};