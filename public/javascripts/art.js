function init() {
    $.post('/retrieveart', function (art) { // POST for art info
        // loop through all art objects 
        for (var i = 1; i < art.length; i++) {
            if (art[i].TITLE != '') { // don't want art with no title
                // object title
                var title = art[i].TITLE;
                // create row
                var x = document.createElement("TR");
                x.setAttribute("id", "'entry" + i + "'");

                // add to table
                document.getElementById("arttable").appendChild(x);

                // create column w/ info
                var y = document.createElement("TD");
                var t = document.createTextNode(title);
                y.appendChild(t);
                document.getElementById("'entry" + i + "'").appendChild(y);
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
    if (localStorage.getItem('username') != null) {
        setLoggedIn();
    }
    else {
        setLoggedOut();
    }
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
    $.post("/retrieveArtInfo?title=" + newtitle, function (info) {
        document.getElementById('textinfo').innerHTML = '';
        if (info[0] != null) {
            // FAVORITES BUTTON FUNCTIONALITY TO BE ADDED LATER
            var user = localStorage.getItem('username');
            if (user != null) {
                if (checkFavorites(user, newtitle)) {
                    document.getElementById('textinfo').innerHTML = "<button id='fav' class='saved-btn'> FAVORITE </button><br><br>";
                    document.getElementById("fav").addEventListener('click', function () {
                        removeItem(user, newtitle);
                    });
                }
                else {
                    document.getElementById('textinfo').innerHTML = "<button id='fav' class='unsaved-btn'> FAVORITE </button><br><br>";
                    document.getElementById("fav").addEventListener('click', function () {
                        addItem(user, newtitle);
                    });
                }
            }
            var description = "<p>" + info[0].DESCRIPTION + "</p>";
            var date = info[0].DATE;
            var creator = info[0].CREATOR;
            var creatorInfo = ''
            if (date == 0 & creator == '') {
                // do nothing
            }
            else if (date == 0) {
                creatorInfo = "<p>" + "Created by " + info[0].CREATOR + "</p>";
            }
            else if (creator == '') {
                creatorInfo = "<p>" + "Created in " + date + "</p>";
            }
            else {
                creatorInfo = "<p>" + "Created by " + info[0].CREATOR + " in " + date + "</p>";
            }
            var location = info[0].LOCATIONNAME;
            var discipline = info[0].DISCIPLINE;
            document.getElementById('textinfo').innerHTML += "<h2>" + title + "</h2>" + creatorInfo
                + location + description;
        }
    });
}

function checkFavorites(user, title){
    $.post("/retrieveFavorite?user=" + user + "&title=" + title, function(result){
        if(result[0] != ''){
            return true; 
        }
    }); 
    return false; 
}

function addItem(user, title){
    alert("attempting to add"); // IT'S NOT EVEN GOING IN HERE
    $.post("/changeFavorites?type=add&user=" + user + "&title=" + title, function(result){

    });
}

function removeItem(user, title){
    alert("attempting to remove");
    $.post("/changeFavorites?type=remove&user=" + user + "&title=" + title, function(result){

    });
}

function search_art() {
    let input = document.getElementById('searchbar_input_art').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('artclass');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "table-cell";
        }
    }


}



/*
    version: 23 FEB 2020
    TODO: have list scrollable, while info display is fixed on page
*/