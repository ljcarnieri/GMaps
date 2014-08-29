function Route() {
}

Route.prototype.map = null;
Route.prototype.options = null;
Route.prototype.directions_service = null;
Route.prototype.route = null;
Route.prototype.weight = 4;
Route.prototype.opacity = 0.8;
Route.prototype.color = "blue";
Route.prototype.suppressInfoWindows = true;
Route.prototype.suppressMarkers = false;
Route.prototype.preserveViewport = true;
Route.prototype.request = null;
Route.prototype.points = null;
Route.prototype.waypoints = null;
Route.prototype.optimizeWaypoints = false;
Route.prototype.travelMode = google.maps.TravelMode.DRIVING;
Route.prototype.origin = null;
Route.prototype.destination = null;
Route.prototype.request_response = null; //Objeto DirectionResult do Google Maps API
Route.prototype.total_distance = 0;
Route.prototype.total_duration = 0;
Route.prototype.legs = null;

Route.prototype.setMap = function(map) {
    this.map = map;
};
Route.prototype.getMap = function() {
    return this.map;
};
Route.prototype.setOptions = function(options) {
    this.options = options;
};
Route.prototype.getOptions = function() {
    return this.options;
};
Route.prototype.getDirectionsService = function() {
    return this.directions_service;
};
Route.prototype.getDirectionsRenderer = function() {
    return this.route;
};
Route.prototype.setWeight = function(weight) {
    this.weight = weight;
};
Route.prototype.getWeight = function() {
    return this.weight;
};
Route.prototype.setOpacity = function(opacity) {
    this.opacity = opacity;
};
Route.prototype.getOpacity = function() {
    return this.opacity;
};
Route.prototype.setColor = function(color) {
    this.color = color;
};
Route.prototype.getColor = function() {
    return this.color;
};
Route.prototype.setSuppressInfoWindows = function(suppressInfoWindows) {
    this.suppressInfoWindows = suppressInfoWindows;
};
Route.prototype.getSuppressInfoWindows = function() {
    return this.suppressInfoWindows;
};
Route.prototype.setSuppressMarkers = function(suppressMarkers) {
    this.suppressMarkers = suppressMarkers;
};
Route.prototype.getSuppressMarkers = function() {
    return this.suppressMarkers;
};
Route.prototype.setPreserveViewport = function(preserveViewport) {
    this.preserveViewport = preserveViewport;
};
Route.prototype.getPreserveViewport = function() {
    return this.preserveViewport;
};
Route.prototype.setRequest = function(request) {
    this.request = request;
};
Route.prototype.getRequest = function() {
    return this.request;
};
Route.prototype.setWaypoints = function(waypoints) {
    this.waypoints = waypoints;
};
Route.prototype.getWaypoints = function() {
    return this.waypoints;
};
Route.prototype.setOptimizeWaypoints = function(optimizeWaypoints) {
    this.optimizeWaypoints = optimizeWaypoints;
};
Route.prototype.getOptimizeWaypoints = function() {
    return this.optimizeWaypoints;
};
Route.prototype.setTravelMode = function(travelMode) {
    this.travelMode = travelMode;
};
Route.prototype.getTravelMode = function() {
    return this.travelMode;
};
Route.prototype.setOrigin = function(origin) {
    this.origin = origin;
};
Route.prototype.getOrigin = function() {
    return this.origin;
};
Route.prototype.setDestination = function(destination) {
    this.destination = destination;
};
Route.prototype.getDestination = function() {
    return this.destination;
};
Route.prototype.setPoints = function(points) {
    this.points = points;
};
Route.prototype.getPoints = function() {
    return this.points;
};
Route.prototype.getResponse = function() {
    return this.request_response;
};

Route.prototype.getTotalDistance = function() {
    return this.total_distance;
};

Route.prototype.getTotalDuration = function() {
    return this.total_duration;
};

Route.prototype.clear = function() {
    this.route.setDirections({routes: []});
};

Route.prototype.getLegs = function() {
    return this.legs;
};


//Faz o init da renderização da rota
Route.prototype.init = function() {
    //Valida algumas coisas antes de iniciar o processo
    if (this.points == null || this.points == undefined) {
        console.error("PONTOS ESTÃO NULOS");
        return null;
    }

    if (this.map == null || this.map == undefined) {
        console.error("MAPA NÃO SETADO");
        return null;
    }

    //Cria o direction service
    this.directions_service = new google.maps.DirectionsService();

    //Cria o direction render
    this.route = new google.maps.DirectionsRenderer();

    //Seta algumas opções
    this.options = {
        preserveViewport: this.preserveViewport,
        suppressInfoWindows: this.suppressInfoWindows,
        suppressMarkers: this.suppressMarkers,
        polylineOptions: {
            strokeWeight: this.weight,
            strokeOpacity: this.opacity,
            strokeColor: this.color
        }
    };

    //Seta as opções
    this.route.setOptions(this.options);

    //E seta ele no mapa
    this.route.setMap(this.map.getMap());

    var ponto = this.points.shift();
    this.origin = new google.maps.LatLng(ponto.latitude, ponto.longitude);

    //Guarda o ponto final da rota
    ponto = this.points.pop();
    if (ponto != undefined) {
        this.destination = new google.maps.LatLng(ponto.latitude, ponto.longitude);
    }

    //Cria uma variavel que guardará as opções da requisição
    this.request = {
        "origin": this.origin,
        "destination": this.destination,
        "travelMode": this.travelMode
    };

    //Se o array ainda tiver elementos, setam eles como waypoints
    if (this.points.length > 0) {
        var pontos = new Array();
        for (var i in this.points) {
            pontos.push({
                location: new google.maps.LatLng(this.points[i].latitude, this.points[i].longitude),
                stopover: true
            });
        }
        this.request.waypoints = pontos;
        this.request.optimizeWaypoints = this.optimizeWaypoints;
    }
    var rota = this;
    var render = true;
    this.directions_service.route(this.request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //Se a requisição para traçar a rota deu certo, seta a resposta no mapa
            render = true;
            rota.route.setDirections(response);
            rota.request_response = response;

            //Calcula a distancia total e a duração total
            var legs = rota.request_response.routes[0].legs;
            rota.legs = rota.request_response.routes[0].legs;

            for (var i = 0; i < legs.length; i++) {
                rota.total_distance += Math.round(legs[i].distance.value);
                rota.total_duration += Math.round(legs[i].duration.value);
            }
        } else {
            render = false;
        }

    });
    return render;
};