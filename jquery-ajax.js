// Load first page with App.js
App.load('home');

// Configuration for speech settings page
App.controller('settings', function (page) {
	this.transition = 'slide-left';

	$.each(voicelist, function(key, value) {
  		$(page).find('#voices').append('<option>' + value.name + '</option>');
	});
	
	$(page).find('#voices').change(function() {
		selectedVoice = $(page).find('#voices :selected').text();
		App.back();	
	});
});

// Get a list of available voices
var voicelist = responsiveVoice.getVoices();

// Declare global variables
var spotifyAPI = "https://api.spotify.com/v1/search/?q=";
var selectedVoice;
var appName;
//var appNameArray = [];
//var adjective;
//var noun;

// Configuration for randomize button
$('#randomize').click(function() {
var numberOfSyllables = $('#syllables').val();
var syllablesObject = {syllables: numberOfSyllables}; 
var appNameArray = []
//var adjective;
//var noun;

  $.getJSON("https://api.pixlig.se/name", syllablesObject, function(data) {
    
      $("#appname").text(data.name)
      appName = data.name
      appNameArray = data.name.split(" ")
      adjective = appNameArray[0]
      noun = appNameArray[1]
      console.log(data)
      console.log(syllablesObject)
      console.log(adjective)
	
	$.getJSON(spotifyAPI + adjective + " " + noun + "&type=album,artist,track", function(data) {
        if (data.albums.items.length == 0 && data.artists.items.length == 0 && data.tracks.items.length == 0) {
                $("#spotifyappname").text("No albums, artists or tracks with the words " + appName + " found on Spotify.")
                $("#spotifyappnameimage").empty()
        } else if (data.albums.items.length > 0) {
                var appnameImageURL = data.albums.items[0].images[1].url;
                var displayText = "Found " + data.albums.items.length + " albums on Spotify with the word " + appName + ". Showing first match: " ;
                $("#spotifyappname").text(displayText)
                $("#spotifyappnameimage").html('<img src="' + appnameImageURL + '"></img>')
        } else if (data.artists.items.length > 0) {
                var appnameImageURL = data.artists.items[0].images[1].url;
                var displayText = "Found " + data.artists.items.length + " artists on Spotify with the word " + appName + ". Showing first match: " ;
                $("#spotifyappname").text(displayText)
                $("#spotifyappnameimage").html('<img src="' + appnameImageURL + '"></img>')
        } else if (data.tracks.items.length > 0) {
                var appnameImageURL = data.tracks.items[0].images[1].url;
                var displayText = "Found " + data.tracks.items.length + " tracks on Spotify with the word " + appName + ". Showing first match: " ;
                $("#spotifyappname").text(displayText)
                $("#spotifyappnameimage").html('<img src="' + appnameImageURL + '"></img>')
        }
        console.log(data)
        });
	
	$.getJSON(spotifyAPI + adjective + "&type=album", function(data) {
	if (data.albums.items.length == 0) {
		$("#albumadjective").text("No albums with the word " + adjective + " found on Spotify.")
		$("#albumadjectiveimage").empty()
	} else if (data.albums.items.length > 0) {
		var albumImageURL = data.albums.items[0].images[1].url;
		var displayText = "Found " + data.albums.items.length + " albums on Spotify with the word " + adjective + ". Showing first match: " ;
		$("#albumadjective").text(displayText)
		$("#albumadjectiveimage").html('<img src="' + albumImageURL + '"></img>')
	}
    	console.log(data)
  	});

  	$.getJSON(spotifyAPI + noun + "&type=album", function(data) {
        if (data.albums.items.length == 0) {
                $("#albumnoun").text("No albums with the word " + noun + " found on Spotify.")
		$("#albumnounimage").empty()
        } else if (data.albums.items.length > 0) {
                var albumImageURL = data.albums.items[0].images[1].url;
                var displayText = "Found " + data.albums.items.length + " albums on Spotify with the word " + noun + ". Showing first match: " ;
                $("#albumnoun").text(displayText)
                $("#albumnounimage").html('<img src="' + albumImageURL + '"></img>')
        }
    	console.log(data)
  	});

	$.getJSON(spotifyAPI + adjective + "&type=artist", function(data) {
        if (data.artists.items.length == 0) {
                $("#artistadjective").text("No artists with the word " + adjective + " found on Spotify.")
                $("#artistadjectiveimage").empty()
        } else if (data.artists.items.length > 0) {
                var artistImageURL = data.artists.items[0].images[1].url;
                var displayText = "Found " + data.artists.items.length + " artists on Spotify with the word " + adjective + ". Showing first match: " ;
                $("#artistadjective").text(displayText)
                $("#artistadjectiveimage").html('<img src="' + artistImageURL + '"></img>')
        }
        console.log(data)
        });
      
        $.getJSON(spotifyAPI + noun + "&type=artist", function(data) {
        if (data.artists.items.length == 0) { 
                $("#artistnoun").text("No artists with the word " + noun + " found on Spotify.")
                $("#artistnounimage").empty()
        } else if (data.artists.items.length > 0) {
                var artistImageURL = data.artists.items[0].images[1].url;
                var displayText = "Found " + data.artists.items.length + " artists on Spotify with the word " + noun + ". Showing first match: " ;
                $("#artistnoun").text(displayText)
                $("#artistnounimage").html('<img src="' + artistImageURL + '" width=300></img>')
        }
        console.log(data)
        });
	/*
	$.getJSON(spotifyAPI + adjective + "&type=track", function(data) {
        if (data.tracks.items.length == 0) {
                $("#trackadjective").text("No tracks with the word " + adjective + " found on Spotify.")
                $("#trackadjectiveimage").empty()
        } else if (data.tracks.items.length > 0) {
                var trackImageURL = data.tracks.items[0].images[1].url;
                var displayText = "Found " + data.tracks.items.length + " tracks on Spotify with the word " + adjective + ". Showing first match: " ;
                $("#trackadjective").text(displayText)
                $("#trackadjectiveimage").html('<img src="' + trackImageURL + '"></img>')
        }
        console.log(data)
        });

        $.getJSON(spotifyAPI + noun + "&type=track", function(data) {
        if (data.tracks.items.length == 0) {
                $("#tracknoun").text("No tracks with the word " + noun + " found on Spotify.")
                $("#tracknounimage").empty()
        } else if (data.tracks.items.length > 0) {
                var trackImageURL = data.tracks.items[0].images[1].url;
                var displayText = "Found " + data.tracks.items.length + " tracks on Spotify with the word " + noun + ". Showing first match: " ;
                $("#artistnoun").text(displayText)
                $("#artistnounimage").html('<img src="' + trackImageURL + '"></img>')
        }
        console.log(data)
        });*/
  });

});

// Configuration of speech button
$('#playbutton').click(function() {
   
   if (appName == undefined) {
      responsiveVoice.speak("Press randomize button first", selectedVoice)
   } else {
      responsiveVoice.speak(appName, selectedVoice)
   }
   console.log(appName)

});
