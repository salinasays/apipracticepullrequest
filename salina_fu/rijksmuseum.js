

$('form').submit(function(event) {
    event.preventDefault()
    var input = $(this).serializeArray()[0].value
    input = input.split(" ").join("-")
    
    var root = "https://www.rijksmuseum.nl/api/pages/en/rijksstudio/artists/"
    var root2 = "https://www.rijksmuseum.nl/api/nl/collection/"
    var key = "?key=5iYZmB4N&format=json"
 

    function getArtInfo(str){
    	$.ajax({
    		url: root2 + str + key,
    		success: function(data) {
    			console.log(data)
    			var imageURL = data.artObject.webImage.url
    			var art = document.createElement('img')
    			art.setAttribute('src', imageURL)
    			$('ul').append(art)
    		}
    	})
    }

    $.ajax({
        url: root + input + key,
        success: function(data) {
            var artworks = data.contentPage.artObjectSet
             //store artwork in array 
            for(var i = 0; i < artworks.length; i ++){
            	getArtInfo(artworks[i]) 
            }
        },
        //error works simlarly to success. 
        error: function(data){
        	if(data.status === 404){
        		alert('Artist does not exist. Try Again.')
        	}
        }
    })
})