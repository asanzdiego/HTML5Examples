//
// A simple way to find prime numbers
//

var n = 1;
search: while (true) {
    n += 1;
    for (var i = 2; i <= Math.sqrt(n); i += 1) {
        if (n % i == 0) {
            continue search;
        }
    }
    // Aquí hemos encontrado un primo nuevo. Se lo mandamos al fichero js
    postMessage(n);
}  

