const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require('../kafka/client');

router.get('/sections/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "get_sections";
  req.body.user_id = req.params.user_id;

  kafka.make_request('menu_sections', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/sections', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "add_section";

  kafka.make_request('menu_sections', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/sectionsupdate', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "update_section";

  kafka.make_request('menu_sections', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

router.post('/sectiondelete', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.body.path = "delete_section";

  kafka.make_request('menu_sections', req.body, function (err, results) {
    if (err) {
      res.status(500).end("System Error");
    }
    else {
      res.status(results.status).end(results.message);
    }
  });
});

module.exports = router;