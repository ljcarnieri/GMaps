function InfoWindow() {
}

//Propriedades da classe
//Objeto google.maps.InfoWindow da API do Google
InfoWindow.prototype.info_window = null;

//Content da janela, pode ser qualquer html
InfoWindow.prototype.content = null;

//Qual marker essa janela pertence
InfoWindow.prototype.marker = null;

//Mapa qual essa janela pertence
InfoWindow.prototype.map = null;

//Metodos da classe
InfoWindow.prototype.setInfoWindow = function(info_window) {
    this.info_window = info_window;
};
InfoWindow.prototype.getInfoWindow = function() {
    return this.info_window;
};
InfoWindow.prototype.setContent = function(content) {
    this.content = content;
};
InfoWindow.prototype.getContent = function() {
    return this.content;
};
InfoWindow.prototype.setMarker = function(marker) {
    this.marker = marker;
};
InfoWindow.prototype.getMarker = function() {
    return this.marker;
};
InfoWindow.prototype.setMap = function(map) {
    this.map = map;
};
InfoWindow.prototype.getMap = function() {
    return this.map;
};
InfoWindow.prototype.setPosition = function(lat_long) {
    //Seta a nova posição no mapa
    if (lat_long != undefined && lat_long != null) {
        if (this.info_window != undefined && this.info_window != null)
        this.info_window.setPosition(lat_long);
    }
};
InfoWindow.prototype.draw = function() {
    if (this.map != null && this.marker != null && this.info_window != null){
        this.info_window.open(this.map.getMap(), this.marker);
    }
};
InfoWindow.prototype.init = function() {
    //Inicia o objeto do google maps
    this.info_window = new google.maps.InfoWindow();
    
    //Se tiver content, seta ele
    if (this.content) {
        this.info_window.setContent( this.content );
    }
};