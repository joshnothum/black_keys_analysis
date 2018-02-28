const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const pool = require('../modules/pool.js');
const request = require('request');


router.get('/song:id', function (params) {
    let albumID = req.params.id;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting in /tracks: ", err);
            res.sendStatus(500);
        }
        let queryText = 'SELECT *' +
            'FROM "tracks"' +
            'WHERE "album_id = $1"';
        client.query(queryText, [albumID],
            function (err, result) {
                done();
                if (err) {
                    console.log('error in get song', err);
                    res.sendStatus(500);

                } else {
                    console.log('results from album route', result.rows);
                    res.sendStatus(200);
                }

            });



    });

});