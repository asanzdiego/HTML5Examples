// En este worker, simplemente enviamos de vuelta el mismo mensaje que nos ha enviado el usuario,
// capturando el evento onmessage
this.onmessage=function(event){

  postMessage("You wrote: " + event.data);

};