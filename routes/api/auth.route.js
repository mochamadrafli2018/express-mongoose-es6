const express = require('express');
const router = express.Router();

// sign up 
router.post('/register',require('../../controller/auth/newuser.register.js').signup);
// sign in (authentication) 
router.post('/login',require('../../controller/auth/user.authentication.js').signin);
// verify token (authorization)
router.get('/verify',require('../../controller/auth/user.authorization.js').verifyaccesstoken);

module.exports = router;