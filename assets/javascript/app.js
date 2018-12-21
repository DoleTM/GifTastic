var topics = ["the office", "zhu", "dogs", "always sunny", "arctic monkeys", "anahiem ducks", "holy ship"]

for (let i = 0; i < topics.length; i++) {
    var tBtn = $("<button/>").attr({
        type: "button",
        id: topics[i],
        value: topics[i],
    });

    $("#topic-buttons").append(tBtn);
}

$("button").on("click", function () {

    var topic = $(this).attr("data-topic");
    console.log(this);
    var apiKey = "&api_key=1BUpP5q62E6dZLLmuMfyqZADcjTJ2jad";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            
            var rating = results[i].rating;
            
            var p = $("<p>").text("Rating: " + rating);

            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(topicImage);

            $("#gif-div").prepend(gifDiv);
        };
    });
});