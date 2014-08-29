function Map() {
}

//Objeto mapa da lib maps.js
Map.prototype.map = null;
Map.prototype.map_options = null;
Map.prototype.markers = new Array();
Map.prototype.polylines = new Array();
Map.prototype.routes = new Array();
Map.prototype.div_map = null;
Map.prototype.center = null;
Map.prototype.points = null;
Map.prototype.zoom = 14;
Map.prototype.max_zoom = 18;
Map.prototype.mapTypeId = null;
Map.prototype.streetViewControl = null;

//Constants
Map.prototype.ROADMAP = google.maps.MapTypeId.ROADMAP;
Map.prototype.SATELLITE = google.maps.MapTypeId.SATELLITE;
Map.prototype.HYBRID = google.maps.MapTypeId.HYBRID;
Map.prototype.TERRAIN = google.maps.MapTypeId.TERRAIN;


//Metodos
Map.prototype.setCenter = function (lat, long) {
    this.center = new google.maps.LatLng(lat, long);
};

Map.prototype.setDiv = function (div_name) {
    this.div_map = div_name;
};

Map.prototype.setZoom = function (zoom) {
    this.zoom = zoom;
};

Map.prototype.setMaxZoom = function (zoom) {
    this.max_zoom = zoom;
};

Map.prototype.setMapTypeId = function (mapTypeId) {
    this.mapTypeId = mapTypeId;
};
Map.prototype.getMapTypeId = function () {
    return this.mapTypeId;
};
Map.prototype.setHasStreetViewControl = function (streetViewControl) {
    this.streetViewControl = streetViewControl;
};

Map.prototype.getHasStreetViewControl = function () {
    return this.streetViewControl;
};

Map.prototype.getRoutes = function () {
    return this.routes;
};

Map.prototype.addRoute = function (route) {
    if (route != null) {
        this.routes.push(route);
    }
};

Map.prototype.addMarker = function (marker) {
    if (marker != null) {
        this.markers.push(marker);
    }
};

Map.prototype.addPolyline = function (polyline) {
    if (polyline != null) {
        this.polylines.push(polyline);
    }
};

Map.prototype.removeRoutes = function () {
    for (var i in this.routes) {
        if (this.routes[i] != null) {
            this.routes[i].clear();
        }
    }
    this.routes = [];
};

Map.prototype.removeMarkers = function () {
    for (var i in this.markers) {
        if (this.markers[i] != null) {
            this.markers[i].clear();
        }
    }
    this.markers = [];
};

Map.prototype.removePolylines = function () {
    for (var i in this.polylines) {
        if (this.polylines[i] != null) {
            this.polylines[i].clear();
        }
    }
    this.polylines = [];
};

Map.prototype.getMap = function () {
    return this.map;
};

Map.prototype.init = function () {

    //Seta as opções padroes do mapa
    this.map_options = {
        zoom: this.zoom,
        maxZoom: this.max_zoom,
        center: this.center,
        mapTypeId: this.mapTypeId,
        streetViewControl: this.streetViewControl
    };

    //Inicia o mapa
    this.map = new google.maps.Map(document.getElementById(this.div_map), this.map_options);
};

Map.prototype.removePolyline = function (index) {
    this.polylines[index].clear();
};

Map.prototype.removeRoute = function (index) {
    this.routes[index].clear();
};

Map.prototype.removeMarker = function (index) {
    this.markers[index].clear();
};

Map.prototype.changeZoom = function (zoom) {
    if (zoom != undefined && zoom > 0) {
        this.map.setZoom(zoom);
    }
};

Map.prototype.changeCenterPosition = function (pos) {
    if (pos != undefined && pos instanceof google.maps.LatLng) {

    }
};