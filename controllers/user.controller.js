import bcrypt from 'bcrypt'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const register = (req, res) => {
    // validate requests
    let {name,email,password,gender,role} = req.body;
    console.log(req.body);
    if (!req.body) return res.status(400).send({ message: 'Data harus di isi !' });
    if (!name) return res.status(400).send({ message: 'Nama harus di isi !' });
    if (!email) return res.status(400).send({ message: 'Email harus di isi !' });
    if (!password) return res.status(400).send({ message: 'Password harus di isi !' });
    if (password.length < 8) return res.status(400).send({ message: 'Password harus sama dengan atau lebih dari 8 karakter !' });
    if (!gender) return res.status(400).send({ message: 'Jenis kelamin harus di isi !' });
    if (!role) return res.status(400).send({ message: 'Role harus di isi !' });
    // check if email already exist
    try {
        User.findOne({ email }).then((user)=>{
            if (!user) {
                console.log('Email belum terdaftar.');
                // convert password to hashed
                const encryptedPassword = bcrypt.hashSync(password, 10);
                console.log(encryptedPassword);
                // initialize newUser data
                const newUser = new User({
                    name: name,
                    email: email,
                    gender: gender,
                    password: encryptedPassword,
                    role: role,
                    updatedScreeningResult: "",
                });
                console.log(newUser);           
                newUser.save().then(user => {
                    console.log('Pendaftaran berhasil.');
                    // auto sign in token create from user id
                    var accessToken = jwt.sign(
                        {id: user._id}, process.env.JWT_SECRET, {expiresIn: 86400},
                    );
                    console.log('Token: ', accessToken);

                    return res.status(200).send({
                        message: 'Pendaftaran berhasil.',
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        },
                        token: accessToken,
                    });
                }).catch(err => {
                    return res.status(500).send({ message: err || 'Pendaftaran gagal.' });
                });
            }
            else if (user) { return res.status(409).send({ message: 'Email sudah terdaftar, silahkan masuk.' }); }
        })
    }
    catch(err) { return res.status(500).send({ message: err || 'Coba cek koneksi internetmu.'}); }
}

// retrieve all user data from the DB
const findAll = (req, res) => {
    User.find().then((data) => { return res.status(200).send(data) })
}

// get and find a single user data with id
const findById = (req, res) => {
    User.findById({_id:req.params.id})
    .then((data) => {
        if(!data) return res.status(404).send({ message: 'data not found with id ' + req.params.id + '. Make sure the id was correct' });
        return res.status(200).send(data);
    })
    .catch((err) => {
        if(err.kind === 'ObjectId') return res.status(404).send({ message: 'data not found with id ' + req.params.id });
        return res.status(500).send({ message: 'error retrieving data with id ' + req.params.id });
    });
}

// update a user data identified by the  id in the request
const findOneAndUpdate = (req, res) => {
    console.log(req.body);
    User.findById({_id:req.params.id})
    .then((currentData) => {
        let {newName, newEmail, newPassword, newGender, newRole, newUpdatedScreeningResult} = '';
        if (!req.body.name) { newName = currentData.name}
        if (!req.body.email) { newEmail = currentData.email}
        if (!req.body.password) { newPassword = currentData.password}
        if (!req.body.gender) { newGender = currentData.gender}
        if (!req.body.role) { newRole = currentData.role}
        if (!req.body.updatedScreeningResult) { newUpdatedScreeningResult = currentData.updatedScreeningResult}
        if (req.body.name) { newName = req.body.name}
        if (req.body.email) { newEmail = req.body.email}
        if (req.body.password) { newPassword = req.body.password}
        if (req.body.gender) { newGender = req.body.gender}
        if (req.body.role) { newRole = req.body.role}
        if (req.body.updatedScreeningResult) { newUpdatedScreeningResult = req.body.updatedScreeningResult}
        const newData = new User({
            name: newName,
            email: newEmail,
            password: newPassword,
            gender: newGender,
            role: newRole,
            updatedScreeningResult: newUpdatedScreeningResult,
            _id: req.params.id
        });
        console.log(newData)
        // update with new data
        User.findByIdAndUpdate({
            _id: req.params.id}, newData, { new: true }
        )
        .then((updatedData) => {
            console.log('success update data');
            return res.status(200).send(updatedData);
        }).catch((err) => {
            if(err.kind === 'Object_id') {
                return res.status(404).send({ message: 'data not found with _id ' + req.params._id, });
            }
            return res.status(500).send({ message: 'error updating data with _id ' + req.params._id, });
        });
    })
    .catch((err) => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ message: 'data not found with id ' + req.params.id });
        }
        return res.status(500).send({ message: 'error retrieving data with id ' + req.params.id });
    });
};

// delete a user data with the specified id
const findByIdAndRemove = (req, res) => {
    User.findByIdAndRemove({_id: req.params.id})
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

// delete all user data in collection
const remove = (req, res) => {
    User.remove({})
    .then(() => { return res.status(200).send({ message: 'All data deleted successfully!' }); }) 
    .catch((err) => { return res.status(500).send({ message: 'Could not delete all data' }); })
}

const user = {register, findAll, findById, findOneAndUpdate, findByIdAndRemove, remove}
export default user