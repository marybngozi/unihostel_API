const express = require('express');
const router = express();

const auth = require('../middlewares/auth');
const test = require('../controllers/testController');

// authenticate private route first
// router.use(auth);

// router.use('/', test());
router.use('/test', [auth, test]);


module.exports = router;