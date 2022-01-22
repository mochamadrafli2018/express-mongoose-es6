const Schema = require('../../models/user.schema');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    // validate requests
    let {name,email,password,gender} = req.body;
    console.log(req.body);
    if (!req.body) { return res.status(400).send({ message: 'data must be filled!' }); }
    if (!name) { return res.status(400).send({ message: 'name must be filled' }); }
    if (!email) { return res.status(400).send({ message: 'email must be filled' }); }
    if (!password) { return res.status(400).send({ message: 'password must be filled' }); }
    if (password.length < 8) { return res.status(400).send({ message: 'password must be equal or more than 8 character' }); }
    if (!gender) { return res.status(400).send({ message: 'gender must be filled' }); }
    // check if email already exist
    try {
        Schema.findOne({ email }).then((user)=>{
            if (!user) {
                console.log('email is not registered yet');
                // convert password to hashed
                const encryptedPassword = bcrypt.hashSync(password, 10);
                console.log(encryptedPassword);
                // initialize newUser data
                const newUser = new Schema({
                    name: name,
                    email: email,
                    gender: gender,
                    password: encryptedPassword,
                    role: "user",
                });
                console.log(newUser);           
                newUser.save().then(data => {
                    console.log('success inserted data to database');
                    return res.status(201).send({
                        message: 'success inserted data to database',
                        data: data,
                    });
                }).catch(err => {
                    console.log(err)
                    return res.status(500).send({ message: 'fail inserted data to database' });
                });
            }
            else if (user) { return res.status(409).send({ message: 'email already exist, please login' }) }
        })
    }
    catch(err) { return res.status(500).send({ message: err }); }
}