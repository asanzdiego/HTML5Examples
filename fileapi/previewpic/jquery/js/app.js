// Envolvemos nuestro codigo en una IIFE, para eliminar las variables del scope global
(function() {

  // Usamos modo estricto (nuevo in ECMA5): http://www.w3schools.com/js/js_strict.asp
  'use strict';

  $("#fichero").on('change', function(evt) {

    var ficheros = evt.target.files;

    // Tan solo procesaremos el primer fichero
    var fichero = ficheros[0];

    // Creamos estructura para leer fichero
    var reader = new FileReader();

    // Si es de alguno de los tipos aceptados, lo leemos
    if (fichero.type.match('image/jpeg') || fichero.type.match('image/jpg') || fichero.type.match('image/gif') || fichero.type.match('image/bmp') || fichero.type.match('image/png')) {

      // Eliminamos el mensaje de error, si es que se estaba mostrando
      $('#error').html("");
      $('#error').hide();

      // Cuando se acabe de leer el fichero, previsualizaremos la imagen
      reader.onloadend = function(ievt) {
        if (ievt.target.readyState == FileReader.DONE) {
          var datauri = ievt.target.result;
            $('#img').attr("src", datauri);
        }
      };

      reader.readAsDataURL(fichero);
    }

    // Si no, mostramos error
    else {
      $('#error').html("Extensión de imagen invalida");
      $('#error').show();
      $('#img').attr("src", "");
      $('#fichero').val("");
    }

  })


})();
