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
            alert("Your Makaleha account has been created.")
        });
    }
    else{
        alert("You have invalid entries.")
    }
}

function validUsername(a){
    if(a == ''){
        return false;
    }
    return true;
}
function validFirstName(a){
    var num = /^\d+$/;
    if(a == ''){ // empty 
        return false;
    }
    else if(num.test(a)){ // contains digit
        return false;
    }
    return true;
}
function validLastName(a){
    var num = /^\d+$/;
    if(a == ''){
        return false;
    }
    else if(num.test(a)){
        return false;
    }
    return true;
}
function validEmail(a){
    var email = /[A-Za-z0-9]+@[A-Za-z]+.(edu|com)/
    if(email.test(a)){
        return true;
    }
    return false;
}
function validPassword(a){
    if(a == ''){
        return false;
    }
    return true;
}