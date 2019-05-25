var firebaseConfig = {
    apiKey: "AIzaSyB-Bn3l-_FGzBq3u5PWG_tzzVF2Nx8rICc",
    authDomain: "rockpaperscissors-78d2a.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-78d2a.firebaseio.com",
    projectId: "rockpaperscissors-78d2a",
    storageBucket: "rockpaperscissors-78d2a.appspot.com",
    messagingSenderId: "815723816221",
    appId: "1:815723816221:web:a22cb9cd97849f33"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
console.log(database.ref.rpsGame);

/////////////// HOW TO PUT STUFF ON THE DB ///////////////
var counter = 0;
$('#p1-submitButton').click(function (e) {
    e.preventDefault();
    counter++;

    database.ref().set({
        clickCount: counter
    });

});

////////////// HOW TO GET STUFF FROM DB /////////////////
database.ref().on("value", function (snapshot) {
    // Then we console.log the value of snapshot
    console.log(snapshot.val());
    // Update the clickCounter variable with data from the database.
    counter = snapshot.val().clickCount;
    // Then we change the html associated with the number.
    $("#display").text(snapshot.val().clickCount);
    // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // Again we could have named errorObject anything we wanted.
}, function (errorObject) {
    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);
});