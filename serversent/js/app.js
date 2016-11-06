(function(document) {
    
    /**
     * Si existe el EventSource, nos conectamos con el servidor y capturamos el evento onmessage con una
     * función inline. En dicha función, nos limitamos a añadir al elemento del DOM con id="resul" lo que
     * el servidor nos mande.
     * Si no existe el EventSource, en el mismo elemento del DOM mostramos un mensaje de error.
     **/
    if(typeof(EventSource) !== "undefined") {
        var source = new EventSource("http://46.101.186.116/ssedemo.php");
        source.onmessage = function(event) {
            document.getElementById("result").innerHTML += event.data + "<br>";
        };

        source.addEventListener("ping", function(event) {
            document.getElementById("ping").innerHTML += event.data + "<br>";
        });

    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
    }
})(document);