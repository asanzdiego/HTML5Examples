var module = (function(document, navigator) {
    
    // Obten el elemento con id=demo. Ahí es donde añadirás las coordenadas
    var x = document.getElementById("demo");

    // Comprueba si el navegador acepta geolocalización.
    // En caso afirmativo, obtén las coordenadas lat, lng y muéstralas
    // dentro del elemento con id=demo que acabas de obtener
    // En caso negativo, muestra en ese mismo párrafo un mensaje de error
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
    }
    
    return {
        getLocation: getLocation
    };
    
})(document, navigator);