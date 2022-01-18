const express = require('express');
const router = express.Router();

// sing in
router.post('/login',require('../../controller/auth/user.login.js').login);
// sing up
router.post('/register',require('../../controller/auth/newuser.register.js').register);
// verify token
router.get('/verify',require('../../controller/auth/verify.token.js').verifyAccessToken);

module.exports = router;