var module = (function() {
    
    
    // Aquí vamos a implementar una mapa real de GMaps
    // 1.- Crear el mapa en el div con id=map. Centrado donde quieras y con
    // el zoom que quieras
    // 2.- Crear un infowindow en el mapa
    // 3.- Llamar a navigator.geolocation.getCurrentPosition. En caso de éxito,
    // colocar el infowindow en la ubicacion elegida
    // 4.- En caso de error, simplemente mostrar un error sin más
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.394222899999995, lng: -3.6881971},
            zoom: 17
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }
    
    // Devolvemos la única función que será nuestra interfaz pública
    return {
        initMap: initMap
    };
})();    
    