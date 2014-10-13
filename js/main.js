'use strict'

function main() {
  var vis;

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
      	console.log('layers', layers)
      	window.vis = vis;
      	window.overlay = vis.getLayers()[1];
      	window.layers = layers;
      	weather();
      })

    .on('error', function() {
      cartodb.log.log("some error occurred");
    });

}

var layerIds = {
	'bikeParking':0,
	'dangerousStations': 1,
	'bikeRoutes':2,
	'subwayStations':3
};

function weather(){
	var apiKey = '8d8290d21b239f27da30f07296f3adfe';
	var url = 'https://api.forecast.io/forecast/';
	var lat = 40.7217;
	var lon = -74.0059;
	var data;

	$.getJSON(url + apiKey + "/" + lat + "," + lon + "?callback=?", function(data) {
		console.log(data);
		//rain, snow, sleet, hail, none
		var precipitation = data.currently.precipType ? data.currently.precipType : 'none';
		$('#weather').html('The temperature is: ' + data.currently.temperature + ' ˚F' + ' Precipitation is: ' + precipitation );
		//access sublayer and hide directly, but layer_selector does not reflect change
		// window.overlay.getSubLayers()[1].hide()
		//we get the layer selector button corresponding to our sublayer
		var temp = parseFloat(data.currently.temperature );
		if(temp < 32 && (precipitation === 'snow' || precipitation === 'sleet')){
			disableLayer('bikeParking');
			disableLayer('bikeRoutes');
		}
		if(temp > 32) {
			disableLayer('dangerousStations');
		}
		if (temp > 65) {
			disableLayer('subwayStations');
			disableLayer('dangerousStations');
		}

	});
}

function disableLayer(layerId){
	var layerIndex = layerIds[layerId];

	var layerSelectorBtn = $('.cartodb-dropdown li')[layerIndex];
	//trigger click!
	$(layerSelectorBtn).trigger('click');
}

// sublayer.setCartoCSS("#whateverlayer{polygon-fill: blue; polygon-opacity: 0.1;}");


// https://api.forecast.io/forecast/8d8290d21b239f27da30f07296f3adfe/40.7217,-74.0059

$(main);
// $(weather);