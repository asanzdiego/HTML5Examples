(function (window) {

    /**
     * Comprobamos si existe WebSocket en nuestro navegador. Si es así, abrimos una conexión
     * con ws://echo.websocket.org, y capturamos los eventos:
     *  - onopen: enviamos al servidor de websocket un mensaje cualquiera
     *  - onmessage: mostramos en un alert lo que nos ha enviado el servidor
     * Si no existe WebSocket, simplemente mostramos un alert con un error
     **/
    if ("WebSocket" in window) {
        var ws = new WebSocket("ws://echo.websocket.org"); //this service bounces messages back
        ws.onopen = function() {
            // Web Socket is connected. You can send data by send() method.
            ws.send("Le he mandado esto al servidor de echo");
        };
        ws.onmessage = function(evt) {
            var received_msg = evt.data;
            alert(evt.data);
        };
        ws.onclose = function() { /* websocket is closed.*/
            alert("Websocket cerrado");
        };
    } else {
        // the browser doesn't support WebSocket.
        alert("Websocket is not supported in your browser");
    }

})(window);