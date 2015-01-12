Leaflet custom marker allow you to use custom path as markers on your maps.
It's curently only working with Leaflet 0.8-dev and is not recommended in production.

# Why?
To have the same styling rules than other vectors in leaflet, like CircleMarkers or polygon.

# Usage

```Javascript
L.geoJson(someGeojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.CustomMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);
```
