const express = require("express");
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { secret } = require('../config');
require('../passport')(passport);
const kafka = require('../kafka/client');

router.post('/', (req, res) => {

  kafka.make_request('login', req.body, (err, results) => {
    if (err) {
      res.status(500).end("System Error");
    }
    else if (results.status === 200) {
      let payload = results.message;
      var token = jwt.sign(payload, secret, {
        expiresIn: 1008000
      });
      res.json({ success: true, token: 'JWT ' + token });
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;