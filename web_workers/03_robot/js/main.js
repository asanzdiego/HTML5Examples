(function(window) {
    window.onload=function() {
        //Declare a worker
        var robot=new Worker('js/workers/robot.js');
        
        
        //Process message received by the worker
        robot.onmessage=function(event){
            document.getElementById('msg_from_worker').innerHTML=event.data;
        };

        //Add an event when you click on the button
        document.getElementById('btn_send').onclick=function() {
            var msg_for_worker = document.getElementById('msg_for_worker').value;
            document.getElementById('msg_from_worker').innerHTML="processing...";
            robot.postMessage(msg_for_worker);
        };

    };
})(window);