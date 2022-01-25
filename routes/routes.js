const express = require('express');

const router = express.Router();

const AuthController = [
    require('../controllers/auth/newuser.register.js'),
    require('../controllers/auth/user.authentication.js'),
    require('../controllers/auth/user.authorization.js')
];

const CrudController = [
    require('../controllers/crud/create.js'),
    require('../controllers/crud/read.js'),
    require('../controllers/crud/readbyid.js'),
    require('../controllers/crud/update.js'),
    require('../controllers/crud/delete.js'),
    require('../controllers/crud/deleteall.js')
];

// sign up new user
router.post('/register', AuthController[0].signup);

// sign in (user authentication) 
router.post('/login', AuthController[1].signin);

// verify token (user authorization)
router.get('/verify', AuthController[2].verifyaccesstoken);

// create new data
router.post('/', CrudController[0].save);

// read all data
router.get('/', CrudController[1].find);

// read data by id
router.get('/:id', CrudController[2].findById);

// update data by id
router.put('/:id', CrudController[3].findOneAndUpdate);

// delete data by id
router.delete('/:id', CrudController[4].findByIdAndRemove);

// delete all data
router.delete('/', CrudController[5].remove);

module.exports = router;