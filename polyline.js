function Polyline() {
}

//Propriedade que guardará o objeto googlew.maps.Polyline
Polyline.prototype.polyline = null;

//Objeto que guardará as opções da polyline em formarto key/value pair
Polyline.prototype.options = null;

//Propriedade que guarda o Objeto Map
Polyline.prototype.map = null;

//Cor da Polyline
Polyline.prototype.color = "#B22222";

//Propriedade que guarda todos os pontos da polyline do objeto tipo LatLng
Polyline.prototype.path = null;

//Guarda todos os pontos em key/value pair de latitude e longitude
Polyline.prototype.points = null;

//Propriedade que guarda a opacidade da linha no mapa
Polyline.prototype.opacity = 0.8;

//Propriedade que guarda a largura da linha
Polyline.prototype.weight = 4;


//Getters and Setters
Polyline.prototype.getPolyline = function() {
    return this.polyline;
};
Polyline.prototype.setMap = function(map) {
    this.map = map;
};
Polyline.prototype.getMap = function() {
    return this.map;
};
Polyline.prototype.setColor = function(color) {
    this.color = color;
};
Polyline.prototype.setOpacity = function(opacity) {
    this.opacity = opacity;
};
Polyline.prototype.setWeight = function(weight) {
    this.weight = weight;
};
Polyline.prototype.setPoints = function(points) {
    this.points = points;
};

Polyline.prototype.setPoint = function(point) {
    if (this.points == null) {
        this.points = new Array();
    }
    this.points.push(point);
};

Polyline.prototype.getPoints = function() {
    return this.points;
};

Polyline.prototype.clear = function(){
    this.polyline.setMap(null);
    delete this.polyline;
};

//Função que Inicia a polyline
Polyline.prototype.init = function() {
    //Verifica se os pontos nao estão vazios
    if (this.points == null) {
        console.error("PONTOS DA POLYLINE ESTÃO NULOS");
        return;
    }
    
    //Monta os pontos
    this.path = new google.maps.MVCArray();
    for (var i in this.points) {
        this.path.push(
            new google.maps.LatLng(this.points[i].latitude, this.points[i].longitude)
        );
    }

    //Seta as opções
    this.options = {
        path: this.path,
        geodesic: true,
        strokeColor: this.color,
        strokeOpacity: this.opacity,
        strokeWeight: this.weight,
        map: this.map.getMap()
    };
    
    //Cria o objeto polyline
    this.polyline = new google.maps.Polyline(this.options);
    
    //Retorna true para a função que chamou
    return true;
};