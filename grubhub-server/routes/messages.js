const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require('../kafka/client');

router.get('/:order_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.method = req.method;
  req.body.order_id = req.params.order_id;
  
  kafka.make_request('messages', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.method = req.method;
  
  kafka.make_request('messages', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;