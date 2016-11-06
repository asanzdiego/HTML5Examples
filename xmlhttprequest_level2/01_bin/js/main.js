(function(document) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'img/nobear.jpg', true);
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
        if (this.status == 200) {
            // Note: .response instead of .responseText
            var blob = new Blob([this.response], {type: 'image/jpeg'});

            // Una forma de crear la imagen a partir del blob
            var image = document.createElement('img');
            image.src = window.URL.createObjectURL(blob);
            document.getElementById("imagen").appendChild(image);


            // Otra forma
            /*
        var reader = new window.FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {
            base64data = reader.result;  

            var image = document.createElement('img');
            image.src = base64data;

            document.getElementById("imagen").appendChild(image);
        }
        */
        }
    };

    xhr.send();

})(document)


