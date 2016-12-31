// alert("testing if refs properly");

// Initialize Firebase
var config = {
apiKey: "AIzaSyBkZGN0rsszbs7LN99tj5vhnGs4Zg3T8W8",
authDomain: "trainspotter-18997.firebaseapp.com",
databaseURL: "https://trainspotter-18997.firebaseio.com",
storageBucket: "trainspotter-18997.appspot.com",
messagingSenderId: "689349298947"
};

firebase.initializeApp(config);

//var to hold database info
var trainDataBase = firebase.database();
console.log(trainDataBase);


//var to hold information from form
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

$(document).ready(function() {

	

	$("#addTrain").on("click", function() {

		//clear inputs
		event.preventDefault();
		//var to hold info entered by user
		trainName = $("#trainName").val().trim();
		destination = $("#destination").val().trim();
		firstTrainTime = $("#firstTrainTime").val().trim();
		frequency = $("#frequency").val().trim();
		console.log(trainName, destination, firstTrainTime, frequency);

		// Creates local "temporary" object for holding employee data
 		var newTrain = {
		   name: trainName,
		   dest: destination,
		   firstTime: firstTrainTime,
		   freq: frequency
		 };

		// Uploads train data to the database
		trainDataBase.ref().push(newTrain);

		// Logs everything to console
		console.log(newTrain.name);
		console.log(newTrain.dest);
		console.log(newTrain.firstTime);
		console.log(newTrain.freq);

		// Alert
		alert("train successfully added");

		 // Clears all of the text-boxes
		$("#trainName").val("");
		$("#destination").val("");
		$("#firstTrainTime").val("");
		$("#frequency").val("");

		 // Prevents moving to new page
		return false;
		});

		//pull from database and prints to screen/html
		trainDataBase.ref().on("child_added", function(childSnapshot) {

		console.log(childSnapshot.val());

		// Store everything into a variable.
		var trainName = childSnapshot.val().name;
		var destination = childSnapshot.val().dest;
		var firstTrainTime = childSnapshot.val().firstTime;
		var frequency = childSnapshot.val().freq;

		// Employee Info
		console.log(trainName);
		console.log(destination);
		console.log(firstTrainTime);
		console.log(frequency);

		// First Time (pushed back 1 year to make sure it comes before current time)
	    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	    // Current Time
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	    // Difference between the times
	    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	    console.log("DIFFERENCE IN TIME: " + diffTime);

	    // Time apart (remainder)
	    var tRemainder = diffTime % frequency;
	    console.log(tRemainder);

	    // Minute Until Train
	    var tMinutesTillTrain = frequency - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
	    nextTrainConverted = moment(nextTrain).format("hh:mm A")


	    

		 $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + " Minutes" + "</td><td>" + tMinutesTillTrain + " Minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + '<button class="update">Update</button>' + "</td></td>" + "</td><td>" + '<button class="remove">Remove</button>' + "</td></tr>");
		});

		
});
