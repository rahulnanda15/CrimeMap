			var userGlobal = ''
			var postidGlobal = ''
			var userEmail = '' //setting global variables
			var currentUserName = ''
			
			var provider = new firebase.auth.GoogleAuthProvider();
			
			var currentdate = new Date();
			console.log(currentdate)
			var curPost = ''
			
			
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

	        

	        activityFeed=[] //empties activity feed inner HTML


    		


	        function signinout(){ //checks if user is logged in
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

	        		//if logged out, set heading/title of page with a greeting

	        		document.getElementById("userHead").innerHTML = "Hello, Here's the Activity Feed and Neighborhood Map for the GTA"
			    	document.getElementById("mapTitle").innerHTML = "Neighborhood Issue Map: "
	        	}
	        	else { //if logged in, change button function to log out 
	        		var provider = new firebase.auth.GoogleAuthProvider();
	            firebase.auth().signInWithRedirect(provider).then(function(result) { 
	                window.location.replace("fbtest.html");

	            });

	        	}

	        	
	        }


	        function addPost(){ //adds post to the activity feed


	        	document.getElementById("activityFeed").innerHTML = "" //empty activity feed div

	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues'); //reference needed database references

		        var i = document.getElementById("IssueType"); //referencing dropdown menu values
            	var issueType = i.options[i.selectedIndex].text;
            	var issueTyperF = i.options[i.selectedIndex].value;
            	

            	var w = document.getElementById("wards"); //referencing dropdown menu value
            	var issueWard = w.options[w.selectedIndex].text;

            	var issueAddress = document.getElementById("issueAddress").value //referencing input bar values
            	var issueTime = document.getElementById("issueTime").value
            	var issueDate = document.getElementById("issueDate").value

            	var l = document.getElementById("locations"); //referencing dropdown menu value
            	var issueLocation = l.options[l.selectedIndex].text;

            	var issueDescription = document.getElementById("issueDescription").value //referencing inputted text area value
            	
            	var descriptionWordcount = issueDescription.split(" ") //splitting description text into an array
            	
            	var fixEmail = userEmail.replace(/[.]/g,",") //formatting email address to be inputted to database
            	//firebase does not accept periods in emails

            	var issueUserName = currentUserName; //referencing the user inputting the post

            	//error statements/handling

            	//checking for empty inputs
            	if (issueTyperF == 'Filler'){
            		alert("You have left an entry field empty!")
            		
            	}//checking for empty inputs
            	else if (issueWard == 'Select the Ward where it Occurred'){
            		alert("You have left an entry field empty!")
            	}//checking for empty inputs
            	else if (issueAddress == ''){
            		alert("You have left an entry field empty!")
            	}//checking for empty inputs
            	else if (issueTime == ''){
            		alert("You have left an entry field empty!")
            	}//checking for empty inputs
            	else if (issueDate == ''){
            		alert("You have left an entry field empty!")
            	}//checking for empty inputs
            	else if (issueLocation == 'Select the Location Type'){
            		alert("You have left an entry field empty!")
            	}//checking for empty inputs
            	else if (issueDescription == ' '){
            		alert("You have left an entry field empty!")
            	}
            	//checking whether description text area's word count was too long
            	else if (descriptionWordcount.length > 50){
            		alert("You have entered too many words; You have entered "+descriptionWordcount.length+" words.")
            	}
            	
            	//if no errors, continue to create JSON data structure
            	else {
            		var data = 	            { //data inputted to database
	              
	                User: fixEmail,
	                Name: issueUserName,
	                IssueType: issueType,
	                Ward: issueWard,
	                Address: issueAddress,
	                Time: issueTime,
	                Date: issueDate,
	                LocationType: issueLocation,
	                Description: issueDescription,
	                Comments: "", //comments, likes, dislikes are empty as other users add to them
	                Likes: "",
	                Dislikes: ""

	            }
	            issueDateF = issueDate.replace(/[-]/g,"")
	            issueTimeF = issueTime.replace(/[:]/g,"")
	            issueStamp = issueDateF + issueTyperF + issueTimeF //creating the postID

	            //setting data to database as child of issue reference
	            issueRef.child(issueStamp).set(data);
	            
            	}
		        
	            $('#addPostModal').modal('toggle'); //close modal
	            readFeed() //execute function that re-reads feed and updates the map sinc new post was added
	            
	        }
	        
	       
	        function findWard(){ //fetches user information
	        	var database = firebase.database();
	        	fixEmail = userEmail.replace(/[.]/g,",")
		        var userRef = database.ref('Users/'+fixEmail);
		        userRef.on('value', writeWard, errData)
	        }
	        function writeWard(data){ //function sets header HTML with a greeting including user information
	        	var userData = data.val();
	        	console.log(userData['ward'])
	        	document.getElementById("userHead").innerHTML = "Hello "+ currentUserName +", Here's the Activity Feed and Neighborhood Map for the GTA"
			    document.getElementById("mapTitle").innerHTML = "Neighborhood Issue Map:"
			    //var keys = Object.keys(userData);
	        }
	        firebase.auth().onAuthStateChanged(function(user) { //if user is/is not logged in, change global variables
	            if (user == null) 
	            {
	                
	                console.log(userEmail)
	            	userEmail = '' //empty email variable
	            	currentUserName = '' //empty user name variable
	            	document.getElementById("signBtn").innerHTML = "Sign In" //changes login/out button text to sign in
	            	//changes heading of page
	            	document.getElementById("userHead").innerHTML = "Hello, Here's the Activity Feed and Neighborhood Map for the GTA"
			    	document.getElementById("mapTitle").innerHTML = "Neighborhood Issue Map: "
	                
	                return;
	            } 
	            else  //if logged in
	            {
	            	userEmail = user.email; //set variable as user email and name
	            	currentUserName = user.displayName
	            	//document.getElementById("userInfo").innerHTML = '<h5>Hello '+user.displayName+'! You are logged in using <h5 id="uEmail">'+userEmail+'</h5>'
	            	//user.email + " " + user.displayName
	            	
	            	
	            	document.getElementById("signBtn").innerHTML = "Sign Out" //change button text to Sign out

	            	console.log(user.displayName)
	            	findWard()

	            	

	                
	            } // end user null check
	        });
	        function readFeed(){

	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues'); //fetches data on inputted posts and issues
		        issueRef.on('value', writeFeed, errData)

	        }

	        function writeFeed(data){ //writes the cards and posts in the entire activity feed
	        	var issueData = data.val();
			    var keys = Object.keys(issueData); // variable for fetched data
			    console.log(keys)
			    
			    activityFeed = [] //empties activity feed so it can be written again
			    document.getElementById("activityFeed").innerHTML = ""

			    for (var i=0;i<keys.length;i++){ //for loop that prints each post to the activity feed
			    	var k = keys[i]; //variable is the post ID of each post in database
			    	console.log(issueData[k]["Time"])

			    	//empties comments
			    	commentList = []

			    	//variables for post specific data
			    	var iAddress = issueData[k]["Address"]
			    	var iDate = issueData[k]["Date"]
			    	var iDescription = issueData[k]["Description"]
			    	var iIssueType = issueData[k]["IssueType"]
			    	var iLocation = issueData[k]["LocationType"]
			    	var iTime = issueData[k]["Time"]
			    	var iWard = issueData[k]["Ward"]
			    	var uid = issueData[k]['Name']
			    	var iEmail = issueData[k]['User']
			    	var iLikes = issueData[k]['Likes']
			    	var iDislikes = issueData[k]['Dislikes']
			    	console.log(iLikes)
			    	likeList = []

			    	for (z in iLikes){ //loops through likes in post
			    		likeList.push(iLikes[z]) //adds/counts all likes in post
			    		var likekeys = Object.keys(iLikes);
			    		console.log(likekeys)
			    	}
			    	console.log(likeList.length)

			    	dislikeList = []
			    	for (y in iDislikes){ //loops through dislikes in post
			    		dislikeList.push(iDislikes[y]) //adds/counts all dislikes in post
			    	}
			    	console.log(dislikeList.length)
			    		

			    	console.log(String(k))
					var pID = "'"+String(k)+"'" //fetching ID of the post in database
					var EmailParameter = "'"+String(iEmail)+"'" //fetching string email of user who added the post

					console.log(issueData[k]['Comments'])
					allComments = issueData[k]['Comments']
					
					for (comment in allComments){
						console.log(allComments[comment])
						commentList.push(allComments[comment]) //adds each comment to a comment array
					}
			    	var safeAddress = iAddress.replace(/[0-9]/g, ''); //takes number out of issue address to avoid publishing private data

			    	//creating the innerHTML of the cards in activity feed using variables and references to data

			    	//div id is set as the post ID, so each card is unique

			    	var headDiv = '<div id="iUser'+k+'">'+uid+' | '+iIssueType+' | '+iWard+' | '+iDate+'</div>'
			    	var infoDiv = '<div id="iInfo">This issue occurred on'+safeAddress+' at '+iTime+' ('+iLocation+')</div>'
			    	var descriptionDiv = '<div id = "iDescription"><h6 class ="font-weight-bold">Neighbour Description: </h6>'+iDescription+'</div><br>'

			    	//using post ID variables as the parameter for functions to ensure that unique information is shown to each and that comments can be added to the correct area/post on actiivty feed
			    	var commentDiv = '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Add a Comment</span></div><input type="text" id="comment'+k+'" class="form-control"><button class="btn btn-primary" onclick="postComment('+pID+')" id="btn'+pID+'">Submit</button></div>'
			    	//sets like/dislike button parameters as the ID of the post to ensure that likes are added to its correct corresponding post
			    	var feedbackDiv = '<div class="float-right"><button class="btn btn-primary" onclick="readUsers('+EmailParameter+')">See User</button> <button onclick="like('+pID+')" class="btn btn-primary"><i class="far fa-thumbs-up"></i> | '+likeList.length+'</button>  <button class="btn btn-primary" onclick="dislike('+pID+')"><i class="far fa-thumbs-down"></i> | '+dislikeList.length+'</button> <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#comcontent'+k+'" aria-expanded="false" aria-controls="collapseExample">View Comments</button></div>'
			    	
			    	//prints all comments to the screen
			    	
			    	

			    	var commentFull = '<div class="collapse" id="comcontent'+k+'">'+commentList.join("<br>")+'</div>'
			    	
			    	//variable that compiles innerHTML of all previous set variables above. It references the card classes for Bootstrap
			    	var postContent = '<div id="iPost'+k+'" class="card"><h6 class="card-header">'+headDiv+'</h6><div class="card-body">'+infoDiv+'<br>'+descriptionDiv+feedbackDiv+'</div><div class="card-footer">'+commentDiv+commentFull+'</div></div>'

			    		//"+postID+"
			    	activityFeed.push(postContent) //adds the innerHTML of each post to the activity feed array
			    	
			    	

			    }
			    //prints activity feed to screen
			    document.getElementById("activityFeed").innerHTML = activityFeed.join("<br>")
			    console.log(document.getElementById("activityFeed").innerHTML)
			    
	        }
	        
	        //function that adds comment to post
	        function postComment(PostID){ //uses the Post ID parameter to specify which comment the post belongs to
	        	console.log(PostID)
	        	var inputName = "comment"+PostID
	        	console.log(inputName)

	        	var comment = document.getElementById(inputName).value //referencing user input for comment

	        	//error checking for empty input and not logged in user
	        	if (comment == ''){
	        		alert("Please Enter Text into the Comment Section")
	        		return;
	        	}
	        	else if (userEmail == ''){
	        	
	        		alert("You must be logged in to use this feature!")
	        		return;

	        	}
	        	else{ //if no errors, add comment to database
	        		var database = firebase.database();
			        var issueRef = database.ref('NeighborhoodIssues');
			        //var name = document.getElementById("userFull").innerHTML

			        var today = new Date(); //creating time stamp of comment
					var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
					var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
					var dateTime = date+' '+time;

			        commentID = String(currentUserName) + String(dateTime) //creating Comment ID to be used in database

			        //creating actual comment by taking user input and pairing it with its time stamp
			        var Fullcomment = currentUserName + ' says at '+currentdate+', '+comment
			        currentdate
			        
			        issueRef.child(PostID+'/Comments/'+commentID).set(Fullcomment); //add comment to the correct Post
			        //location.reload()
	        	}
	        	
	        }
	        
	        

	        function readUsers(uPost){ //function for "See User" button. Uses the parameter of the user who made the post
	        	//see user function shows a modal of information about the user who posted the issue to the activity feed
	        	var database = firebase.database();
		        var userRef = database.ref('Users'); //fetches user data
		        userGlobal = uPost //sets variable as user who created the post. This global variable is referenced in the next function
		        userRef.on('value', findUser, errData)

	        }
	        function findUser(data){
	        	$('#userInfoModal').modal('show'); //displays modal of user info
	        	var userData = data.val(); //refernces data
			    var userkeys = Object.keys(userData);
			    
			    var usr = userData[userGlobal] //finds child in database of the user

			    //uses usr variable to reference all information in database
			    //sets innerHTML of the modal as the user's information
			    document.getElementById("userInfoModalLabel").innerHTML = '' 
			    document.getElementById("userInfoModalLabel").innerHTML = usr['username']+'<i class="fas fa-user-alt" style="color:#0275d8;padding-left: 10px;"></i>'
			    document.getElementById("userInfoBody").innerHTML = ''
			    document.getElementById("userInfoBody").innerHTML = 'Age: '+usr['age']+'<br> Hobbies and Interests: '+usr['hobbies']+'<br> Current Ward: '+usr['ward']+'<br> Date Moved into the Neighborhood: '+usr['moveDate']
			    
	        }

			
	        function errData(err)
	        {
	            console.log('Error!')
	            console.log(err)
	        }
	        

	        function like(AlertID1){ //like button function. Uses parameter of the Post ID

	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues/'+AlertID1+'/Likes'); //references data of the people who liked the post
		        
		        //var dislikeRef = database.ref('NeighborhoodIssues/'+AlertID2+'/Dislikes');
		        //var currentUser = document.getElementById("userEmail").innerHTML

		        var formatUser = userEmail.replace(/[.]/g,",") //gets rid of periods in user email
		        issueRef.child(formatUser).set(formatUser); //adds like to the post in database
		        
	        	
	        }
	        function dislike(AlertID2){ //dislike button function. Uses parameter of the Post ID

	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues/'+AlertID2+'/Dislikes');//references data of the people who disliked the post
		        //var dislikeRef = database.ref('NeighborhoodIssues/'+AlertID2+'/Dislikes');
		        //var currentUser = document.getElementById("userEmail").innerHTML
		        var formatUser = userEmail.replace(/[.]/g,",") //replaces periods in user email with commas
		        issueRef.child(formatUser).set(formatUser); //adds dislike to the post in database
		        
	        	
	        }
	        


	        
	        readFeed() //executes read feed once again to update activity feed

