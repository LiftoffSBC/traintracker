// Initialize Firebase
var config = {
  apiKey: "AIzaSyBDTQ0kxESzUq_hMvOXUqb8WqZkLpkCw8I",
  authDomain: "train-tracker-acd90.firebaseapp.com",
  databaseURL: "https://train-tracker-acd90.firebaseio.com",
  projectId: "train-tracker-acd90",
  storageBucket: "train-tracker-acd90.appspot.com",
  messagingSenderId: "397767617099"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  var firstTime = $("#first-input").val().trim();
  // var nextArrival = moment($("#arrival-input").val().trim(), "DD/MM/YY").format("X");
  // var minutesAway = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    first: firstTime
    // arrival: nextArrival,
    // minutes: minutesAway
  };

  // Uploads train data to the database
  database.ref().push(newTrain);
  
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.first);
  // console.log(newTrain.arrival);
  // console.log(newTrain.minutes);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#first-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var nextArrival = childSnapshot.val().arrival;
  var minutesAway = childSnapshot.val().minutes;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(nextArrival);
  console.log(minutesAway);

  // Prettify the train start -** creates new timestamp**
  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Assumptions
  var tFrequency = trainFrequency;

  // Time is 3:30 AM
  var firstTime = "#first-input";

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextArrival = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td><td>");
});

