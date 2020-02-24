var express = require('express');
var router = express.Router();
var db = require('./dbms');
/* POST updates account info. */
router.post('/', function (req, res, next) {
    var username = req.query.username;
    var oldpw = req.query.old;
    var newpw = req.query.new;
    console.log(oldpw);
    db.dbquery("SELECT * FROM USERS WHERE USERNAME = '" + username + "' AND PASSWORD = '" + oldpw + "'", function (err, result) { // looks at users
        if (err) { // error handling
            console.log(err);
            return;
        }
        db.dbquery("UPDATE USERS SET PASSWORD = '" + newpw + "' WHERE USERNAME = '" + username + "'", function(err, result){
            if (err) { // error handling
                console.log(err);
                return;
            }
        });
        res.json(result);
    });
});
module.exports = router;