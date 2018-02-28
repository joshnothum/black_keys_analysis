const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const pool = require('../modules/pool.js');
require('dotenv').config();
const request = require('request');
// const TOKEN = process.env.CLIENT_ACCESS_TOKEN;
// const headers = { 'Authorization': 'Bearer', TOKEN};

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

// router.get('/genius', function (req, res, next) {
// console.log(headers);

//     request('https://api.genius.com/songs/1116/',{headers}, function (error, response, body) {
//         res.send(body);

//         console.log("body", response);


//     });
// });//end of get

module.exports = router;