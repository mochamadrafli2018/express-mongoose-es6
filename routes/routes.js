const express = require('express');
const router = express.Router();

// sign up new user
router.post('/register', require('../controllers/user.controller.js').newuser);
// sign in (user authentication)
router.post('/login', require('../controllers/auth.controller.js').signin);
// verify token (user authorization)
router.get('/verify', require('../controllers/auth.controller').verifyaccesstoken);
// read all user data
router.get('/users', require('../controllers/user.controller.js').find);
// read user data by id
router.get('/users/:id', require('../controllers/user.controller.js').findById);
// update user data by id
router.put('/users/:id', require('../controllers/user.controller.js').findOneAndUpdate);
// delete user data by id
router.delete('/users/:id', require('../controllers/user.controller.js').findByIdAndRemove);
// delete all user data
router.delete('/users', require('../controllers/user.controller.js').remove);

// create new data
router.post('/data', require('../controllers/crud.controller.js').save);
// read all data
router.get('/data', require('../controllers/crud.controller.js').find);
// read data by id
router.get('/data/:id', require('../controllers/crud.controller.js').findById);
// update data by id
router.put('/data/:id', require('../controllers/crud.controller.js').findOneAndUpdate);
// delete data by id
router.delete('/data/:id', require('../controllers/crud.controller.js').findByIdAndRemove);
// delete all data
router.delete('/data', require('../controllers/crud.controller.js').remove);

module.exports = router;