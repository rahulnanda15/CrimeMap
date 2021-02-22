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
	        		document.getElementById("userHead").innerHTML = "Hello, Here's the Activity Feed and Neighborhood Map for the GTA"
			    	document.getElementById("mapTitle").innerHTML = "Neighborhood Issue Map: "
	        	}
	        	else {
	        		var provider = new firebase.auth.GoogleAuthProvider();
	            firebase.auth().signInWithRedirect(provider).then(function(result) { 
	                window.location.replace("fbtest.html");

	            });

	        	}

	        	
	        }


	        function addPost(){


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
	        
	        /*function testing(){
	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues');
		        var data = 
	            {
	              
	                IssueType: "Lost Dog",
	                Ward: "scarborough",
	                Address: "3 Quail Ridge Road",
	                Time: "7:30",
	                Date: "Feb. 3. 2021",
	                LocationType: "Park",
	            }
	           	        
		        //IssueStamp = "RahulN03-55-4"
		        //issueRef.child(IssueStamp).set(data);
	        }*/

	        /*list = []
	        function add(){
	        	list.push("testing")
	        	print()

	        }
	        function print(){	
	        	document.getElementById("tester").innerHTML = list

	        }
	        add()
	        print()*/
	        function findWard(){
	        	var database = firebase.database();
	        	fixEmail = userEmail.replace(/[.]/g,",")
		        var userRef = database.ref('Users/'+fixEmail);
		        userRef.on('value', writeWard, errData)
	        }
	        function writeWard(data){
	        	var userData = data.val();
	        	console.log(userData['ward'])
	        	document.getElementById("userHead").innerHTML = "Hello "+ currentUserName +", Here's the Activity Feed and Neighborhood Map for the GTA"
			    document.getElementById("mapTitle").innerHTML = "Neighborhood Issue Map:"
			    //var keys = Object.keys(userData);
	        }
	        firebase.auth().onAuthStateChanged(function(user) {
	            if (user == null) 
	            {
	                
	                console.log(userEmail)
	            	userEmail = ''
	            	currentUserName = ''
	            	document.getElementById("signBtn").innerHTML = "Sign In"
	            	document.getElementById("userHead").innerHTML = "Hello, Here's the Activity Feed and Neighborhood Map for the GTA"
			    	document.getElementById("mapTitle").innerHTML = "Neighborhood Issue Map: "
	                
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
	            	findWard()

	            	//document.getElementById("userFull").innerHTML = user.displayName
	            	//document.getElementById("userEmail").innerHTML = user.email

	                
	            } // end user null check
	        });
	        function readFeed(){

	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues');
		        issueRef.on('value', writeFeed, errData)

	        }

	        function writeFeed(data){
	        	var issueData = data.val();
			    var keys = Object.keys(issueData);
			    console.log(keys)
			    //console.log(issueData)
			    activityFeed = []
			    document.getElementById("activityFeed").innerHTML = ""

			    for (var i=0;i<keys.length;i++){
			    	var k = keys[i];
			    	console.log(issueData[k]["Time"])
			    	commentList = []


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
			    	for (z in iLikes){
			    		likeList.push(iLikes[z])
			    		var likekeys = Object.keys(iLikes);
			    		console.log(likekeys)
			    	}
			    	console.log(likeList.length)

			    	dislikeList = []
			    	for (y in iDislikes){
			    		dislikeList.push(iDislikes[y])
			    	}
			    	console.log(dislikeList.length)
			    		
			    	//document.getElementById("userFull").innerHTML

			    	console.log(String(k))
					var pID = "'"+String(k)+"'"
					var EmailParameter = "'"+String(iEmail)+"'"
					console.log(issueData[k]['Comments'])
					allComments = issueData[k]['Comments']
					
					for (comment in allComments){
						console.log(allComments[comment])
						commentList.push(allComments[comment])
					}
			    	var safeAddress = iAddress.replace(/[0-9]/g, '');
			    	console.log(safeAddress)

			    	var headDiv = '<div id="iUser'+k+'">'+uid+' | '+iIssueType+' | '+iWard+' | '+iDate+'</div>'
			    	var infoDiv = '<div id="iInfo">This issue occurred on'+safeAddress+' at '+iTime+' ('+iLocation+')</div>'
			    	var descriptionDiv = '<div id = "iDescription"><h6 class ="font-weight-bold">Neighbour Description: </h6>'+iDescription+'</div><br>'
			    	var commentDiv = '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Add a Comment</span></div><input type="text" id="comment'+k+'" class="form-control"><button class="btn btn-primary" onclick="postComment('+pID+')" id="btn'+pID+'">Submit</button></div>'
			    	var feedbackDiv = '<div class="float-right"><button class="btn btn-primary" onclick="readUsers('+EmailParameter+')">See User</button> <button onclick="like('+pID+')" class="btn btn-primary"><i class="far fa-thumbs-up"></i> | '+likeList.length+'</button>  <button class="btn btn-primary" onclick="dislike('+pID+')"><i class="far fa-thumbs-down"></i> | '+dislikeList.length+'</button> <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#comcontent'+k+'" aria-expanded="false" aria-controls="collapseExample">View Comments</button></div>'
			    	//var commentContent = '<div class="collapse" id="comcontent'+k+'"><div class="card card-body">'+commentList.join("<br>")+'</div></div>'
			    	var commentContent = '<div id="comcontent'+k+'">'+commentList.join("<br>")+'</div>'
			    	
			    	var comButton = '<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#comcontent'+k+'" aria-expanded="false" aria-controls="collapseExample">Button with data-target</button>'
			    	var commentFull = '<div class="collapse" id="comcontent'+k+'">'+commentList.join("<br>")+'</div>'
			    	

			    	var postContent = '<div id="iPost'+k+'" class="card"><h6 class="card-header">'+headDiv+'</h6><div class="card-body">'+infoDiv+'<br>'+descriptionDiv+feedbackDiv+'</div><div class="card-footer">'+commentDiv+commentFull+'</div></div>'

			    		//"+postID+"
			    	activityFeed.push(postContent)
			    	//readComments(k)
			    	console.log(pID)

			    }
			    document.getElementById("activityFeed").innerHTML = activityFeed.join("<br>")
			    console.log(document.getElementById("activityFeed").innerHTML)
			    //console.log(userGlobal)
	        }
	        

	        function postComment(PostID){
	        	console.log(PostID)
	        	var inputName = "comment"+PostID
	        	console.log(inputName)

	        	var comment = document.getElementById(inputName).value
	        	if (comment == ''){
	        		alert("Please Enter Text into the Comment Section")
	        		return;
	        	}
	        	else if (userEmail == ''){
	        	
	        		alert("You must be logged in to use this feature!")
	        		return;

	        	}
	        	else{
	        		var database = firebase.database();
			        var issueRef = database.ref('NeighborhoodIssues');
			        //var name = document.getElementById("userFull").innerHTML

			        var today = new Date();
					var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
					var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
					var dateTime = date+' '+time;

			        commentID = String(currentUserName) + String(dateTime)
			        var Fullcomment = currentUserName + ' says at '+currentdate+', '+comment
			        currentdate
			        //issueRef.child(issueStamp).set(data);
			        issueRef.child(PostID+'/Comments/'+commentID).set(Fullcomment);
			        //location.reload()
	        	}
	        	
	        }
	        
	        

	        function readUsers(uPost){

	        	var database = firebase.database();
		        var userRef = database.ref('Users');
		        userGlobal = uPost
		        userRef.on('value', findUser, errData)

	        }
	        function findUser(data){
	        	$('#userInfoModal').modal('show');
	        	var userData = data.val();
			    var userkeys = Object.keys(userData);
			    console.log(userkeys)
			    console.log(userGlobal)
			    console.log(userData[userGlobal])
			    var usr = userData[userGlobal]
			    //document.getElementById("userInformation").innerHTML = ''
			    //document.getElementById("userInformation").innerHTML = userGlobal + usr['age'] + usr['hobbies'] + usr['username']+usr['ward']+usr["moveDate"]
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
	        /*
	        function test(parameter){
	        	console.log(parameter)
	        }*/

	        function like(AlertID1){

	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues/'+AlertID1+'/Likes');
		        //var dislikeRef = database.ref('NeighborhoodIssues/'+AlertID2+'/Dislikes');
		        //var currentUser = document.getElementById("userEmail").innerHTML
		        var formatUser = userEmail.replace(/[.]/g,",")
		        issueRef.child(formatUser).set(formatUser);
		        
	        	
	        }
	        function dislike(AlertID2){

	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues/'+AlertID2+'/Dislikes');
		        //var dislikeRef = database.ref('NeighborhoodIssues/'+AlertID2+'/Dislikes');
		        //var currentUser = document.getElementById("userEmail").innerHTML
		        var formatUser = userEmail.replace(/[.]/g,",")
		        issueRef.child(formatUser).set(formatUser);
		        
	        	
	        }
	        /*
	        function dislike(AlertID2){
	        	var database = firebase.database();
		        var issueRef = database.ref('NeighborhoodIssues/'+AlertID2+'/Dislikes');
		        //var dislikeRef = database.ref('NeighborhoodIssues/'+AlertID2+'/Dislikes');
		        //var currentUser = document.getElementById("userEmail").innerHTML
		        var formatUser = userEmail.replace(/[.]/g,",")
		        curPost = ''
		        curPost = AlertID2
		        //for (i in)
	        	if (userEmail == ''){
	        		alert("You must be logged in to use this feature!")
	        		return;
	        	}
	        	else{
	        		issueRef.on('value', dislikePost, errData)

			        
	        	}
	        	
	        }
	        var flag = ''
	        dislikeList2 = []
	        function dislikePost(data){
	        	var database = firebase.database();
	        	var issueRef = database.ref('NeighborhoodIssues/'+curPost+'/Dislikes');
	        	var issueData = data.val();
	        	//var issuekeys = Object.keys(issueData);

			    //var issuekeys = Object.keys(issueData);
			    var formatUser = userEmail.replace(/[.]/g,",")
			    dislikeList2 = []
			    for (x in issueData){
			    	console.log(issueData[x])
			    	dislikeList2.push(issueData[x])
			    }
			    flag = ''
			    console.log(dislikeList2)
			    if (dislikeList2.includes(formatUser)){
			    	return;
			   
			    	
			    	
			    	
			    }
			    else{
			    	issueRef.child(formatUser).set(formatUser);
			    	
			    	
			    }
			   
			    //console.log(issuekeys)
			    
				
	        }*/


	        
	        readFeed()

