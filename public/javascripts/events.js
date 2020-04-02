function init() {
    $.post('/retrieve?type=events', function (event) { // POST for art info
        // loop through all art objects 
        var titleList = new Array();
        for (var i = 0; i < event.length; i++) {
            if (event[i].TITLE != '') { // don't want art with no title
                // object title
                var title = event[i].TITLE;

                if (!titleList.includes(title)) {
                    titleList.push(title);

                    // create row
                    var x = document.createElement("TR");
                    x.setAttribute("id", "'entry" + i + "'");

                    // add to table
                    document.getElementById("eventtable").appendChild(x);


                    // create column w/ info
                    var y = document.createElement("TD");

                    // put newly created element in the art class
                    y.className = "eventclass";

                    var t = document.createTextNode(title);
                    y.appendChild(t);
                    document.getElementById("'entry" + i + "'").appendChild(y);
                }

            }
        }
        // add eventlistener to all art rows
        var allRowsOnPage = document.querySelectorAll('TD');
        allRowsOnPage.forEach(function (row, index) {
            row.addEventListener('click', function () {
                displayInfo(row.innerHTML); // when clicked display art info
            });
        });
        /*
        Purpose: To add event listener to all art, not just last one
        https://www.nickang.com/add-event-listener-for-loop-problem-in-javascript/
        */
        // add table to display art info
        var infoTable = document.createElement("TABLE");
        infoTable.setAttribute("width", "700");
        infoTable.setAttribute("id", "infotable");
        document.getElementById('displaytext').appendChild(infoTable);
        var x = document.createElement("TR");
        x.setAttribute("id", "row");
        document.getElementById("infotable").appendChild(x);
        var y = document.createElement("TD");
        y.setAttribute("id", "textinfo");
        var t = document.createTextNode("");
        y.appendChild(t);
        document.getElementById("row").appendChild(y);
    });
}

function addRowListener(row, location){
    row.addEventListener('click', function () {
        if(map.getZoom() < 20)
            map.setZoom(20);
        map.panTo(location);
    });
}
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 21.4689, lng: -158.0001},
        zoom: 10.25
    });
    $.post('/retrieve?type=events', function (event) { // POST for art info
        // loop through all art objects 
        for (var i = 1; i < event.length; i++) {
            if (event[i].TITLE != '') { // don't want art with no title
                // object title
                var location = event[i].LOCATION;
                var description = info[0].DESCRIPTION;
                createMarker(title, location, description);
            }
        }
    });
}

function createMarker(title, location, description){
    var marker = new google.maps.Marker({title: name, position: pos, map: map});
    var creatorCreditDate = "";
    if(creator != ""){
        if(credit !=""){
            if(date != ""){
                creatorCreditDate = '<p>'+
                creator+ ', '+ credit+ ', '+ date+
                '</p>';
            } else{
                creatorCreditDate = '<p>'+
                creator+ ', '+ credit+
                '</p>';
            }
        } else{
            if(date != ""){
                creatorCreditDate = '<p>'+
                creator+ ', '+ date+
                '</p>';
            } else{
                creatorCreditDate = '<p>'+
                creator+
                '</p>';
            }
        }
    } else{
        if(credit !=""){
            if(date != ""){
                creatorCreditDate = '<p>'+
                credit+ ', '+ date+
                '</p>';
            } else{
                creatorCreditDate = '<p>'+
                credit+
                '</p>';
            }
        } else{
            if(date != ""){
                creatorCreditDate = '<p>'+
                date+
                '</p>';
            }
        }
    }
    var favoriteButton = "";
    var user = localStorage.getItem('username');
    if (user != null) {
        favoriteButton = '<span class="favoriteButton" onclick="favoriteButton(\''+user+'\', \''+name+'\')">&star;</span>';
    }
    var content = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">'+
    name+
    '</h1>'+
    '<div id="bodyContent">'+
    '<p>'+
    description+
    '</p>'+
    creatorCreditDate+
    '<p>'+
    " Access: "+
    access+
    '</p>'+
    favoriteButton+
    '</div>'+
    '</div>'
    var infowindow = new google.maps.InfoWindow({
        content: content
    });
    google.maps.event.addListener(marker, 'click', function() {
        if(map.getZoom() < 15)
            map.setZoom(15);
        map.panTo(marker.getPosition());
        if (activeInfoWindow){
            activeInfoWindow.close();
        }
        infowindow.open(map, marker);
        activeInfoWindow = infowindow;
        if (user != null) {
            initFavorite(user, name);
        }
    }); 
}

function displayInfo(title) { // display art info
    /* BEGINNING: ADD THIS PORTION TO OTHER RETRIEVAL PAGES FOR ESCAPE CHAR ISSUE */
    var newtitle = '';
    for (var i = 0; i < title.length; i++) { // needed this because & is a reserved character
        if (title[i] == "&") {
            newtitle += "%26";
            i += 4;
        }
        else {
            newtitle += title[i];
        }
    }
    /* END OF ADDING */
    /*
    CITATION: https://stackoverflow.com/questions/16622504/escaping-ampersand-in-url
    Needed to understand why & was not passing through URL parameter. 
    */
    $.post("/retrieveInfo?type=events&title=" + newtitle, function (info) {
        document.getElementById('textinfo').innerHTML = '';


        if (info[0] != null) { // NEED TO CHANGE THIS DEPENDING ON SERVICE TABLE
            // FAVORITES BUTTON FUNCTIONALITY TO BE ADDED LATER
            var user = localStorage.getItem('username');
            if (user != null) {
                checkFavorites(user, newtitle);
            }
            var location = "<p>" + info[0].LOCATION + '</p>';
            //var date = getDate(info[0].STARTDATE, info[0].ENDDATE, info[0].STARTTIME, info[0].ENDTIME);
            var description = "<p>" + info[0].DESCRIPTION + '</p>';
            document.getElementById('textinfo').innerHTML = '<h2>' + title + '</h2>' + location + description; 
        }
    });
}

//search art function
function search_art() {
    let input = document.getElementById('searchbar_input_event').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('eventclass');
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "table-cell";
        }
    }
}

function checkFavorites(user, title) {
    $.post("/retrieveFavorite?user=" + user + "&title=" + title, function (result) {
        var foundTitle = false;
        if (result[0].FAVORITES != null) {
            favoriteList = (result[0].FAVORITES).split(",");
            for (var i = 0; i < favoriteList.length; i++) {
                if (favoriteList[i] == title) {
                    foundTitle = true;
                }
            }
        }
        if (foundTitle) {
            document.getElementById('textinfo').innerHTML += "<button id='fav' class='saved-btn'> FAVORITE </button><br><br>";
            document.getElementById("fav").addEventListener('click', removeItem, false);
            document.getElementById("fav").username = user;
            document.getElementById("fav").title = title;

        }
        else {
            document.getElementById('textinfo').innerHTML += "<button id='fav' class='unsaved-btn'> FAVORITE </button><br><br>";
            document.getElementById("fav").addEventListener('click', addItem, false);
            document.getElementById("fav").username = user;
            document.getElementById("fav").title = title;
        }
    });
}
/*
FIXED ISSUE WITH NOT GOING IN ADDITEM AND REMOVEITEM FUNCTION
https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function.
*/
function addItem(evt) {
    var user = evt.currentTarget.username;
    var title = evt.currentTarget.title;
    $.post("/changeFavorites?type=add&user=" + user + "&title=" + title, function (result) {
    });
    displayInfo(title);
}

function removeItem(evt) {
    var user = evt.currentTarget.username;
    var title = evt.currentTarget.title;
    $.post("/changeFavorites?type=remove&user=" + user + "&title=" + title, function (result) {
    });
    displayInfo(title);
}