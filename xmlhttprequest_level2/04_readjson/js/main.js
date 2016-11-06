var module = (function(document) {

    /**
     * Función para hacer llamada XMLHttpRequest. La respuesta será un array. Investigar cuál es su
     * formato con Google Chrome y crear un elemento ul, con un elemento li por cada elemento del array
     * Añadir la lista generada dentro del elemento del DOM con id="datos"
     **/
    function loadJSON() {
        var xmlhttp = new XMLHttpRequest();

        // Capturamos onreadystatechange
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                var data = JSON.parse(xmlhttp.responseText);

                var list = document.createElement('ul');
                
                for(var i=0; i < data.length; i++) {
                    var elem = data[i];
                    
                    var list_element = document.createElement('li');
                    var text = "ID: " + elem.id + ", Nombre: " + elem.nombre + ", Edad: " + elem.edad
                    list_element.innerHTML = text;

                    list.appendChild(list_element);
                    
                }

                document.getElementById("datos").appendChild(list);

            }
        };
        
        // Aquí hacemos la petición real
        xmlhttp.open("GET", "http://localhost:3000/alumnos", true);
        xmlhttp.setRequestHeader('Accept', 'application/json')

        xmlhttp.send();
    }
    
    // API pública de mi módulo
    return {
        loadJSON: loadJSON
    };

})(document)

