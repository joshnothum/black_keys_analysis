var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool.js');
require('dotenv').config();
var request = require('request');
// let TOKEN = process.env.CLIENT_ID;
// headers = {'Authorization':'Bearer', TOKEN};

router.get('/track', function (req, res, next) {

    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        }
        client.query('SELECT * FROM tracks;',

            function (err, result) {
                done();

                if (err) {
                    console.log("Error getting data: ", err);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);

                }//end of else
            });// end of if function
    });//end of pool
});//end of get
router.get('/album', function (req, res, next) {

    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        }
        client.query('SELECT * FROM album;',

            function (err, result) {
                done();

                if (err) {
                    console.log("Error getting data: ", err);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                    
                    
                }//end of else
            });// end of if function
    });//end of pool
});//end of get

// router.get('/geniusData', function (req, res, next) {

//     request('https://api.genius.com/songs/1116',{headers}, function (error, response, body) {
//         res.send(body);

//         console.log("body", body);


//     });
// });//end of get

module.exports = router;