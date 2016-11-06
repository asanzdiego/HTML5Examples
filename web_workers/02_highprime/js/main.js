(function(document) {
    
    /**
     * Creamos un nuevo worker cargando el fichero HighPrime.js. Tendremos que especificar la ruta
     * desde el raiz.
     *
     * Cuando el worker nos mande un mensaje, almacenamos su contenido en el elemento del DOM con
     * id="result"
     **/
    
    var worker = new Worker('js/workers/HighPrime.js');
    worker.onmessage = function (event) {
        document.getElementById('result').textContent = event.data;
    };
})(document);


