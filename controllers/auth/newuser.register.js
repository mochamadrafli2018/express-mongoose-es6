const Schema = require('../../models/user.schema');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    // validate requests
    let {name,email,password,gender,role} = req.body;
    console.log(req.body);
    if (!req.body) { return res.status(400).send({ message: 'Data harus di isi !' }); }
    if (!name) { return res.status(400).send({ message: 'Nama harus di isi !' }); }
    if (!email) { return res.status(400).send({ message: 'Email harus di isi !' }); }
    if (!password) { return res.status(400).send({ message: 'Password harus di isi !' }); }
    if (password.length < 8) { return res.status(400).send({ message: 'Password harus sama dengan atau lebih dari 8 karakter !' }); }
    if (!gender) { return res.status(400).send({ message: 'Jenis kelamin harus di isi !' }); }
    // check if email already exist
    try {
        Schema.findOne({ email }).then((user)=>{
            if (!user) {
                console.log('Email belum terdaftar.');
                // convert password to hashed
                const encryptedPassword = bcrypt.hashSync(password, 10);
                console.log(encryptedPassword);
                // initialize newUser data
                const newUser = new Schema({
                    name: name,
                    email: email,
                    gender: gender,
                    password: encryptedPassword,
                    role: role,
                    updatedScreeningResult: "",
                });
                console.log(newUser);           
                newUser.save().then(data => {
                    console.log('Pendaftaran berhasil.');
                    return res.status(201).send({
                        message: 'Pendaftaran berhasil.',
                        data: data,
                    });
                }).catch(err => {
                    console.log(err)
                    return res.status(500).send({ message: err || 'Pendaftaran gagal.' });
                });
            }
            else if (user) { return res.status(409).send({ message: 'Email sudah terdaftar, silahkan masuk.' }); }
        })
    }
    catch(err) { return res.status(500).send({ message: err || 'Coba cek koneksi internetmu.'}); }
}