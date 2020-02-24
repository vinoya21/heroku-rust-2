function init() {
    $.post('/retrieveart', function (art) { // displays title of art TODO: add more info and possible links
        //var html = "<table border=1 frame=void rules=rows width='600'><tr>";
        var table = document.createElement('TABLE');
        table.setAttribute("border", "1");
        table.setAttribute("frame", "void");
        table.setAttribute("rules", "rows");
        table.setAttribute("width", "600");
        table.setAttribute("id", "arttable");
        document.getElementById('artdisplay').appendChild(table);
        for (var i = 1; i < art.length; i++) {
            if (art[i].TITLE != '') {
                // object info
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
        var allRowsOnPage = document.querySelectorAll('TD');
        allRowsOnPage.forEach(function (row, index) {
            row.addEventListener('click', function () {
                displayInfo(row.innerHTML);
            });
        });
        /*
        https://www.nickang.com/add-event-listener-for-loop-problem-in-javascript/
        */
       var infoTable = document.createElement("TABLE");
       infoTable.setAttribute("width", "600");
       infoTable.setAttribute("id", "infotable");
       document.getElementById('artdisplay').appendChild(infoTable);
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

function displayInfo(title) {
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
    TODO: have list scrollable, while info display is fixed on page

*/