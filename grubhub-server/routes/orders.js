const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require('../kafka/client');

router.get('/pendingorders/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "get_customer_pending_orders";
  req.body.user_id = req.params.user_id;

  kafka.make_request('orders', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/completedorders/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "get_customer_completed_orders";
  req.body.user_id = req.params.user_id;

  kafka.make_request('orders', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/pendingorders/restaurant/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "get_restaurant_pending_orders";
  req.body.user_id = req.params.user_id;

  kafka.make_request('orders', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/completedorders/restaurant/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "get_restaurant_completed_orders";
  req.body.user_id = req.params.user_id;

  kafka.make_request('orders', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/orderstatus', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "update_order_status";

  kafka.make_request('orders', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;