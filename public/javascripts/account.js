function editMode() {
	// div variables 
	var btn = document.getElementById('edit-btn');
	var bioDiv = document.getElementById('bio-div');
	var nameDiv = document.getElementById('name-div');
	if (btn.innerHTML == "Save Profile") { // button - transition to saving profile 
		var fTextArea = document.getElementById('first-text');
		var lTextArea = document.getElementById('last-text');
		var bTextArea = document.getElementById('bio-text');
		var username = localStorage.getItem('username');
		var first = fTextArea.value;
		var last = lTextArea.value;
		var bio = bTextArea.value;
		btn.innerHTML = "Edit Profile"; // changing button
		$.post("/updateaccount?username=" + username + "&fname=" + first + "&lname=" + last + "&bio=" + bio,
			function (user) {
				// changing name, removing textarea
				document.getElementById('name').innerHTML = user[0].FIRSTNAME + " " + user[0].LASTNAME;
				nameDiv.removeChild(fTextArea);
				nameDiv.removeChild(lTextArea);

				// changing bio, removing textarea 
				var para = document.createElement("p");
				para.innerHTML = user[0].BIO;
				para.id = "bio";
				bioDiv.removeChild(bTextArea);
				bioDiv.appendChild(para);
			});
	}
	else { // button - transition to editing profile
		var name = document.getElementById('name').innerHTML;
		var matches = name.match(/([A-Z][a-z]+) ([A-Z][a-z]+)/);
		if (matches) { // creating textarea for first and last name
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

function openAccTab(event, tab) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tab).style.display = "block";
	evt.currentTarget.className += " active";
}

function initUser() {
	username = localStorage.getItem('username');
	if(username != null){
		$.post("/initacct?username=" + username, function (user) {
			document.getElementById('name').innerHTML = user[0].FIRSTNAME + " " + user[0].LASTNAME;
			document.getElementById('bio').innerHTML = user[0].BIO;
		});
		document.getElementById("default").click();
		getFavorites(); 
	} //retrieve info needed
}

function init(){
	if(localStorage.getItem('username') != null){
		var currentPage = window.location.href;
		console.log(currentPage);
		if(currentPage == "http://localhost:3000/"){
			window.location = currentPage +"indexUser.html";
		}else{
			window.location = currentPage.replace(".html", "User.html");
		}
	} //redirect to logged in page if logged in
}

function changePassword() {
	var oldpw = document.getElementById('old-pw').value;
	var newpw = document.getElementById('new-pw').value;
	$.post("/changePassword?username=" + localStorage.getItem('username') + "&old=" + oldpw + "&new=" + newpw,
		function (user) {
			if (user == null) {
				alert("Incorrect password. Hana hou!");
			}
			else {
				alert("Maika'i! You've successfully changed password.");
				document.getElementById('old-pw').value = '';
				document.getElementById('new-pw').value = '';
			}
		});
}

function getFavorites(){
	var username = localStorage.getItem('username');
	$.post('/retrieveFavorite?user=' + username, function(result){
		if(result[0].FAVORITES != null){
			document.getElementById('favorites').innerHTML = result[0].FAVORITES; 
		}
	});
}

/*
	version: 23 FEB 2020
	TODO:
	- function for email/notif
	- function for privacy
	- function for favorites
*/