(function(document, navigator) {
    var imageURL = "images/example2.png";
    var image;
    var ctx;
    var workers = [];

    function log(s) {
        var logOutput = document.getElementById("logOutput");
        logOutput.innerHTML = s + "<br>" + logOutput.innerHTML;
    }

    function setRunningState(p) {
        // while running, the stop button is enabled and the start button is not
        document.getElementById("startBlurButton").disabled = p;
        document.getElementById("stopButton").disabled = !p;
    }

    function initWorker(src) {
        var worker = new Worker(src);
        worker.addEventListener("message", messageHandler, true);
        worker.addEventListener("error", errorHandler, true);
        return worker;
    }

    function startBlur() {
        var workerCount = parseInt(document.getElementById("workerCount").value);
        var width = image.width/workerCount;

        for (var i=0; i<workerCount; i++) {
            var worker = initWorker("./js/workers/blurWorker.js");
            worker.index = i;
            worker.width = width;
            workers[i] = worker;

            sendBlurTask(worker, i, width);
        }
        setRunningState(true);
    }

    function sendBlurTask(worker, i, chunkWidth) {
        var chunkHeight = image.height;
        var chunkStartX = i * chunkWidth;
        var chunkStartY = 0;
        var data = ctx.getImageData(chunkStartX, chunkStartY,
                                    chunkWidth, chunkHeight).data;

        worker.postMessage({'type' : 'blur',
                            'imageData' : data,
                            'width' : chunkWidth,
                            'height' : chunkHeight,
                            'startX' : chunkStartX});
    }

    function stopBlur() {
        for (var i=0; i<workers.length; i++) {
            workers[i].terminate();
        }
        setRunningState(false);
    }

    function messageHandler(e) {
        var messageType = e.data.type;
        switch (messageType) {
            case ("status"):
                log(e.data.statusText);
                break;
            case ("progress"):
                var imageData = ctx.createImageData(e.data.width, e.data.height);

                for (var i = 0; i<imageData.data.length; i++) {
                    var val = e.data.imageData[i];
                    if (val === null || val > 255 || val < 0) {
                        log("illegal value: " + val + " at " + i);
                        return;
                    }

                    imageData.data[i] = val;
                }
                ctx.putImageData(imageData, e.data.startX, 0);

                // blur the same tile again
                sendBlurTask(e.target, e.target.index, e.target.width);
                break;
            default:
                break;
        }
    }

    function errorHandler(e) {
        log("error: " + e.message);
    }

    function loadImageData(url) {

        var canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        image = new Image();
        image.src = url;

        document.getElementById("imageContainer").appendChild(canvas);

        image.onload = function(){
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            window.imgdata = ctx.getImageData(0, 0, image.width, image.height);
            n = ctx.createImageData(image.width, image.height);
            setRunningState(false);
            log("Image loaded: " + image.width + "x" + image.height + " pixels");
        };
    }

    function loadDemo() {
        log("Loading image data");

        if (typeof(Worker) !== "undefined") {
            document.getElementById("status").innerHTML = "Your browser supports HTML5 Web Workers";

            document.getElementById("stopButton").onclick = stopBlur;
            document.getElementById("startBlurButton").onclick = startBlur;

            loadImageData(imageURL);

            document.getElementById("startBlurButton").disabled = true;
            document.getElementById("stopButton").disabled = true;
        }

    }

    window.addEventListener("load", loadDemo, true);

})(document, navigator);