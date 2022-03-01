const Schema = require('../../models/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// user authentication
exports.signin = (req, res) => {
    // validate request
    let {email,password} = req.body;
    console.log(req.body);
    if (!email) { return res.status(400).send({ message: 'Email harus di isi !' }); }
    if (!password) { return res.status(400).send({ message: 'Password harus di isi !' }); }
    if (password.length < 8) { return res.status(400).send({ message: 'Password harus sama dengan atau lebih dari 8 karakter !' }); }
    // check email already exist or not
    try {
        Schema.findOne({ email: email }).then((user)=>{
            if (!user) {
                console.log('Email tidak ditemukan pada database.');
                return res.status(500).send({ message: 'Email tidak terdaftar, silahkan daftar terlebih dahulu.'}); 
            }
            else if (user) {
                console.log('Email ditemukan pada database.');
                // comparing passwords
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password, user.password
                );
                if (!passwordIsValid) {
                    console.log('Email terdaftar, tapi password salah.');
                    return res.status(409).send({
                        message: 'Email terdaftar, tapi password salah.',
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
                    console.log('Berhasil masuk.');
                    console.log('Token: ', accessToken);
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
    catch(err) { return res.status(500).send({ message: err || 'Coba cek koneksi internetmu.'}); }
}