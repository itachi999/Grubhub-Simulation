const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require('../kafka/client');

router.post('/placeorder', passport.authenticate('jwt', { session: false }), (req, res) => {
  kafka.make_request('cart', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;