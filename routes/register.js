//Pelenalako Kamala
var express = require('express');
var router = express.Router();
//connecting to database to insert data
var dbms = require('./dbms.js');

//this post request attempts to register an account
router.post('/', function (req, res) {
    //looks for matching existing username or email
    var validRegistration = true;
    var usernameFound = false;
    var emailFound = false;
    dbms.dbquery("SELECT * FROM USERS WHERE USERNAME='" +req.query.username +"'",
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                return;
            }
            if(result != null){
                usernameFound = true;
                validRegistration = false;
            }
        });
    dbms.dbquery("SELECT * FROM USERS WHERE EMAIL='" +req.query.email +"'",
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                return;
            }
            if(result != null){
                emailFound = true;
                validRegistration = false;
            }
        });
    //if no matching username or email, adds info to users table, and returns success
    if(validRegistration == true){
        dbms.dbquery("INSERT INTO USERS (USERNAME, FIRSTNAME, LASTNAME, EMAIL, PASSWORD) VALUES ('" +req.query.username +"','" +req.query.firstName +"','" +req.query.lastname +"','" +req.query.email +"','" +req.query.password +"')",
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                return;
            }
            res.send("success");
        });
    } else{ //if matching found, no user added and error message returned
        res.send("usernameFound=" +usernameFound +"emailFound=" +emailFound);
    }
});

module.exports = router;