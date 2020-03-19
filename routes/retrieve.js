var express = require('express');
var router = express.Router();
var db = require('./dbms');
var info = [];
/* POST updates account info. */
router.post('/', function (req, res, next) {
    var type = req.query.type; 
    if(type == 'art'){
        db.dbquery("SELECT * FROM ART", function(err,result){
            if(err){
                console.log(err);
                return;
            }
            info = result;
            res.json(info);
        });
    }
    else if(type == 'outdoor'){
        db.dbquery("SELECT * FROM OUTDOOR", function(err,result){
            if(err){
                console.log(err);
                return;
            }
            info = result;
            res.json(info);
        });
    }
});
module.exports = router;