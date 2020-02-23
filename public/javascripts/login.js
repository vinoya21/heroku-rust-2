function login(){
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;
    $.post("localhost:3000/login?username=" +username +'&password=' +password, function(data){
        if(data[0] != null){
            document.getElementById('id01').style.display='none';
        } else{
            document.getElementById('invalidLogin').innerHTML = "Invalid Username or Password";
        }
    });
}