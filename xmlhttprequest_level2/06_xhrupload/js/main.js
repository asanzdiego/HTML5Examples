(function(window, document) {

    // Guardan los colores originales de la zona de drop
    var dropZoneTxtColor;
    var dropZoneBGColor;

    function leerImagen(reader, fichero) {
        reader.onloadend = function (ievt) {
            if (ievt.target.readyState == FileReader.DONE) {
                previsualizarImagen(ievt.target, fichero.type);
            }
        };
        reader.readAsDataURL(fichero);
    }

    function previsualizarImagen(filereader, filetype) {
        var datauri = filereader.result;
        document.getElementById('img').setAttribute("src", datauri);

        subirImagen(datauri, filetype);
    }


    function subirImagen(img_blob, filetype) {
        // Vamos a hacer una llamada para subir la imagen, aunque realmente no suba a ningún lado

        //var url = 'http://146.185.177.85/dopost.php'
        var url = 'http://geodata.example.net:9999/upload'

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        var progressBar = document.querySelector('progress');

        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                progressBar.value = (e.loaded / e.total) * 100;
                progressBar.textContent = progressBar.value; //
                console.log(progressBar.value);

            }
        };

        xhr.send(new Blob([img_blob], {type: filetype}));
    }

    // Aquí deberías codificar tu función que responda al evento de soltar (mira
    // abajo)
    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        // Estos son los ficheros que soltamos
        var files = evt.dataTransfer.files;



        // Tan solo procesaremos el primer fichero
        var fichero = files[0];
        var reader = new FileReader();
        if (fichero.type.match('image/jpeg') || fichero.type.match('image/jpg') || fichero.type.match('image/gif') || fichero.type.match('image/bmp') || fichero.type.match('image/png')) {

            leerImagen(reader, fichero);
        }

        else {
            alert('Formato no soportado. Tienes que subir una imagen jpg, png, gif o bmp');
        }

    }

    // Esto se ejecuta cuando pasamos por encima de una drop zone. Casi siempre nos
    // limitaremos a ejecutar stopPropagation y preventDefault.
    // Por defecto, los elementos no pueden ser movidos sobre otros elementos, de
    // manera que llamando a preventDefault, evitamos ese comportamiento por
    // defecto y permitimos el drop.
    // Para más info, consultar: http://www.w3schools.com/jsref/event_ondragover.asp
    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    }

    // Esto se ejecuta cuando entramos en la drop zone. Solo cambia el color
    function handleDragEnter(evt) {

        evt.stopPropagation();
        evt.preventDefault();

        dropZone = document.getElementById("drop_zone");

        // Nos quedamos con los colores actuales de la dropzone
        dropZoneBGColor = dropZone.style.backgroundColor;
        dropZoneTxtColor = dropZone.style.color;

        // Ponemos colores nuevos para llamar la atención
        dropZone.style.backgroundColor = "red";
        dropZone.style.color = "white";
    }

    // Esto se ejecuta cuando salimos de la dropzone sin soltar nada. Solo
    // cambia el color
    function handleDragLeave(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        dropZone.style.backgroundColor = dropZoneBGColor;
        dropZone.style.color = dropZoneTxtColor;

    }


    function main() {
        // Setup the dnd listeners.
        var dropZone = document.getElementById('drop_zone');

        // Get default colors
        dropZoneBGColor = dropZone.style.backgroundColor;
        dropZoneTxtColor = dropZone.style.color;

        // Capturamos algunos eventos que se producen al arrastrar
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('dragenter', handleDragEnter, false);
        dropZone.addEventListener('dragleave', handleDragLeave, false);


        // ¿Qué evento nos falta por capturar?
        dropZone.addEventListener('drop', handleFileSelect, false);
    }

    // Aquí empieza todo
    window.onload = main;


})(window, document);
