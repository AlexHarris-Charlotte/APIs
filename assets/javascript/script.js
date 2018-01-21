
playerNames = ["Lebron James", "Kevin Durant", "Chris Bosh",
"Kobe Bryant", "Steph Curry", "Demar Derozan", "Joel Embiid"];

const buttonsDiv = $("#buttons");
const playerImages = $("#images");

function playerButtons() {
    for(var i = 0; i < playerNames.length; i++) {
    var button = $("<button>").text(playerNames[i]);
    button.attr("data-name", playerNames[i]);
    button.addClass("playerButton");
    buttonsDiv.append(button);
    }
};
playerButtons();

const apikey = "rE7VKijNZKrTzo6UYIy3sms9lSuQ6c3f";

$(document).on("click", "#clear", removeGifs)
$(document).on("click", ".playerButton", getGifs);
$(document).on("click", ".image", animate);

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
            var gif = $("<img>");
            gif.attr("still", response.data[i].images.fixed_width_still.url);
            gif.attr("src", response.data[i].images.fixed_width_still.url);
            gif.attr("animated", response.data[i].images.fixed_width.url);
            gif.addClass("image");
            gif.addClass("still");
            playerImages.append(gif);
        }
    });
}

function animate() {
    if($(this).hasClass("still")) {
        $(this).removeClass("still");
        $(this).addClass("animated");
        let animatedGif = $(this).attr("animated");
        $(this).attr("src", animatedGif);
    } else if($(this).hasClass("animated")) {
        $(this).removeClass("animated");
        $(this).addClass("still");
        let stillGif = $(this).attr("still");
        $(this).attr("src", stillGif);
    }
}

$("#addPlayer").on("click", function(event) {
    $("#buttons").empty();
    event.preventDefault();
    var newPlayer = $("#newPlayer").val().trim();
    playerNames.push(newPlayer);
    playerButtons();
})

function removeGifs() {
    playerImages.empty();
}

