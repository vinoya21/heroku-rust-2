var express = require('express');
var router = express.Router();
var db = require('./dbms')
var userInfo = [];
/* POST updates account info. */
router.post('/', function (req, res, next) {
    var id = req.query.accId;
    var first = req.query.fname;
    var last = req.query.lname;
    var bio = req.query.bio;

    db.dbquery("SELECT * FROM USERS WHERE ID LIKE " + id, function (err, result) { // looks at IDs
        if (err) { // error handling
            console.log(err);
            return;
        }

        db.dbquery("UPDATE USERS SET FIRSTNAME = '" + first + "', LASTNAME = '" + last + "', BIO = " +
            bio + " WHERE ID = " + id + "", // updates user info in database
            function (error, update) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log("Account successfully updated.");
            });
        db.dbquery("SELECT * FROM USERS WHERE ID LIKE " + id, function (err, result) { // looks at IDs
            if (err) { // error handling
                console.log(err);
                return;
            }
            userInfo = result;
            res.json(userInfo);
        });
    });

});
module.exports = router;