$(document).ready(function () {
  var navbarColor = $("nav")
    .first()
    .css("background-color");

  var borderLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: '../json/czech_high.geo.json',
      format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.6)'
      }),
      stroke: new ol.style.Stroke({
        color: navbarColor,
        width: 3
      })
    })
  });

  var placesSource = new ol.source.Vector({
    url: '../json/places.geo.json',
    format: new ol.format.GeoJSON()
  });

  var placesLayer = new ol.layer.Vector({
    source: placesSource,
    style: new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: navbarColor
        }),
        radius: 10,
      })
    })
  });

  var selectPlaceInteraction = new ol.interaction.Select({
    layers: function (layer) {
      return layer === placesLayer
    },
    style: new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: navbarColor
        }),
        radius: 15,
      })
    })
  });

  var popupOverlay = new ol.Overlay({
    element: document.getElementById("map-popup")
  });

  var PlacesInteraction = (function (parent) {
    function PlacesInteraction() {
      parent.call(this, {
        handleDownEvent: function (event) {
          onPlaceDown(getFeatureAt(event.pixel));
        },
        handleMoveEvent: function (event) {
          onPlaceMove(getFeatureAt(event.pixel));
        }
      });

      this.coordinate_ = null;
      this.cursor_ = "pointer";
      this.feature_ = null;
      this.previousCursor_ = undefined;
    }

    function getFeatureAt(pixel) {
      return map.forEachFeatureAtPixel(
        pixel,
        function (feature, layer) {
          return feature;
        }, {
          hitTolerance: 10,
          layerFilter: function (layer) {
            return layer === placesLayer;
          }
        }
      )
    }

    function onPlaceDown(feature) {
      if (feature) {
        window.location = feature.getProperties()["link"]
      }
    }

    function onPlaceMove(feature) {
      if (feature) {
        popupOverlay.setOffset([7, 7])
        popupOverlay.setPosition(feature.getGeometry().getCoordinates());

        $("#map-popup .card-title")
          .html(feature.getProperties()["popup-title"])
        $("#map-popup .card-text")
          .html(feature.getProperties()["popup-text"])

        $(".ol-viewport")
          .css("overflow", "visible")
      } else {
        popupOverlay.setPosition(null);
      }
    }

    if (parent) PlacesInteraction.__proto__ = parent;
    PlacesInteraction.prototype = Object.create(parent && parent.prototype);
    PlacesInteraction.prototype.constructor = PlacesInteraction;

    return PlacesInteraction;
  }(ol.interaction.Pointer));

  var map = new ol.Map({
    target: 'map',
    layers: [
      borderLayer,
      placesLayer
    ],
    overlays: [
      popupOverlay
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([16.2, 49.7]),
      zoom: 8
    }),
    interactions: [
      selectPlaceInteraction,
      new PlacesInteraction()
    ],
    controls: [],
  });

  var czechExtent = [12.0, 48.5, 18.9, 51.2]
  var projection = ol.proj.getTransform('EPSG:4326', 'EPSG:3857')
  var extent = ol.extent.applyTransform(czechExtent, projection)
  map.getView()
    .fit(extent, {
      constrainResolution: false
    })

  function selectPlace(id) {
    var feature = placesSource.getFeatureById(id)
    selectPlaceInteraction.getFeatures().clear()
    selectPlaceInteraction.getFeatures().push(feature)
  }

  var onPlacesLoaded = placesSource.on('change', function (event) {
    if (placesSource.getState() == 'ready') {
      ol.Observable.unByKey(onPlacesLoaded);

      if (window.selectedPlace) {
        selectPlace(window.selectedPlace);
      }

      placesSource.changed();
    }
  });
});