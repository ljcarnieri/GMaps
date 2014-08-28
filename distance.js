function Distance() {
}

//Declara algumas propriedades
Distance.prototype.elements = null;
Distance.prototype.origins = new Array();
Distance.prototype.destinations = new Array();
Distance.prototype.callback = null;
Distance.prototype.service = null;
Distance.prototype.distance = null;
Distance.prototype.duration = null;


//Gets e sets
Distance.prototype.addOrigin = function (orig) {
    this.origins = [new google.maps.LatLng(orig.latitude, orig.longitude)];
};

Distance.prototype.addDestination = function (dest) {
    this.destinations = [new google.maps.LatLng(dest.latitude, dest.longitude)];
};

//A requisição da distancia é assincrona, então deve ter um callback
Distance.prototype.setCallback = function (cb) {
    if (typeof cb == "function") {
        this.callback = cb;
    }
};

Distance.prototype.getDistance = function () {
    return this.distance;
};

Distance.prototype.getDuration = function () {
    return this.duration;
};

Distance.prototype.calculate = function () {
    //Começa a fazer o calculo
    this.service = new google.maps.DistanceMatrixService();

    //Copia a classe
    var dist = this;

    //Faz a requisição
    this.service.getDistanceMatrix({
        "origins": this.origins,
        "destinations": this.destinations,
        "travelMode": google.maps.TravelMode.DRIVING,
        "unitSystem": google.maps.UnitSystem.METRIC,
        "avoidHighways": false,
        "avoidTolls": false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
            var result = response.rows[0].elements;
            dist.duration = result[0].duration.value;
            dist.distance = result[0].distance.value;

            //Chama o callback
            if (dist.callback != null && dist.callback != undefined) {
                dist.callback(dist.duration, dist.distance);
            }
        }
    });
};