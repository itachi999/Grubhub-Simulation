const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require('../kafka/client');

router.post('/items', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.url = req.url;

  kafka.make_request('menu_items', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/itemsupdate', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.url = req.url;

  kafka.make_request('menu_items', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/itemdelete', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.url = req.url;

  kafka.make_request('menu_items', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;