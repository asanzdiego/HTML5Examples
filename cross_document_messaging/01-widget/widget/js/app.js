(function(document, navigator) {

    // Aceptaremos mensajes de este origen
    var trustedOrigin = "http://portal.example.com:9999";

    /**
     * Manejador de la función que saltará cuando llegue el mensaje del otro dominio
     * Si confiamos en el origen, guardamos el contenido del mensaje como texto del elemento del DOM con
     * id="status". Si no confiamos en el origen, no haremos nada
     **/
    function messageHandler(e) {
        if (e.origin === trustedOrigin) {
            document.getElementById("status").textContent = e.data;
        } else {
            // ignore messages from other origins
        }
    }

    /**
     * Función para enviar mensaje al portal. Tendremos que acceder a la ventana padre que nos contiene
     * (no olvidemos que somos un iFrame embebido en una página). ¿Cómo lo hacemos?
     * 
     * Una vez accedemos a la ventana padre del iFrame, le enviamos el mensaje usando postMessage. Recordemos que:
     *  - El primer parámetro es el mensaje
     *  - El segundo parámetro es el origen donde esperamos que se encuentre la ventana a la que mandamos el mensaje
     **/
    function sendString(s) {
        window.top.postMessage(s, trustedOrigin);
    }

    /* Esta es la función de inicio */
    function loadDemo() {
        document.getElementById("actionButton").addEventListener("click", function() {
            var messageText = document.getElementById("messageText").value;
            sendString(messageText);
        }, true);

    }
    
    // Capturadores de eventos
    window.addEventListener("load", loadDemo, true);
    window.addEventListener("message", messageHandler, true);

})(document, navigator);