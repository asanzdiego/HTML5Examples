// Envolvemos nuestro codigo en una IIFE, para eliminar las variables del scope global
(function() {

  // Usamos modo estricto (nuevo in ECMA5): http://www.w3schools.com/js/js_strict.asp
  'use strict';

  $("#drop_zone").on('dragover', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.originalEvent.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  });

 $("#drop_zone").on('drop', function(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.originalEvent.dataTransfer.files; // FileList object.

  // files is a FileList of File objects. List some properties.
  var output = [];

  $.each(files, function(index, f) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate.toLocaleDateString(), '</li>');
  });

  $("#list").html('<ul>' + output.join('') + '</ul>');
 });
})();
