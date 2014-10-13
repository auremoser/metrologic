metrologic
==========

[project] weather based transport recs for NYC

####DESCRIPTION

This is a short little experiment to fuse the [Forecast.io](http://forecast.io) api with some public data about transportation possibilities in NYC. If the weather is nice, bike options are shown, if it's cold or rainy, subways are highlighted and "danger zones" for bikers centered around CityBike stations as a centroid are displayed, if the weather is "wintery mix" you are encouraged to seek a subway entrance.

For context a small div in the upper left displays the current temperature and precipitation type, if any for NYC's lat/long.

`main.js` hosts pretty much all the code that wires up the switches, so check it out for logic :).

####DATA

* Bike Parking (2013) : [dataset](https://data.cityofnewyork.us/Transportation/Bicycle-Parking/qpbf-g2yx)
* Bike Routes (2014) : [dataset](http://www.nyc.gov/html/dot/html/about/datafeeds.shtml#bikes)
* Danger Stations (2014) : [dataset](https://benwellington.cartodb.com/tables/dangerstations/public/table) | [blogpost](http://iquantny.tumblr.com/post/95097770919/fatal-cyclist-accident-this-morning-was-tragically#show-last-Point)
* Subway Entrances (2010) : [dataset](https://nycopendata.socrata.com/Transportation/Subway-Entrances/drex-xx56?)

####DEMO

Check out the [demo](http://auremoser.github.io/metrologic/) on the gh-pages branch of this repo.

![screenshot-for-color](https://raw.githubusercontent.com/auremoser/metrologic/master/assets/metrologic-full.jpg)

