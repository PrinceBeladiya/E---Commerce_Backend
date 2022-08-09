const express = require('express');

const router = express.Router();

router.use('/', require('../controllers/AuthController'));

module.exports = router;
