var express = require('express');
var router = express.Router();
var db = require('./dbms');
var artInfo = [];
/* POST updates account info. */
router.post('/', function (req, res, next) {
    db.dbquery("SELECT * FROM ART", function(err,result){
        if(err){
            console.log(err);
            return;
        }
        artInfo = result;
        res.json(artInfo);
    });
});
module.exports = router;