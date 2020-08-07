const express = require('express');
const router = express.Router();

const startup = require('../controllers/startController');
const login = require('../controllers/loginController');
const register = require('../controllers/registerController');

router.use('/', startup());
router.use('/register', register());
router.use('/login', login());


module.exports = router;