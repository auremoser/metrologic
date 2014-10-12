'use strict'

function main() {
  var map;

  var layerUrl = 'http://documentation.cartodb.com/api/v2/viz/804b5998-51b0-11e4-bc35-0e018d66dc29/viz.json';

  var options = {
    // zoom projection to adjust starting point zoom
    zoom: 12,
    // legit_lat: 40.7127,
    // legit_lon: -74.0059,
    center_lat: 40.7217,
    center_lon: -74.0059,
    cartodb_logo: false,
    layer_selector: true,
  }

  cartodb.createVis('map', layerUrl, options)
    .done(function(vis, layers) {
      console.log(layers)

      })

    .on('error', function() {
      cartodb.log.log("some error occurred");
    });

}

function weather(){
	var apiKey = '8d8290d21b239f27da30f07296f3adfe';
	var url = 'https://api.forecast.io/forecast/';
	var lat = 40.7217;
	var lon = -74.0059;
	var data;

	$.getJSON(url + apiKey + "/" + lat + "," + lon + "?callback=?", function(data) {
		console.log(data);
		$('#weather').html('The temperature is: ' + data.currently.temperature + ' ˚F');

	});
}



// https://api.forecast.io/forecast/8d8290d21b239f27da30f07296f3adfe/40.7217,-74.0059

$(main);
$(weather);