// Pelenalako Kamala
function placeOrder(){
    var notes = document.getElementById('notes').value;
    if(notes.indexOf('vegan') != -1){
        alert('Warning, cheesecakes contain dairy.');
    }
    document.getElementById('form').innerHTML = "Your order has been placed!";
}

function updateMonth(a){
    document.getElementById('dropbtn').innerHTML = a;
}