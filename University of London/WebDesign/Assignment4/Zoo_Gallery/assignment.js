
/*
 *		This file contains the javascript code for our gallery
 */

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times
var albums_template, photos_template, photo_template, slideshow_template;

// variables to store the current displayed album and photo
var current_album = animals_data.category[0];
var current_photo = current_album.animals[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
}

// document read gets called when the whole document
// is loaded, so we put most of the code that needs to run
// in here
$(document).ready(function(){

	//
	// compile all of our templates ready for use
	//
	var source   = $("#albums-template").html();
	albums_template = Handlebars.compile(source);
	
	source   = $("#photos-template").html();
	photos_template = Handlebars.compile(source);
	
	source   = $("#photo-template").html();
	photo_template = Handlebars.compile(source);
	
	source   = $("#slideshow-template").html();
	slideshow_template = Handlebars.compile(source);

	// 
	//  clicking on the albums tab shows the 
	//  thumbnails of all the albums
	//
	$("#animals-tab").click(function () {

		// displays the albums template
		showTemplate(albums_template, animals_data);

		// make the albums tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make albums tab active
		$("#animals-tab").addClass("active");

		// add a click callback to each album 
		// thumbnail which displays the photos
		// template on that album
		// (I have written out the code for this 
		// function for clarity but it is actually
		// pretty much the same as the photos tab
		// function so we could acutally just
		// call $(".photo-thumbnail").click() ) 
		$(".album-thumbnail").click(function (){
			
			// get the index (position in the array)
			// of the album we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the album in
			// the array - @index)
			var index = $(this).data("id");

			// set the current album to this album
			current_album = animals_data.category[index];

			// displays the photos template
			showTemplate(photos_template, current_album);

			// add an on click al all the photo thumbnails
			// which displays the photo in a modal popup
			$(".photo-thumbnail").click(function (){
				// get the index (position in the array)
				// of the photo we clicked on
				// "this" is the element that was clicked on
				// data("id") gets the attribute data-id
				// (which we set to the index of the photo in
				// the array - @index)
				var index = $(this).data("id");

				// set the current photo to this photo
				current_photo = current_album.animals[index];
				
				// displays the single photo template
				showTemplate(photo_template, current_photo);
			});
		});
	});

	// 
	//  clicking on the photos tab shows all of the 
	//  photos in the current album
	//
	$("#photos-tab").click(function () {
		
		// displays the photos template
		showTemplate(photos_template, current_album);

		// make the photos tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make photos tab active
		$("#photos-tab").addClass("active");

		// add an on click al all the photo thumbnails
		// which displays the photo in a modal popup
		$(".photo-thumbnail").click(function (){
			// get the index (position in the array)
			// of the photo we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the photo in
			// the array - @index)
			var index = $(this).data("id");

			// set the current photo to this photo
			current_photo = current_album.animals[index];

			// displays the single photo template
			showTemplate(photo_template, current_photo);
		});
	});

	// 
	//  clicking on the slideshow tab displays the
	//  current album as a slide show
	//
	$("#slideshow-tab").click(function () {
		// display the slideshow template using the 
		// current album
		showTemplate(slideshow_template, current_album);
		
		// make the slideshow tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make slideshow tab active
		$("#slideshow-tab").addClass("active");
	});

	// start the page by showing the albums view
	// we do this by virtually clicking on the 
	// albums tab
	$("#animals-tab").click();

	 // the search functionality
    // this happens when a key is pressed 
    // inside the search box
    $('#searchbox').keypress(function (e) {

      // check if the key that was pressed
      // is the return key (it has id 13)
      // and only do the search if it is
      if (e.which == 13) {

        // get the search text which is the 
        // contents of the search box
        var search_text = $('#searchbox').val();

        // print the search box 
        // (this is an example of using
        // console.log for debugging)
        console.log(search_text)

        // create a new array of data with only
        // the data that contains the search string
        var filteredAnimals = {

          // use the filter function which returns
          // a new array that contains only the 
          // elements of data.images for which 
          // the function returns true
          category : animals_data.category.filter(function(d){
            
            // return true if the title contains 
            // the search text
            if (d.name.search(search_text) > -1){
              return true;
            }

            // if we reach here it means we haven't 
            // found a match so return false
            return false;
          })
        };
        console.log(filteredAnimals);
        // pass the newly filtered data into
        // the template to generate new html
        showTemplate(albums_template, filteredAnimals);
        
    }
});

});