var module = (function (document) {

    /**
     * Funcion que concatena "texto" al valor que haya en el elemento "caja" del DOM y luego
     * Deja un salto de línea
     **/
    function escribir(texto) {
        valor = document.getElementById("caja").value;
        document.getElementById("caja").value = valor + texto + "\n";
    }

    /**
     * Funciones del websocket. Vamos a crear una conexión con wss://echo.websocket.org y, en función
     * del evento capturado, escribir en el área de texto (ver función anterior):
     *  - onopen: "Websocket abierto"
     *  - onmessage: "RECIBIDO" + el mensaje recibido
     *  - onclose: "Websocket cerrado"
     *  - onerror: "ERROR: " + el error recibido
     **/
    var mysocket = new WebSocket("wss://echo.websocket.org");

    mysocket.onopen = function(evt) {
        escribir("Websocket abierto");

    };

    mysocket.onmessage = function(evt) {
        escribir("RECIBIDO: " + evt.data);

    };

    mysocket.onclose = function(evt) {
        escribir("Websocket cerrado");
    };

    mysocket.onerror = function(evt) {
        escribir("ERROR: " + evt.data);
    }

    /**
     * En esta función enviamos un texto a través del socket y escribimos en el área de texto
     * "ENVIADO:" + el texto que hayamos enviado
     **/
    function enviar(texto) {
        mysocket.send(texto);
        escribir("ENVIADO: " + texto);
    }

    /** 
     * En esta función simplemente desconectamos del websocket
     **/
    function desconectar() {
        mysocket.close();
    }
    
    // La interfaz pública de mi módulo
    return {
        enviar: enviar,
        desconectar: desconectar
    }

})(document);