function Map() {
}

//Objeto mapa da lib maps.js
Map.prototype.map = null;

//Opções do mapa
Map.prototype.map_options = null;

//Array de markers
Map.prototype.markers = new Array();

//Array de polilynes
Map.prototype.polylines = new Array();

//Array de Rotas
Map.prototype.routes = new Array();

//Oopções do DirectionRenderer
Map.prototype.direction_options = null;

//Div onde o mapa será renderizado
Map.prototype.div_map = null;

//Objeto que é o centro do mapa
Map.prototype.center = null;

//Array que guarda os pontos a serem renderizados
Map.prototype.points = null;

//Zoom do mapa
Map.prototype.zoom = 14;

//Maximo de Zoom
Map.prototype.max_zoom = 18;

//----------------Metodos
Map.prototype.setCenter = function(lat, long) {
    this.center = new google.maps.LatLng(lat, long);
};

Map.prototype.setDiv = function(div_name) {
    this.div_map = div_name;
};

Map.prototype.setPoints = function(points) {
    this.points = points;
};

Map.prototype.setZoom = function(zoom) {
    this.zoom = zoom;
};

Map.prototype.setMaxZoom = function(zoom) {
    this.max_zoom = zoom;
};

Map.prototype.getRoutes = function() {
    return this.routes;
};

Map.prototype.addRoute = function(route) {
    if (route != null) {
        this.routes.push(route);
    }
};

Map.prototype.addMarker = function(marker) {
    if (marker != null) {
        this.markers.push(marker);
    }
};

Map.prototype.addPolyline = function(polyline) {
    if (polyline != null) {
        this.polylines.push(polyline);
    }
};

Map.prototype.removeRoutes = function() {
    for (var i in this.routes) {
        if (this.routes[i] != null) {
            this.routes[i].clear();
        }
    }
    this.routes = [];
};

Map.prototype.removeMarkers = function() {
    for (var i in this.markers) {
        if (this.markers[i] != null) {
            this.markers[i].clear();
        }
    }
    this.markers = [];
};

Map.prototype.removePolylines = function() {
    for (var i in this.polylines) {
        if (this.polylines[i] != null) {
            this.polylines[i].clear();
        }
    }
    this.polylines = [];
};

Map.prototype.getMap = function() {
    return this.map;
};

Map.prototype.init = function() {

    //Seta as opções padroes do mapa
    this.map_options = {
        zoom: this.zoom,
        maxZoom: this.max_zoom,
        center: this.center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
    };

    //Inicia o mapa
    this.map = new google.maps.Map(document.getElementById(this.div_map), this.map_options);
};

Map.prototype.removePolyline = function(index) {
    this.polylines[index].clear();
};

Map.prototype.changeZoom = function(zoom) {
    if (zoom != undefined && zoom > 0) {
        this.map.setZoom(zoom);
    }
};

Map.prototype.changeCenterPosition = function(pos) {
    if (pos != undefined && pos instanceof google.maps.LatLng) {

    }
};