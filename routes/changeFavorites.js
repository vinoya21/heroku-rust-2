var express = require('express');
var router = express.Router();
var db = require('./dbms');
router.post('/', function (req, res, next) {
    var user = req.query.user;
    var title = req.query.title;
    var type = req.query.type;
    db.dbquery("SELECT * FROM USERS WHERE USERNAME = '" + user + "'", function (err, result) {
        if (type == "add") {
            if (result[0].FAVORITES != null) {
                var favoriteList = (result[0].FAVORITES).split(",");
                favoriteList.push(title);
                var newlist = '';
                for (var i = 0; i < favoriteList.length; i++) {
                    if (i != favoriteList.length - 1) {
                        newlist += favoriteList[i] + ",";
                    }
                    else {
                        newlist += favoriteList[i];
                    }
                }
                db.dbquery("UPDATE USERS SET FAVORITES='" + newlist + "' WHERE USERNAME='" + user + "'", function (err, result) {
                    if(err){
                        console.log("Unable to add favorite: " + title);
                    }
                    else{
                        console.log("Successfully added new favorite: " + title);
                    }
                });
            }
            else {
                var newlist = title;
                db.dbquery("UPDATE USERS SET FAVORITES='" + newlist + "' WHERE USERNAME='" + user + "'", function (err, result) {
                    console.log("Successfully added new favorite: " + title);
                });
            }
        }
        else if (type == "remove") {

        }
    });
});
module.exports = router;