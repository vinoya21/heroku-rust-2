function init() {
    $.post('/retrieveart', function (art) { // displays title of art TODO: add more info and possible links
        var html = "<table><tr>";
        for (var i = 1; i < art.length; i++) {
            html += "<td>" + art[i].TITLE + "</td>";
                html += "</tr><tr>";
        }
        html += "</tr></table>";
        document.getElementById("artdisplay").innerHTML = html;
    });
}