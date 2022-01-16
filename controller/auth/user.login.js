const Schema = require('../../model/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    // validate request
    let {email,password} = req.body;
    if (!email) { return res.status(400).send({ message: 'email must be filled' }); }
    if (!password) { return res.status(400).send({ message: 'password must be filled' }); }
    if (password.length < 8) { return res.status(400).send({ message: 'password must be equal or more than 8 character' }); }
    // check email already exist or not
    try {
        Schema.findOne({ email: email }).then((user)=>{
            if (!user) { res.status(500).send({ message: 'email was not registered'}); }
            else if (user) {
                // comparing passwords
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                // checking if password was valid and send response accordingly
                if (!passwordIsValid) {
                    return res.status(409).send({
                        message: 'invalid password!',
                        token: null,
                    })
                }
                else if (passwordIsValid) {
                    // signing token with user id
                    var accessToken = jwt.sign(
                        {id: user.id},
                        process.env.API_SECRET,
                        {expiresIn: 86400},
                    );
                    return res.status(409).send({
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                        },
                        token: accessToken,
                    })
                }
            }
        })
    }
    catch(err) { return res.status(500).send({ message: 'fail to find email' }); }
}