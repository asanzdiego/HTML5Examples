var module = (function() {
    var w;

    /**
     * Función para arrancar el Worker. Primero comprobamos si el navegador soporta esta funcionalidad.
     * En caso afirmativo, capturamos el evento de llegada de mensaje y guardamos el contenido del mensaje
     * dentro del elemento del DOM con id="result"
     **/
    function startWorker()
    {
        if(typeof(Worker)!=="undefined")
        {
            w=new Worker("js/workers/demo_workers.js");
            w.onmessage = function (event) {
                document.getElementById("result").innerHTML=event.data;
            };
        }
        else
        {
            document.getElementById("result").innerHTML="Sorry, your browser does not support Web Workers...";
        }
    }

    /**
     * Simplemente, terminamos el worker
     **/
    function stopWorker()
    { 
        w.terminate();
    }
    
    // Devolvemos la interfaz pública de nuestro módulo
    return {
        startWorker: startWorker,
        stopWorker: stopWorker
    }
})();

