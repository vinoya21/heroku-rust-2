var express = require('express');
var router = express.Router();
var db = require('./dbms');
router.post('/', function (req, res, next) {
    var user = req.query.user;
    var title = req.query.title;
    db.dbquery("SELECT * FROM USERS WHERE USERNAME = '" + user + "'", function (err, result) {
        res.json(result);
    });
});
module.exports = router;