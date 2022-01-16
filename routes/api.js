const express = require('express');
const router = express.Router();

// router create, read, update and delete
router.post('/', require('../controller/crud/create.js').save);
router.get('/', require('../controller/crud/read.js').find);
router.get('/:id', require('../controller/crud/readbyid.js').findById);
router.put('/:id', require('../controller/crud/update.js').findOneAndUpdate);
router.delete('/:id', require('../controller/crud/delete.js').findByIdAndRemove);
router.delete('/', require('../controller/crud/deleteall.js').remove);
// router login, register, verify token (for testing) and logout
router.post('/login',require('../controller/auth/user.login.js').login);
router.post('/register',require('../controller/auth/newuser.register.js').register);
router.get('/verify',require('../controller/auth/verify.token.js').verifytoken);

module.exports = router;