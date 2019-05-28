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

// GLOBALS
var p1choice = '';

/////////////// FUNCTIONS ON PAGE LOAD /////////////////

var loadDisplay = function () {
    database.ref().once('value', function (snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.val().p1exists);
        if (snapshot.val().p1exists === true) {
            $('#p1-userInput').hide();
            $('#p1-exit').show();
            $('.p1choice').show();
            $('#p1-display').show();
            console.log('on loadDisplay, snapshot.player1 is true');
        } else {
            $('#p1-userInput').show();
            $('#p1-exit').hide();
            $('.p1choice').hide();
            $('#p1-display').hide();
            console.log('on loadDisplay, snapshot.player1 is false');
        }
    });
};

/////////////// CLICK EVENTS ///////////////

// New player submission
$('#p1-submitButton').click(function (e) {
    e.preventDefault();
    database.ref().set({
        p1exists: true,
        player1: {
            p1name: $('#p1-name').val().trim(),
            p1wins: 0,
            p1loss: 0,
            p1chat: ''
        }
    });
    $('#p1-userInput').hide();
    $('#p1-exit').show();
    $('.p1choice').show();
    $('#p1-display').show();
});

$('#p1-exit').click(function (e) {
    e.preventDefault();
    database.ref().set({
        p1exists: false
    });
    removeRef = database.ref('player1');
    removeRef.remove()
        .then(function () {
            console.log('Player 1 removed.');
            $('#p1-userInput').show();
            $('#p1-exit').hide();
            $('.p1choice').hide();
            $('#p1-display').hide();
        });
});

$('.p1choice').click(function () {
    p1choice = $(this).attr('value');
    console.log('p1choice: ' + p1choice);
    p1selected = true;
});

////////////// PULLS ON DATA CHANGES /////////////////

// Event listener for any changes
database.ref().on('value', function (snapshot) {
    console.log('snapshot.val');
    console.log(snapshot.val());
    if (snapshot.val().p1exists === true) {
        console.log('on value update, snapshot.player1 is true');
        p1name = snapshot.val().player1.p1name; // Updating local var
        $('#p1-display').text('Player 1: ' + p1name); // Displaying local var
    };
}, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
});

loadDisplay();

/*
Hide everything but player data on load, as well as exit game buttons
show rps upon submitting name
hide name submission option if there's already a player
*/