var navbarColor = $('nav').first().css('background-color');

var borderStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.6)'
  }),
  stroke: new ol.style.Stroke({
    color: navbarColor,
    width: 3
  })
});

var borderLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: '../json/czech_high.geo.json',
    format: new ol.format.GeoJSON()
  }),
  style: borderStyle
});

var placesStyle = new ol.style.Style({
  image: new ol.style.Circle({
    fill: new ol.style.Fill({
      color: navbarColor
    }),
    radius: 10,
  })
});

var placesLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: '../json/places.geo.json',
    format: new ol.format.GeoJSON()
  }),
  style: placesStyle
})

var map = new ol.Map({
  target: 'map',
  layers: [
    borderLayer,
    placesLayer
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([16.2, 49.7]),
    zoom: 8
  }),
  interactions: [],
  controls: [],
});

var czechExtent = [12.0, 48.5, 18.9, 51.2]
var projection = ol.proj.getTransform('EPSG:4326', 'EPSG:3857')
var extent = ol.extent.applyTransform(czechExtent, projection)
map.getView()
  .fit(extent, {
    constrainResolution: false
  })