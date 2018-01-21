// To make buttons
    // Make an array of player names
    // use a for loop to make buttons from the player names array
        // Will need to add classes and values or data-names to hook onto that button

playerNames = ["Lebron James", "Kevin Durant", "Chris Bosh",
"Kobe Bryant", "Steph Curry", "Demar Derozan", "Joel Embiid"];

const buttonsDiv = $("#buttons");
const playerImages = $("#images");

for(var i = 0; i < playerNames.length; i++) {
var button = $("<button>").text(playerNames[i]);
button.attr("data-name", playerNames[i]);
button.addClass("playerButton");
buttonsDiv.append(button);
}

const apikey = "rE7VKijNZKrTzo6UYIy3sms9lSuQ6c3f";

$(document).on("click", "#clear", removeGifs)
$(document).on("click", ".playerButton", getGifs);
$(document).on("click", ".image", //function here)

function getGifs() {
    var player = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=" + apikey + "&limit=10";  
    $.ajax({
        url: queryURL,
        method: "GET"
    }, ).done(function(response){
        playerImages.empty();
        console.log(response);
        for(var i = 0; i < 10; i++) {
            var gif = $("<img>").attr("src", response.data[i].images.fixed_width_still.url);
            gif.attr("animated", response.data[i].images.fixed_width.url);
            gif.addClass("image");
            gif.addClass("still");
            playerImages.append(gif);
        }
    });
}

// function animate() {
//     if((this).hasClass("still")) {
//         $(this).removeClass("still");
//         $(this).addClass("animated");
//         $(this).attr("src" = )
//     }
// }

function removeGifs() {
    playerImages.empty();
}

// Need to get the still image. and set this to the src by default
// need to get the animated gif, and on click. set that to the src attr

// for the form, need to get the value when submitted.
// prevent default, so submit works