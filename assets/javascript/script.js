
playerNames = ["Lebron James", "Kevin Durant", "Chris Bosh",
"Kobe Bryant", "Steph Curry", "Demar Derozan", "Joel Embiid"];

const buttonsDiv = $("#buttons");
const playerImages = $("#images");

function playerButtons() {
    for(var i = 0; i < playerNames.length; i++) {
    var button = $("<button>").text(playerNames[i])
          .attr("data-name", playerNames[i])
          .addClass("playerButton");
    buttonsDiv.append(button);
    }
};
playerButtons();

const gifApikey = "rE7VKijNZKrTzo6UYIy3sms9lSuQ6c3f";

$(document).on("click", "#clear", removeGifs)
$(document).on("click", ".playerButton", getGifs);
$(document).on("click", ".image", animate);

$("#addPlayer").on("click", function(event) {
    $("#buttons").empty();
    event.preventDefault();
    var newPlayer = $("#newPlayer").val().trim();
    playerNames.push(newPlayer);
    playerButtons();
})

function getGifs() {
    var player = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=" + gifApikey + "&limit=10&rating=g";  
    $.ajax({
        url: queryURL,
        method: "GET"
    }, ).done(function(response){
        playerImages.empty();
        console.log(response);
        for(var i = 0; i < 10; i++) {
            var gif = $("<img>");
            var rating = $("<p>").text("Rating: " + response.data[i].rating)
                                 .css("display", "inline-grid")
                                 .css("text-align", "center");
            var newDiv = $("<div>");
            newDiv.addClass("inline")
                  .width(250);
            gif.attr("still", response.data[i].images.fixed_width_still.url)
               .attr("src", response.data[i].images.fixed_width_still.url)
               .attr("animated", response.data[i].images.fixed_width.url)
               .addClass("image")
               .addClass("still");
            rating.append(gif); // Fix rating
            newDiv.append(rating);
            playerImages.append(newDiv);
        }
    });
}

function animate() {
    if($(this).hasClass("still")) {
        $(this).removeClass("still")
        .addClass("animated");
        let animatedGif = $(this).attr("animated");
        $(this).attr("src", animatedGif);
    } else if($(this).hasClass("animated")) {
        $(this).removeClass("animated")
        .addClass("still");
        let stillGif = $(this).attr("still");
        $(this).attr("src", stillGif);
    }
}



function removeGifs() {
    playerImages.empty();
}


