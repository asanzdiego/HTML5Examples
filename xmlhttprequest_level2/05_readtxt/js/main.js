var module = (function(document) {

    /**
     * Función en la que vamos a leer el documento de texto quijote.txt y mostrar su contenido. Además,
     * mostraremos todas las cabeceras de la petición
     **/
    function loadTXTFile() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("texto").innerHTML = xmlhttp.responseText;

                document.getElementById("headers").innerHTML = "Cabeceras de la petición <br>" +  xmlhttp.getAllResponseHeaders();
            }
        };

        // Abrimos la conexión y pedimos el fichero
        xmlhttp.open("GET", "quijote.txt", true);
        xmlhttp.send();
    }

    // API pública de mi módulo
    return {
        loadTXTFile: loadTXTFile
    };
})(document);

