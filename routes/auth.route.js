const express = require('express');
const router = express.Router();

// sign up new user
router.post('/register',require('../controllers/auth/newuser.register.js').signup);

// sign in (user authentication) 
router.post('/login',require('../controllers/auth/user.authentication.js').signin);

// verify token (user authorization)
router.get('/verify',require('../controllers/auth/user.authorization.js').verifyaccesstoken);

module.exports = router;