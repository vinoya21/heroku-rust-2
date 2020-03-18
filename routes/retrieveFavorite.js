var express = require('express');
var router = express.Router();
var db = require('./dbms');
router.post('/', function (req, res, next) {
    var user = req.query.user;
    db.dbquery("SELECT * FROM USERS WHERE USERNAME = '" + user + "'", function (err, result) {
        res.json(result);
    });
});
module.exports = router;