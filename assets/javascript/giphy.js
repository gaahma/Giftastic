var giphy = {
	topics: ["turtle", "frog", "cat", "dog", "pig", "cow", "chicken", "horse", "lion", "tiger"],

	init: function(){
		for(var topic of this.topics){
			var button = giphy.makeButton(topic);
			$("#buttons").append(button);
		}
	},

	makeButton: function(topic){
		return $("<button>")
					.addClass("btn btn-primary")
					.attr("data-topic", topic)
					.html(topic);
	},

	addGifs: function(gifs){
		$("#gifs").empty();
		for(var i = 0; i < gifs.length; i++){
			var still = gifs[i].images.fixed_height_still.url;
			var animated = gifs[i].images.fixed_height.url;
			var gifDiv = $("<div>")
							.html("<p>Rating: " + gifs[i].rating + "</p>")
							.addClass("gifDiv");
			var gif = $("<img>")
						.addClass("gif")
						.attr("src", still)
						.attr("data-still", still)
						.attr("data-animate", animated)
						.attr("data-state", "still");
			gifDiv.append(gif);
			$("#gifs").append(gifDiv);
		}
	}
}

$(document).ready(function(){
	giphy.init();

/*
	This function takes the input from the #gif-name text box, 
	and creates a new button with the input.  Then it appends
	to #buttons and empties #gif-name
*/
	$("#add-gif").on("click", function(){
		event.preventDefault();
		var newTopic = $("#gif-name").val().trim();
		if (newTopic === "")
			return;
		var button = giphy.makeButton(newTopic);
		$("#buttons").append(button);
		$("#gif-name").val("");

	});
/*
	This click function takes the data-topic of the clicked button
	and searches the giphy api for gifs.  The response is passed to
	the addGifs function, which then puts the gifs on the browswer
*/
	$(document).on("click", "button", function(){
		var gifData = {
			"q": $(this).attr("data-topic"),
			"limit": "10",
			"rating": "pg",
			"api_key": "50fcc85a481a4571beac4ac39a389a47"
		}
		$.ajax({
			url: "https://api.giphy.com/v1/gifs/search?",
			data: gifData,
			method: "GET",
		}).done(function(response){
			giphy.addGifs(response.data);
		});
	});

/*
	This click function turns an animated gif into a still gif, and vice versa
*/
	$(document).on("click", ".gif", function(){
		if($(this).attr("data-state") === "still"){
			$(this).attr("src", $(this).attr("data-animate"))
				   .attr("data-state", "animated");
		} else {
			$(this).attr("src", $(this).attr("data-still"))
				   .attr("data-state", "still");
		}
	});
});
