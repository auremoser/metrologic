'use strict'

function main() {
  var map;

  var layerUrl = 'http://documentation.cartodb.com/api/v2/viz/804b5998-51b0-11e4-bc35-0e018d66dc29/viz.json';

  var options = {
    // zoom projection to adjust starting point zoom
    zoom: 12,
    // center_lat: 40.7127,
    // center_lon: -74.0059,
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

$(main);