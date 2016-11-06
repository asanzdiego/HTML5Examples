var module = (function(navigator) {

    // Función que prueba la geolocalización y, si está presente, llama a
    // getCurrentPosition con dos argumentos: función ok (la de mostrar el
    // marker) y función de error (la de mostrar el error).
    // Si no hay geolocalización, muestra un error de geolocalización no
    // soportada
    function geoloc() {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(showPosition, showError);

        } else {
            alert('Geolocation is not supported in your browser');
        }
    }

    // Esta funcion crea un marker a partir de una posicion
    function showPosition(position) {
        var googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
            zoom : 12,
            center : googlePos,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        var mapObj = document.getElementById('mapdiv');
        var googleMap = new google.maps.Map(mapObj, mapOptions);
        var markerOpt = {
            map : googleMap,
            position : googlePos,
            title : 'Hi , I am here',
            animation : google.maps.Animation.DROP
        };
        var googleMarker = new google.maps.Marker(markerOpt);

        var img_src = 'https://maps.googleapis.com/maps/api/streetview?size=200x150&location=' + position.coords.latitude + ',' + position.coords.longitude +'&heading=151.78&pitch=-0.76&key=API_KEY_HERE';

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'latLng' : googlePos
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var popOpts = {
                        //content : results[1].formatted_address,
                        content: results[1].formatted_address + "<br><img border='0' src=" + img_src + ">",
                        position : googlePos
                    };
                    var popup = new google.maps.InfoWindow(popOpts);
                    google.maps.event.addListener(googleMarker, 'click', function() {
                        popup.open(googleMap);
                    });
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });

    }

    // Esta función muestra el error concreto que ha sucedido
    function showError(error) {
        var err = document.getElementById('mapdiv');
        switch(error.code) {
            case error.PERMISSION_DENIED:
                err.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                err.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                err.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                err.innerHTML = "An unknown error occurred."
                break;
        }
    }

    return {
        geoloc: geoloc
    };


})(navigator);

