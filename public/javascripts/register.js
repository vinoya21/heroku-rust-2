function register(){
    var username = document.getElementById('signupUsername').value;
    var firstName = document.getElementById('signupFirstName').value;
    var lastName = document.getElementById('signupLastName').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var validLogin = true;
    if(!validUsername(username)){
        validLogin = false;
    }
    if(!validFirstName(firstName)){
        validLogin = false;
    }
    if(!validLastName(lastName)){
        validLogin = false;
    }
    if(!validEmail(email)){
        validLogin = false;
    }
    if(!validPassword(password)){
        validLogin = false;
    }
    if(validLogin){
        $.post("/register?username=" +username +'&password=' +password +'&firstName=' +firstName +'&lastName=' +lastName +'&email=' +email, function(data){
            alert(data);
        });
    }
}

function validUsername(a){
    return true;
}
function validFirstName(a){
    return true;
}
function validLastName(a){
    return true;
}
function validEmail(a){
    return true;
}
function validPassword(a){
    return true;
}