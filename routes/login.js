//Pelenalako Kamala
var express = require('express');
var router = express.Router();
//connecting to database to insert data
var dbms = require('./dbms.js');

//this post request checks if username and password has been registered
router.post('/', function (req, res) {
    //looks for matching username and password
    dbms.dbquery("SELECT * FROM USERS WHERE USERNAME='" +req.query.username +"' AND PASSWORD='" +req.query.password +"'",
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                return;
            }
            res.json(result);
        });
});

module.exports = router;