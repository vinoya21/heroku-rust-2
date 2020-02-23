function login(){
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;
    $.post("/login?username=" +username +'&password=' +password, function(data){
        if(data[0] != null){
            document.getElementById('id01').style.display='none';
            var div_btn = document.getElementById('loginbtns');
            div_btn.innerHTML = "<button style='width:100px' id='acct'>Account</button>"
            var btn = document.getElementById('acct');
            btn.setAttribute("onclick","window.location.href = 'accountpage.html';");
        } else{
            document.getElementById('invalidLogin').innerHTML = "Invalid Username or Password";
        }
    });
}