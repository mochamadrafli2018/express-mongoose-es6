const Schema = require('../../model/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// user authentication
exports.signin = (req, res) => {
    // validate request
    let {email,password} = req.body;
    console.log(req.body);
    if (!email) { return res.status(400).send({ message: 'email must be filled' }); }
    if (!password) { return res.status(400).send({ message: 'password must be filled' }); }
    if (password.length < 8) { return res.status(400).send({ message: 'password must be equal or more than 8 character' }); }
    // check email already exist or not
    try {
        Schema.findOne({ email: email }).then((user)=>{
            if (!user) { 
                console.log('email not found in database');
                return res.status(500).send({ message: 'email was not registered'}); 
            }
            else if (user) {
                console.log('email found in database');
                // comparing passwords
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password, user.password
                );
                if (!passwordIsValid) {
                    console.log('invalid password');
                    return res.status(409).send({
                        message: 'invalid password!',
                        token: null,
                    });
                }
                else if (passwordIsValid) {
                    // signing token with user id
                    var accessToken = jwt.sign(
                        {id: user._id},
                        process.env.JWT_SECRET,
                        {expiresIn: 86400},
                    );
                    console.log('login success');
                    console.log(accessToken);
                    return res.status(200).send({
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        },
                        token: accessToken,
                    });
                }
            }
        })
    }
    catch(err) { return res.status(500).send({ message: err }); }
}