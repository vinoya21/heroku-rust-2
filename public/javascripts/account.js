function editMode(){
    // div variables 
    var btn = document.getElementById('edit-btn');
    var bioDiv = document.getElementById('bio-div');
    var nameDiv = document.getElementById('name-div');
    if(btn.innerHTML == "Save Profile"){ // button - transition to saving profile 
	var fTextArea = document.getElementById('first-text');
	var lTextArea = document.getElementById('last-text');
	var bTextArea = document.getElementById('bio-text');
	var first = fTextArea.value;
	var last = lTextArea.value;
	var bio = bTextArea.value;
	// changing name, removing textarea
	document.getElementById('name').innerHTML = first + " " + last;
	nameDiv.removeChild(fTextArea);
	nameDiv.removeChild(lTextArea);

	// changing bio, removing textarea 
	var para = document.createElement("p");
	para.innerHTML = bio;
	para.id = "bio";
	bioDiv.removeChild(bTextArea);
	bioDiv.appendChild(para);
	btn.innerHTML = "Edit Profile"; // changing button
    }
    else{ // button - transition to editing profile
    var name = document.getElementById('name').innerHTML;
    var matches = name.match(/([A-Z][a-z]+) ([A-Z][a-z]+)/);
	if(matches){ // creating textarea for first and last name
	var first = document.createElement("textarea");
	first.innerHTML = matches[1];
	first.id = "first-text";
	var last = document.createElement("textarea");
	last.innerHTML = matches[2];
	last.id = "last-text";
	nameDiv.appendChild(first);
	nameDiv.appendChild(last);
	}

	// creating textarea for bio
	var bio = document.getElementById('bio');
	var bioTextArea = document.createElement("textarea");
	bioTextArea.innerHTML = bio.innerHTML;
	bioTextArea.id = 'bio-text';
	bioDiv.appendChild(bioTextArea);
	bioDiv.removeChild(bio);
	btn.innerHTML = "Save Profile"; // changing button
    }
}

    

    
