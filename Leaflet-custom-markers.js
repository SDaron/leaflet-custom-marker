/*
 Leaflet Custom Marker, a JavaScript library for using svg path has marker in Leaflet maps
 (c) 2015 D.Daron

 Version 0.0.1
*/

(function() {



  L.CustomMarker = L.Path.extend({

	  options: {
		  fill: true,
		  anchor: [-10,-36],
      points:[
        [10     ,0],
        ["C",4 ,0],
        [0      ,4],
        [0      ,10],
        ["C",0      ,16],
        [10     ,36],
        [10     ,36],
        ["C",10     ,36],
        [20     ,16],
        [20     ,10],
        ["C",20     ,4],
        [16,0],
        [10     ,0],
        ["L",10     ,0],
        ["Z M",6,6],
        ["",6,16],
        ["",14,16],
        ["",14,6]
      ],
		  radius: 10
	  },

	  initialize: function (latlng, options) {
		  this._latlng = L.latLng(latlng);
		  this.setOptions(options);
	  },

	  setLatLng: function (latlng) {
		  this._latlng = L.latLng(latlng);
		  this.redraw();
		  return this.fire('move', {latlng: this._latlng});
	  },

	  getLatLng: function () {
		  return this._latlng;
	  },

    setOptions: function (options) {
      L.setOptions(this, options);
      this._updateOptions();
      return this.redraw();
    },

    _updateOptions: function () {
		  this._points = this.options.points;
		  this._anchor = this.options.anchor;
    },

	  setStyle : function (options) {
		  L.Path.prototype.setStyle.call(this, options);
		  return this;
	  },

	  _project: function () {
		  this._point = this._map.latLngToLayerPoint(this._latlng);
		  this._updateBounds();
	  },

	  _updateBounds: function () {
		  var w = this._clickTolerance(),
		      p = [w,w];
		  this._pxBounds = new L.Bounds(this._point.subtract(p), this._point.add(p));
	  },

	  _update: function () {
		  if (this._map) {
			  this._updatePath();
		  }
	  },


	  _updatePath: function () {

		  var p = this._point,
		      sX = this._anchor[0],
		      sY = this._anchor[1];

      // For each point: ["type of curve","x","y"]
      var relCoords = this._points;

      var d = 'M ';
		  for (var i = 0, len = relCoords.length; i < len; i++) {
        if (relCoords[i].length == 2)
			    d += (p.x+sX+relCoords[i][0]) + ',' + (p.y+sY+relCoords[i][1]) + ' '
        else if (relCoords[i].length == 3)
			    d += relCoords[i][0] + (p.x+sX+relCoords[i][1]) + ',' + (p.y+sY+relCoords[i][2]) + ' '
		  }
       d += 'Z';
		  this._renderer._setPath(this, d);
	  },

	  _empty: function () {
		  return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
	  }
  });

  L.customMarker = function (latlng, options) {
	  return new L.CustomMarker(latlng, options);
  };

}());
