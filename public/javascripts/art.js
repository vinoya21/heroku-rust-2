function init() {
    $.post('/retrieveart', function (art) { // displays title of art TODO: add more info and possible links
        var html = "<table width='600'><tr>";
        for (var i = 1; i < art.length; i++) {
            if(art[i].TITLE != ''){
                var title = "<h2>" + art[i].TITLE + "</h2>";
                var location = "<p>" + art[i].LOCATIONNAME + "</p>";
                var creatorInfo = "<p>" + art[i].CREATOR + " " + art[i].DATE + "</p>";
                html += "<td>"
                html += title + location + creatorInfo;
                html += "</td>";
                html += "</tr><tr>";
            }
        }
        html += "</tr></table>";
        document.getElementById("artdisplay").innerHTML = html;
    });
}