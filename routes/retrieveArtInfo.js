var express = require('express');
var router = express.Router();
var db = require('./dbms');
/* POST retrieve art info. */
router.post('/', function (req, res, next) {
    var title = req.query.title;
    db.dbquery("SELECT * FROM ART WHERE TITLE = '" + title + "'", function (err, result) { // looks at users
        if (err) { // error handling
            console.log(err);
            return;
        }
        res.json(result);
    });
});
module.exports = router;