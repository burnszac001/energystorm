const express = require('express');

const { authGet, loginUser, registerUser } = require('./auth-controller');

const router = express.Router();

router.get('/', authGet);
router.post('/auth/login', loginUser);
router.post('/auth/register', registerUser);

module.exports = router;