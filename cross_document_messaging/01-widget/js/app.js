(function(document, navigator) {

    // Confiaremos en este origen
    var trustedOrigin = "http://chat.example.net:9999";

    // Titulo de la ventana al principio
    var defaultTitle = "Portal [http://portal.example.com:9999]";
    var notificationTimer = null;

    
    /**
     *
     * Esta función será el callback que saltará cuando nos llegue un mensaje de tipo cross-domain. 
     * Comprobaremos el origen del mensaje. Si es el origen en el que confiamos, llamaremos a la función
     * notify, pasándole como argumento el contenido del mensaje enviado. Si es otro origen, no haremos nada.
     *
     * PISTA: Para saber como acceder al contenido del mensaje, revisar la documentación de postMessage o 
     * este ejemplo: http://fiddle.jshell.net/bmknight/9eUUA/
     **/ 
    function messageHandler(e) {
        if (e.origin == trustedOrigin) {
            notify(e.data);
        } else {
            // No hacemos nada. Ignoramos mensajes de otros origenes
        }
    }

    /**
     * Esta función será la que le envíe el estado al widget. Debes obtener el valor que hay en el input
     * "statusText" y enviársela al iframe que contiene el widget mediante postMessage. Recuerda que:
     *  - Tendrás que acceder a la ventana contenida en el iFrame
     *  - Tendrás que pasarle dos argumentos a postMessage: el mensaje a enviar y el dominio en el que ha
     *    de encontrarse la ventana del iFrame para que el mensaje se entregue.
     *
     * PISTA: Consulta https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
     **/
    function sendStatus() {
        var statusText = document.getElementById("statusText").value;
        document.getElementById("widget").contentWindow.postMessage(statusText, trustedOrigin);
    }


    /**
     * Funciones que hace que parpadee el título de la ventana, para avisar el usuario
     **/
    function notify(message) {
        stopBlinking();
        blinkTitle(message, defaultTitle);
    }

    function stopBlinking() {
        if (notificationTimer !== null) {
            clearTimeout(notificationTimer);
        }
        document.title = defaultTitle;
    }

    function blinkTitle(m1, m2) {
        document.title = m1;
        notificationTimer = setTimeout(blinkTitle, 1000, m2, m1)
    }

    
    /**
     * Función de inicio 
     **/
    function loadDemo() {
        document.getElementById("sendButton").addEventListener("click", sendStatus, true);
        document.getElementById("stopButton").addEventListener("click", stopBlinking, true);
        sendStatus();
    }
    
    // Capturamos los eventos de la página
    window.addEventListener("load", loadDemo, true);
    window.addEventListener("message", messageHandler, true);

})(document, navigator);