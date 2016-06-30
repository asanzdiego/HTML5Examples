// Envolvemos nuestro codigo en una IIFE, para eliminar las variables del scope global
(function() {

  // Usamos modo estricto (nuevo in ECMA5): http://www.w3schools.com/js/js_strict.asp
  'use strict';

  $("#uploadInput").on('change', function(evt) {

    debugger;

      var nBytes = 0;
      var oFiles = evt.target.files;
      var nFiles = oFiles.length;

      $.each(oFiles, function(index, file) {
        nBytes += file.size;
      });

      var sOutput = nBytes + " bytes";

      // optional code for multiples approximation
      for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
      }
      // end of optional code

      $("#fileNum").html(nFiles);
      $("#fileSize").html(sOutput);
    })
})();
