const express = require('express');

const router = express.Router();

router.use('/signup', require('./SignUp'));

router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

router.use((err, req, res) => {
  res.status(err.status || 500);
  if (err.status === 500) {
    console.log(err.stack);
  }
  res.json({
    message: err.message,
    error: err.stack,
  });
});

module.exports = router;
