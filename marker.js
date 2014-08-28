function Marker() {
}

//Objeto google.maps.Marker da API
Marker.prototype.marker = null;

//Objeto google.maps.Map ao qual o marker faz referencia
Marker.prototype.map = null;

//Propriedade que guardará a imagem personalizada do marker, caso houver
Marker.prototype.icon = null;

//Propriedade que guardará uma flag, que se for true, executa o addListener
Marker.prototype.exec_addListener = false;

//Propriedade que guardará quais dos listener é para registrar
Marker.prototype.listenerType = null;

//Propriedade que seta se é para o objeto se redesenhar no mapa
Marker.prototype.exec_refresh = false;

//Tooltip do marker
Marker.prototype.title = null;

//Propridades da localização
Marker.prototype.latitude = null;
Marker.prototype.longitude = null;

//Proriedade que guardara o obejto do ws
Marker.prototype.webservice = null;

//Propriedade que guarda o refresh time do objeto
Marker.prototype.refresh_time = 10000;

//Propriedade que guardara o ID do setInterval
Marker.prototype.id_interval = null;

//Metodos da classe de Marker

//Função para fazer o redraw do marker, para o objeto se re-renderizar
Marker.prototype.draw = function() {
    this.marker.setPosition(new google.maps.LatLng(this.getLatitude(), this.getLongitude()));
};

//Função que registra o setInterval para mandar o objeto se desenhar
Marker.prototype.refresh = function() {
    //Atualiza a referncia para a classe
    var m = this;
    if (this.id_interval == null) {
        this.id_interval = setInterval(function() {
            m.getPosicaoAtual();
            m.draw();
        }, m.getRefreshTime());
    }
};

//Funções de getters and setters
Marker.prototype.setMap = function(map) {
    this.map = map;
};

Marker.prototype.setLatitude = function(latitude) {
    this.latitude = latitude;
};

Marker.prototype.setLongitude = function(longitude) {
    this.longitude = longitude;
};
Marker.prototype.getLatitude = function(latitude) {
    return this.latitude;
};

Marker.prototype.getLongitude = function(longitude) {
    return this.longitude;
};

Marker.prototype.getRefresh = function() {
    return this.exec_refresh;
};

Marker.prototype.getTitle = function() {
    return this.title;
};

Marker.prototype.setTitle = function(title) {
    this.title = title;
};

Marker.prototype.setIdVeiculo = function(id_veiculo) {
    this.id_veiculo = id_veiculo;
};

Marker.prototype.setIcon = function(icon) {
    this.icon = "assets/images/" + icon;
};

Marker.prototype.setAddListener = function(listener) {
    this.exec_addListener = listener;
};

Marker.prototype.setRefresh = function(refresh) {
    this.exec_refresh = refresh;
};

Marker.prototype.setRefreshTime = function(refresh_time) {
    this.refresh_time = refresh_time;
};

Marker.prototype.getRefreshTime = function() {
    return this.refresh_time;
};

Marker.prototype.setListenerType = function(listener) {
    this.listenerType = listener;
};

Marker.prototype.stopRefresh = function() {
    console.log("Trying to stop: " + this.id_interval);
    clearInterval(this.id_interval);
    this.id_interval = null;
};

Marker.prototype.startRefresh = function() {
    this.refresh();
};

Marker.prototype.destroyYourSelf = function() {
    console.log("Jesus, i'm dying!");
    this.stopRefresh();
    this.marker.setMap(null);
};


//Função que inicia o marker
Marker.prototype.init = function() {
    //Seta as opções do marker
    var options = {
        "position": new google.maps.LatLng(this.getLatitude(), this.getLongitude()),
        "map": this.map.getMap()
    };

    //Caso o marker tenha um icone, coloca ele nas opções
    if (this.icon != null && this.icon != undefined) {
        options.icon = this.icon;
    }

    if (this.title != null && this.title != undefined) {
        options.title = this.title;
    }

    //Instancia um novo objeto do tipo marker
    this.marker = new google.maps.Marker(options);

    //registra o evento para pegar a posição atual, caso esteja setado para isso
    if (this.exec_refresh) {
        this.refresh();
    }
};

Marker.prototype.hide = function() {
    //Quando adicionado, desliga o refresh e some do mapa
    this.stopRefresh();
    this.marker.setMap(null);
};

Marker.prototype.show = function() {
    if (this.id_interval == null) {
        this.refresh();
    }
    this.marker.setMap(this.map.getMap());
};

Marker.prototype.getPosition = function() {
    return this.marker.getPosition();
};

Marker.prototype.clear = function() {
    if (this.marker != null) {
        this.marker.setMap(null);
        delete this.marker;
    }
};