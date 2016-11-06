var module = (function(document, navigator) {
    
    // Implementar del todo esta función
    function geoFindMe() {
        var output = document.getElementById("out");
        output.innerHTML = "<p>Locating…</p>";

        // Comprobación de errores...
        if (!navigator.geolocation){
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }
        
        // En este punto, llamaremos a la función que nos da la posición actual.
        // Dicha función recibe dos argumentos: función en caso de éxito y función
        // en caso de error
        navigator.geolocation.getCurrentPosition(success, error);
        
        // La función en caso de éxito, creará un nuevo elemento imagen y
        // como src le pondrá lo siguiente:
        // "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
        // Los parámetros latitude y longitude deberías saber obtenerlos dentro
        // de la función...
        // Dicha imagen la meterá dentro del output
        // Pista: para crear una imagen mira https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;

            output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

            var img = new Image();
            img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

            output.appendChild(img);
        };
        
        // La función en caso de error, simplemente mostrará en output un mensaje 
        // de error a nuestra elección
        function error() {
            output.innerHTML = "Unable to retrieve your location";
        };
    }
    
    return {
        geoFindMe: geoFindMe
    }
})(document, navigator);


