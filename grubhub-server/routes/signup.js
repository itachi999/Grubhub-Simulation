const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');

router.post('/customer', (req, res) => {
  req.body.url = req.url;

  kafka.make_request('signup', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/restaurant', (req, res) => {
  req.body.url = req.url;

  kafka.make_request('signup', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    } 
    else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;