const express = require('express');
const router = express.Router();

const {register, login, updateUser} = require('../controllers/auth');
const authenticateUser = require('../middleware/authentication');
const testUser = require('../middleware/testUser');

const rateLimiter = require('express-rate-limit');
const apiLimit = rateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: {
        msg: 'To many requests from you, please try again after 5 minutes.',
    },
});

router.post('/register', apiLimit, register);
router.post('/login', apiLimit, login);

router.patch('/updateUser', authenticateUser, testUser, updateUser);

module.exports = router;
