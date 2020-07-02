const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require('../kafka/client');

router.get('/:res_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "restaurant_detail";
  req.body.res_id = req.params.res_id;

  kafka.make_request('restaurant', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.get('/restaurantsearch/:search_input', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "restaurant_search";
  req.body.res_id = req.params.res_id;
  req.body.searchinput = req.params.search_input.toLowerCase();

  kafka.make_request('restaurant', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;