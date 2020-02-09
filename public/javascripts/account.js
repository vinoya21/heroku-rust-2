function editMode(){
    var btn = document.getElementById('edit-btn');
    if(btn.innerHTML == "Save Profile"){
	var fTextArea = document.getElementById('first-text');
	var lTextArea = document.getElementById('last-text');
	var first = fTextArea.value;
	var last = lTextArea.value;
	document.getElementById('name').innerHTML = first + " " + last;
	document.getElementById('name-div').removeChild(fTextArea);
	document.getElementById('name-div').removeChild(lTextArea);
	btn.innerHTML = "Edit Profile";
    }
    else{
    var name = document.getElementById('name').innerHTML;
    var matches = name.match(/([A-Z][a-z]+) ([A-Z][a-z]+)/);
	if(matches){
	var first = document.createElement("textarea");
	first.innerHTML = matches[1];
	first.id = "first-text";
	var last = document.createElement("textarea");
	last.innerHTML = matches[2];
	last.id = "last-text";
	document.getElementById('name-div').appendChild(first);
	document.getElementById('name-div').appendChild(last);
	}
	btn.innerHTML = "Save Profile";
    }
}

    

    
