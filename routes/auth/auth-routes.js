const express = require('express');

const { authGet, loginUser, registerUser, logoutRoute } = require('./auth-controller');

const router = express.Router();

router.get('/', authGet);
router.post('/auth/login', loginUser);
router.post('/auth/register', registerUser);
router.delete('/auth/logout', logoutRoute);
module.exports = router;