var topics = ["The Office", "Zhu", "Dogs", "Always Sunny", "Arctic Monkeys", "Anahiem Ducks", "Honey Badger"]

function displayGiphy() {
    var topic = $(this).attr("data-topic");
    console.log(this);
    var apiKey = "&api_key=1BUpP5q62E6dZLLmuMfyqZADcjTJ2jad";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var giphyDiv = $('<div class="topic">');
        var results = response.data;
        for (let i = 0; i < results.length; i++) {
            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").addClass("gif");

            giphyDiv.prepend(p).prepend(topicImage);

            $("#gif-div").prepend(giphyDiv);
        };
    });
}

function renderButtons() {
    $("#topic-buttons").empty();
    for (let i = 0; i < topics.length; i++) {
        var btn = $("<button>");

        btn.addClass("newTopic").attr("data-topic", topics[i]).text(topics[i]);
        $("#topic-buttons").append(btn);
    }
}

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    renderButtons();
});

$(document).on("click", ".newTopic", displayGiphy);
renderButtons();

$("#gif-div").on("click", "img", function() {
    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate")).attr("data-state", "moving");
    } else if (state === "moving") {
        $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
    }
});