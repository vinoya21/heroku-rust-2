function init() {
    $.post('/retrieveart', function (art) { // POST for art info
        // set table attributes for all art in db
        //var table = document.createElement('TABLE');
        //table.setAttribute("border", "1"); //did this
        //table.setAttribute("frame", "void"); //did this
        //table.setAttribute("rules", "rows"); //did this
        //table.setAttribute("width", "600"); //did this
        //table.setAttribute("id", "arttable"); //did this

        // adds table to designated div
        //document.getElementById('artdisplay').appendChild(table);
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
       x.setAttribute("id","row");
       document.getElementById("infotable").appendChild(x);
       var y = document.createElement("TD");
       y.setAttribute("id","textinfo");
       var t = document.createTextNode("");
       y.appendChild(t);
       document.getElementById("row").appendChild(y);
    });
}

function displayInfo(title) { // display art info
    $.post('/retrieveArtInfo?title=' + title, function(info){
        if(info[0] != null){
            var description = "<p>" + info[0].DESCRIPTION + "</p>";
            var date = info[0].DATE;
            var creator = info[0].CREATOR;
            var creatorInfo = ''
            if(date == 0 & creator == ''){
                // do nothing
            }
            else if(date == 0){
                creatorInfo = "<p>" + "Created by " + info[0].CREATOR + "</p>";
            }
            else if(creator == ''){
                creatorInfo = "<p>" + "Created in " + date + "</p>";
            }
            else{
                creatorInfo = "<p>" + "Created by " + info[0].CREATOR + " in " + date + "</p>";
            }
            var location = info[0].LOCATIONNAME;
            var discipline = info[0].DISCIPLINE;
            document.getElementById('textinfo').innerHTML = "<h2>" + title + "</h2>" + creatorInfo
            + location + description;
        }
    });
}



/*
    version: 23 FEB 2020
    TODO: have list scrollable, while info display is fixed on page
*/