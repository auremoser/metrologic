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
	'subwayStations':0,
	'bikeParking':1,
	'bikeRoutes':2,
	'dangerousStations':3,
};

function weather(){
	var apiKey = '8d8290d21b239f27da30f07296f3adfe';
	var url = 'https://api.forecast.io/forecast/';
	var lat = 40.7217;
	var lon = -74.0059;
	var data;

	$.getJSON(url + apiKey + "/" + lat + "," + lon + "?callback=?", function(data) {
		console.log(data);
		// pricipType: rain, snow, sleet, hail, none
		var precipitation = data.currently.precipType ? data.currently.precipType : 'none';
		var precipIntensity = data.daily.precipIntensityMax ? data.daily.precipIntensityMax : 'low';
		$('#weather').html('Current Temp: ' + data.currently.temperature + ' ˚F' + ' Precipitation: ' + precipitation + ' <a href="ttp://s3.amazonaws.com/thejefflarson/ethics.html" style="background-color: #7fbfff; opacity: 0.7">Snowmaggedon Index:</a> ' + precipIntensity);
		// access sublayer and hide directly, but layer_selector does not reflect change
		// window.overlay.getSubLayers()[1].hide()

		// get the layer selector button corresponding to our sublayer
		var temp = parseFloat(data.currently.temperature );
		// winter mix (freezing and bad precipitation) = don't show bike options; show bike danger zones + subways
		if(temp < 32 || (precipitation === 'sleet' || precipitation === 'hail')){
			disableLayer('bikeParking');
			disableLayer('bikeRoutes');
		}
		if(temp < 32 && (precipitation === 'snow')){
		//You show these layers any time it snows.
			disableLayer('bikeParking');
			disableLayer('bikeRoutes');
			$('#snow').css({opacity:0.7});
		//you should the snowmaggedon item only if is heavy snow
			if(precipIntensity > 0.1) $('#snow').css({opacity:1});
		}
		// if above freezing = don't show dangerzones, show bikes + subways
		if(temp > 32 && temp < 60 || (precipitation === 'rain')) {
			disableLayer('dangerousStations');
		}
		// if nice weather = show bikes, encourage biking
		else if(temp >= 60 && (precipitation === 'none')) {
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

$(main);
// $(weather);