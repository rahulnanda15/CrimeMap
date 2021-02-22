			var userGlobal = ''
			var postidGlobal = ''
			var userEmail = ''
			var currentUserName = ''
			console.log("working nowfr")
			var provider = new firebase.auth.GoogleAuthProvider();
			console.log("HELLO")
			console.log("testing test testse")

			var currentdate = new Date();
			console.log(currentdate)
			console.log("geepers")
			console.log("wowowjejir")
			var curPost = ''
			console.log(" irehtrgueifjowfiej")
			
			var config = 
	        {
	            apiKey: "AIzaSyAVcq-7VCgKOojXonMs44k8ydtMVnKpepI",
			    authDomain: "communitymap-ce99c.firebaseapp.com",
			    databaseURL: "https://communitymap-ce99c-default-rtdb.firebaseio.com",
			    projectId: "communitymap-ce99c",
			    storageBucket: "communitymap-ce99c.appspot.com",
			    messagingSenderId: "1093673663402",
			    appId: "1:1093673663402:web:975f9ebd940cffbef809d3",
			    measurementId: "G-73K8VQ27H0"   
	        };

	        firebase.initializeApp(config);

	        console.log("this is a test")

	        activityFeed=[]

	        function readExisting(){
	        	var database = firebase.database();
	        	fixEmail = userEmail.replace(/[.]/g,",")
		        var userRef = database.ref('Users/'+fixEmail);
		        userRef.on('value', writeExisting, errData)
	        }
	        function writeExisting(data){
	        	var userData = data.val();
	        	fixEmail = userEmail.replace(/[.]/g,",")
	        	curUser = userData[fixEmail]

	        	document.getElementById("moveDate").value = curUser['moveDate']
	         	document.getElementById("usernameInput").value = curUser['username']
	         	var e = document.getElementById("wards"); //referencing dropdown menu value
	        	e.options[e.selectedIndex].text = curUser['ward']
	        	document.getElementById("ageInput").value = curUser['age']
	        	document.getElementById("InterestInput").value = curUser['hobbies']

	        	document.getElementById("CurrentUsername").innerHTML = "Username: " + curUser['username']
	        	document.getElementById("CurrentWard").innerHTML = "Ward: "+curUser['ward']
	        	document.getElementById("CurrentMoveDate").innerHTML = "Date Moved into the Neighborhood: "+curUser['moveDate']
	        	document.getElementById("CurrentAge").innerHTML = "Current Age: " + curUser['age']
	        	document.getElementById("CurrentHobbies").innerHTML = "Hobbies and Interests: "+curUser['hobbies']

	        	readExisting()

	        	 

	        }
	        readExisting()
	        
    		//stored in variable called "today"
    		


	        function signinout(){
	        	if (userEmail !== ''){
	        		
	        		firebase.auth().signOut().then(function() {
		              // Sign-out successful.
		            }, function(error) {
		              // An error happened.
		            });
		            userEmail = ''
		            currentUserName = ''
		            console.log(userEmail)
		            console.log('signed out')
		            //document.getElementById("userInfo").innerHTML = "";
	        		console.log("you are logged in")
	        		location.reload()
	        		
	        	}
	        	else {
	        		var provider = new firebase.auth.GoogleAuthProvider();
	            firebase.auth().signInWithRedirect(provider).then(function(result) { 
	                window.location.replace("fbtest.html");
	                location.reload()

	            });

	        	}

	        	
	        }


	        /*function typetest(){
	        	var comment = document.getElementById("testComment").value
	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues');
		        var name = document.getElementById("userFull").innerHTML
		        var date = 2-10-2020
		        commentID = String(name) + String(date)
		        //issueRef.child(issueStamp).set(data);
		        issueRef.child('20210217ResidentialRobbery0404/Comments/'+commentID).set(comment);
	        }

	        */function addPost(){

	        	document.getElementById("activityFeed").innerHTML = ""
	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues');

		        var i = document.getElementById("IssueType"); //referencing dropdown menu value
            	var issueType = i.options[i.selectedIndex].text;
            	var issueTyperF = i.options[i.selectedIndex].value;
            	console.log(issueType)
            	console.log(issueTyperF)
            	

            	var w = document.getElementById("wards"); //referencing dropdown menu value
            	var issueWard = w.options[w.selectedIndex].text;

            	var issueAddress = document.getElementById("issueAddress").value
            	var issueTime = document.getElementById("issueTime").value
            	var issueDate = document.getElementById("issueDate").value
            	console.log(issueTime)
            	console.log(issueDate)

            	var l = document.getElementById("locations"); //referencing dropdown menu value
            	var issueLocation = l.options[l.selectedIndex].text;

            	var issueDescription = document.getElementById("issueDescription").value
            	var descriptionWordcount = issueDescription.split(" ")
            	console.log(descriptionWordcount.length)
            	//var mail = document.getElementById("userEmail").innerHTML
            	var fixEmail = userEmail.replace(/[.]/g,",")
            	var issueUserName = currentUserName;

            	if (issueTyperF == 'Filler'){
            		alert("You have left an entry field empty!")
            		
            	}
            	else if (issueWard == 'Select the Ward where it Occurred'){
            		alert("You have left an entry field empty!")
            	}
            	else if (issueAddress == ''){
            		alert("You have left an entry field empty!")
            	}
            	else if (issueTime == ''){
            		alert("You have left an entry field empty!")
            	}
            	else if (issueDate == ''){
            		alert("You have left an entry field empty!")
            	}
            	else if (issueLocation == 'Select the Location Type'){
            		alert("You have left an entry field empty!")
            	}
            	else if (issueDescription == ' '){
            		alert("You have left an entry field empty!")
            	}
            	else if (descriptionWordcount.length > 50){
            		alert("You have entered too many words; You have entered "+descriptionWordcount.length+" words.")
            	}
            	
            	
            	else {
            		var data = 	            {
	              
	                User: fixEmail,
	                Name: issueUserName,
	                IssueType: issueType,
	                Ward: issueWard,
	                Address: issueAddress,
	                Time: issueTime,
	                Date: issueDate,
	                LocationType: issueLocation,
	                Description: issueDescription,
	                Comments: "",
	                Likes: "",
	                Dislikes: ""

	            }
	            issueDateF = issueDate.replace(/[-]/g,"")
	            issueTimeF = issueTime.replace(/[:]/g,"")
	            issueStamp = issueDateF + issueTyperF + issueTimeF
	            issueRef.child(issueStamp).set(data);
	            
            	}
		        
	            $('#addPostModal').modal('toggle');
	            readFeed()
	            
	        }
	        
	       
	        function findUserInfo(){
	        	var database = firebase.database();
	        	fixEmail = userEmail.replace(/[.]/g,",")
		        var userRef = database.ref('Users/'+fixEmail);
		        userRef.on('value', writeUserInfo, errData)
	        }
	        function writeUserInfo(data){
	        	var userData = data.val();
	        	console.log(userData['ward'])
	        	document.getElementById("userHead").innerHTML = "Hello "+ currentUserName +", Here's Your Profile and Account Information"
			    
			    //var keys = Object.keys(userData);
	        }
	        firebase.auth().onAuthStateChanged(function(user) {
	            if (user == null) 
	            {
	                
	                console.log(userEmail)
	            	userEmail = ''
	            	currentUserName = ''
	            	document.getElementById("signBtn").innerHTML = "Sign In"
	            	document.getElementById("userHead").innerHTML = "Hello "+ currentUserName +", Here's Your Profile and Account Information"
			    	
	                
	                return;
	            } 
	            else 
	            {
	            	userEmail = user.email;
	            	currentUserName = user.displayName
	            	//document.getElementById("userInfo").innerHTML = '<h5>Hello '+user.displayName+'! You are logged in using <h5 id="uEmail">'+userEmail+'</h5>'
	            	//user.email + " " + user.displayName
	            	
	            	console.log("signed in")
	            	console.log(userEmail)
	            	document.getElementById("signBtn").innerHTML = "Sign Out"

	            	console.log(user.displayName)
	            	findUserInfo()
	            	

	            	//document.getElementById("userFull").innerHTML = user.displayName
	            	//document.getElementById("userEmail").innerHTML = user.email

	                
	            } // end user null check
	        });
	        
			
	            
	        
			
	        function errData(err)
	        {
	            console.log('Error!')
	            console.log(err)
	        }
	        /*
	        function test(parameter){
	        	console.log(parameter)
	        }*/
	        function submitProfile(){
	         	MoveinDate = document.getElementById("moveDate").value
	         	usr = document.getElementById("usernameInput").value
	         	var e = document.getElementById("wards"); //referencing dropdown menu value
            	var torontoWard = e.options[e.selectedIndex].text;
            	usrAge = document.getElementById("ageInput").value
            	interests = document.getElementById("InterestInput").value;
            	var intWordcount = interests.split(" ")
            	
            	if (intWordcount.length > 5){
            		alert("You have entered more than 5 words")
            		return
            	}
            	
            	else if (usr == 'Your Toronto Ward...'){
            		alert("You have left a text field empty")
            	}
            	else if (torontoWard == ''){
            		alert("You have left a text field empty")
            	}
            	else if (MoveinDate == ''){
            		alert("You have left a text field empty")
            	}
            	else if (usrAge == ''){
            		alert("You have left a text field empty")
            	}
            	else if (interests == ''){
            		alert("You have left a text field empty")
            	}
            	else{
            		$('#usrModal').modal('toggle');
            		profileData = {

		            username: usr,
		            ward: torontoWard,
		            age: usrAge,
		            moveDate: MoveinDate,
		            hobbies: interests

		            }

		            //var email = document.getElementById("user").innerHTML
		        	var fixedEmail = userEmail.replace(/[.]/g,",")

		            var database = firebase.database();
		        	var Userref = database.ref('Users');

		        	Userref.child(fixedEmail).set(profileData);
            	}
	        }

