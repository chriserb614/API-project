// Giphy API Key: gvHqt59axinSP6GexfuLQrMDj8UK414h
var topics = ["The Godfather", "The Dark Knight", "Superbad", "Jaws", "Star Wars", "Indiana Jones", "Jurassic Park", "Die Hard", "The Great Gatsby", "The Big Lebowski"]

// make buttons
function makeButtons(){
    $("#buttonsDump").empty()

    for (var i = 0; i < topics.length; i++){
        var a = $("<button class='btn btn-dark'>")

        a.addClass("movie-btn")
        a.attr("data-name", topics[i])
        a.text(topics[i])
        $("#buttonsDump").append(a)
    }
}

// gif display
function resultsDisplay(){
    var movie = $(this).attr("data-name")
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ movie + "&api_key=gvHqt59axinSP6GexfuLQrMDj8UK414h&limit=10"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response)
        for(i = 0; i < response.data.length; i++){
            var gifDiv = $("<div>");
            var gifRating = $("<p>").text("Rating: "+ response.data[i].rating)
            var movieImage = $("<img>")
            var animatedSrc = response.data[i].images.fixed_height.url
            var staticSrc = response.data[i].images.fixed_height_still.url
            

            movieImage.attr('src', staticSrc)
            movieImage.addClass('filmGif')
            movieImage.attr('data-state', 'still')
            movieImage.attr('data-still', staticSrc)
            movieImage.attr('data-animate', animatedSrc)
            gifDiv.append(movieImage)
            gifDiv.append(gifRating)
            
            $("#results").prepend(gifDiv)

            
        }
        $(".filmGif").on("click", function(){
            var state = $(this).attr("data-state")
            console.log(state)
            if(state === "still"){
                $(this).attr("data-state", "animate")
                $(this).attr('src', $(this).attr('data-animate'))
                
            }
            else{
                $(this).attr("data-state", "still")
                $(this).attr('src', $(this).attr('data-still'))
            }
        })
        
         
    })
    .catch(function(err){
        console.log(err);
    })
    
}


$("#add-film").on("click", function(event){
    event.preventDefault();

    var film = $("#movie-input").val().trim();

    topics.push(film);

    makeButtons()

    $("#movie-input").val("")
})
$("#clear").on("click", function(event){
    $("#results").empty()

    return false;
})

$(document).on("click", ".movie-btn", resultsDisplay)


makeButtons()



