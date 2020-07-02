const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require('../kafka/client');

router.get('/customer/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "customer_get";
  req.body.user_id = req.params.user_id;

  kafka.make_request('profile', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/restaurant/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "restaurant_get";
  req.body.user_id = req.params.user_id;

  kafka.make_request('profile', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/customer', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "customer_update";

  kafka.make_request('profile', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/restaurant', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "restaurant_update";

  kafka.make_request('profile', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;




