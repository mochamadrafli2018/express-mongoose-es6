import express from 'express'
import auth from '../controllers/auth.controller.js'
import user from '../controllers/user.controller.js'

const router = express.Router();
// sign up new user
router.post('/register', user.register);
// sign in (user controllerentication)
router.post('/login', auth.login);
// verify token (user controllerorization)
router.get('/verify', auth.verifyAccessToken);
// read all user data
router.get('/users', user.findAll);
// read user data by id
router.get('/users/:id', user.findById);
// update user data by id
router.put('/users/:id', user.findOneAndUpdate);
// delete user data by id
router.delete('/users/:id', user.findByIdAndRemove);
// delete all user data
router.delete('/users', user.remove);

export default router;