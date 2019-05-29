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
var p2choice = '';
var p1selected = false;
var p2selected = false;

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
        if (snapshot.val().p2exists === true) {
            $('#p2-userInput').hide();
            $('#p2-exit').show();
            $('.p2choice').show();
            $('#p2-display').show();
            console.log('on loadDisplay, snapshot.player2 is true');
        } else {
            $('#p2-userInput').show();
            $('#p2-exit').hide();
            $('.p2choice').hide();
            $('#p2-display').hide();
            console.log('on loadDisplay, snapshot.player2 is false');
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
            p1chat: '',
        }
    });
    $('#p1-userInput').hide();
    $('#p1-exit').show();
    $('.p1choice').show();
    $('#p1-display').show();
});

$('#p2-submitButton').click(function (e) {
    e.preventDefault();
    database.ref().set({
        p2exists: true,
        player2: {
            p2name: $('#p2-name').val().trim(),
            p2wins: 0,
            p2loss: 0,
            p2chat: '',
        }
    });
    $('#p2-userInput').hide();
    $('#p2-exit').show();
    $('.p2choice').show();
    $('#p2-display').show();
});


// Player exit
$('#p1-exit').click(function (e) {
    e.preventDefault();
    $('#p1-name').val('');
    database.ref().set({
        p1exists: false
    });
    removeRef = database.ref.child('player1');
    removeRef.remove()
        .then(function () {
            console.log('Player 1 removed.');
            $('#p1-userInput').show();
            $('#p1-exit').hide();
            $('.p1choice').hide();
            $('#p1-display').hide();
        });
});

$('#p2-exit').click(function (e) {
    e.preventDefault();
    $('#p2-name').val('');
    database.ref().set({
        p2exists: false
    });
    removeRef = database.ref.child('player2');
    removeRef.remove()
        .then(function () {
            console.log('Player 2 removed.');
            $('#p2-userInput').show();
            $('#p2-exit').hide();
            $('.p2choice').hide();
            $('#p2-display').hide();
        });
});

///////// GAME ///////////
$('.p1choice').click(function () {
    p1choice = $(this).attr('value');
    console.log('p1choice: ' + p1choice);
    p1selected = true;
    $(".p1choice").prop("disabled", true);
    if (p1selected === true && p2selected === true) {
        compare();
        $('.p1choice').prop('disabled',false);
    }
});

$('.p2choice').click(function () {
    p2choice = $(this).attr('value');
    console.log('p2choice: ' + p2choice);
    p2selected = true;
    $(".p2choice").prop("disabled", true);
    if (p1selected === true && p2selected === true) {
        compare();
        $('.p2choice').prop('disabled',false);
    };
});

var compare = function () {
    // if check, attribute win, run values
    $('.p1choice').prop('disabled',false);
    $('.p2choice').prop('disabled',false);
}

////////////// PULLS ON DATA CHANGES /////////////////

// Event listener for any changes
database.ref().on('value', function (snapshot) {
    console.log('snapshot.val');
    console.log(snapshot.val());
    if (snapshot.val().p1exists === true) {
        console.log('on value update, snapshot.player1 is true');
        p1name = snapshot.val().player1.p1name; // Updating local var
        $('#p1-display').text(p1name); // Displaying local var
    };
    if (snapshot.val().p2exists === true) {
        console.log('on value update, snapshot.player1 is true');
        p2name = snapshot.val().player2.p2name; // Updating local var
        $('#p2-display').text(p2name); // Displaying local var
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