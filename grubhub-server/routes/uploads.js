const express = require("express");
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const kafka = require('../kafka/client');

const userstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/users',
    filename: (req, file, cb) => {
        cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

const useruploads = multer({
    storage: userstorage,
    limits: { fileSize: 1000000 },
}).single("image");

router.post("/user/:user_id", passport.authenticate('jwt', { session: false }), (req, res) => {
    useruploads(req, res, function (err) {
        if (!err) {
            req.body.path = "user_uploads"
            req.body.user_id = req.params.user_id;
            req.body.filename = req.file.filename;

            kafka.make_request('uploads', req.body, function (err, results) {
                if (err) {
                    res.status(500).end("System Error");
                }
                else {
                    res.status(results.status).end(results.message);
                }
            });
        }
        else {
            console.log("Error!");
        }
    });
});

const resstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/restaurants',
    filename: (req, file, cb) => {
        cb(null, 'restaurant-' + Date.now() + path.extname(file.originalname));
    }
});

const resuploads = multer({
    storage: resstorage,
    limits: { fileSize: 1000000 },
}).single("resimage");

router.post("/restaurant/:user_id", passport.authenticate('jwt', { session: false }), (req, res) => {
    resuploads(req, res, function (err) {
        if (!err) {
            req.body.path = "restaurant_uploads"
            req.body.user_id = req.params.user_id;
            req.body.filename = req.file.filename;

            kafka.make_request('uploads', req.body, function (err, results) {
                if (err) {
                    res.status(500).end("System Error");
                }
                else {
                    res.status(results.status).end(results.message);
                }
            });
        }
        else {
            console.log("Error!");
        }
    });
});

const itemstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/items',
    filename: (req, file, cb) => {
        cb(null, "item-" + Date.now() + path.extname(file.originalname));
    }
});

const itemuploads = multer({
    storage: itemstorage,
    limits: { fileSize: 1000000 },
}).single("itemimage");

router.post("/item", passport.authenticate('jwt', { session: false }), (req, res) => {
    itemuploads(req, res, function (err) {
        if (!err) {
            res.writeHead(200, {
                'Context-Type': 'text/plain'
            });
            res.end(req.file.filename);
        }
        else {
            console.log(err);
        }
    })
});


module.exports = router;